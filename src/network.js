export const State = {
    susceptible: 0,
    infected: 1,
    recovered: 2,
};

/*
    The Erdos Reyni model is similar to the binomial distribution, each connecting
    edge between verticies is connected with probability p. This leads to simple conclusions
    as the assortivity of the simply resulting in p.
    This model does a generally poor job of simulating social network and was chosen mainly to compare
    and contrast with the other generative models in how they would perform.
*/
export default function reyniModel(n, p) {
    let elems = [];

    //Create n nodes
    for(let i=0;i<n;i++) {
        elems.push({
            group: 'nodes',
            data: { state: State.susceptible, id: `n${i}`},
        });
    }

    //Generate edges
    const length = elems.length;
    for(let i=0;i<length;i++) {
        for(let j=i+1;j<length;j++) {
            if(p >= Math.random())
                elems.push({
                    group: 'edges',
                    data: { id: `e${i},${j}`, source: `n${i}`, target: `n${j}` }
                });
        }
    }

    return elems;
}

export function reedFrost(cy, n, p) {
    console.log('reed frost')
    let t = 0;
    let infected = [];
    let initial = `#n${getRandomInt(0, n)}`;
    
    let finalSize = 1;
    let totalRounds = 0;

    infected.push(cy.$(initial));
    cy.$(initial).data('state', State.infected);
    console.log(initial);
    while(infected.length > 0) {
        console.log('infected')
        console.log(infected);
        let newInfected = [];
        for(let i=0;i<infected.length;i++) {
            let neighborhood = infected[i].neighborhood('node');
            
            for(let j=0;j<neighborhood.length;j++) {
                console.log(neighborhood[0].data('state'));
                if (neighborhood[j].data('state') === State.susceptible){
                    if(p >= Math.random()) {
                        finalSize++;
                        neighborhood[j].data('state', State.infected);
                        newInfected.push(neighborhood[j]);
                    }
                }
            }
        }

        for(let i=0;i<infected.length;i++) {
            infected[i].data('state', State.recovered);
        }

        infected = [];
        infected = newInfected;
        totalRounds++;
    }
    //return totalRounds;
    console.log(`Final Size: ${finalSize}`)
    console.log(`Total Number of iterations: ${totalRounds}`)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
    The power law distribution uses a maximum degree kappa, average degree alpha k degree value
*/
export function powerModel(n, p) {
    let nodes = [];
    let edges = [];
    //Create n nodes
    for(let i=0;i<n;i++) {
        nodes.push({
            group: 'nodes',
            data: { state: State.susceptible, id: `n${i}`, degree: 1},
        });
        
        //Create edges
        for(let j=0;j<nodes.length;j++) {
            if(j != i) {
                let p = nodes[j].data.degree / (nodes.length * 2);
                if(p >= Math.random()) {
                    nodes[j].data.degree++;
                    nodes[i].data.degree++;
                    edges.push({
                        group: 'edges',
                        data: { id: `e${i},${j}`, source: `n${i}`, target: `n${j}` }
                    });
                }
            }
        }
    }

    //Remove isolated nodes
    for(let i=0;i<nodes.length;i++)
        if(nodes[i].data['degree'] === 1) {
            nodes.splice(i,1);
        }
        
    return nodes.concat(edges);
}

export function smallWorldModel(n, p) {
    let elems = [];
    
    //Create Attic Ring with k = 2 - STEP 1
    //Create n nodes
    for(let i=0;i<n;i++) {
        elems.push({
            group: 'nodes',
            data: { state: State.susceptible, id: `n${i}`},
        });
    }

    //Generate edges
    const length = elems.length;
    for(let i=0;i<length;i++) {
        let right1 = (i + 1) % (n - 1);
        let right2 = (i + 2) % (n - 1);

        elems.push({
            group: 'edges',
            data: { id: `e${i},${right1}`, source: `n${i}`, target: `n${right1}` }
        });

        elems.push({
            group: 'edges',
            data: { id: `e${i},${right2}`, source: `n${i}`, target: `n${right2}` }
        });
    }

    //Rewire edges - STEP 2
    for(let i=length;i<elems.length;i++) {
        if(p >= Math.random()) {
            let data = elems[i].data;
            let target = 0;
            do {
                target = getRandomInt(0, n - 1);
            } while(target == +data.source.substring(1, data.source.length))
            elems[i].data = { id: data.id, source: data.source, target: `n${target}`}
        }
    }

    return elems;
}