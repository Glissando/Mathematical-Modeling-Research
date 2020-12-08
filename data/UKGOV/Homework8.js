function pmf(distribution) {
    let max = 0;
    let r = Math.random();

    for(let i=0;i<distribution.length;i++) {
        max += distribution[i];
        let min = i == 0 ? 0 : max - distribution[i - 1]; 
        if(r < max && r > min)
            return i;
    }

    return -1;
}

function threeHeads(n) {
    let count = 0;

    for(let i=0;i<n;i++) {
        let headCount = 0;
        for(let j=0;j<5;j++) {
            headCount += pmf([0.5, 0.5]) == 0 ? 1 : 0;
        }

        count += headCount == 3 ? 1 : 0;
    }

    return count / n;
}

function threeRains(n) {
    let count = 0;

    for(let i=0;i<n;i++) {
        let rainCount = 0;
        for(let j=0;j<3;j++) {
            let result = pmf([0.5, 0.5]);
            if(result == 0){
                rainCount++;
            }
            else break;
        }

        count += rainCount == 3 ? 1 : 0;
    }

    return count / n;
}

function oneHeadTwoTails(n) {
    const sequence = ['heads', 'tails', 'tails']
    let count = 0
    
    let str = ''
    for(let i=0;i<n;i++) {
        for(let j=0;j<sequence.length;j++) {
            str = (pmf([0.5,0.5]) == 0 ? 'heads' : 'tails')
            if(sequence[i] != str)
                break;
            else if(i==sequence.length - 1)
                count++
        }
    }

    return count / n
}

console.log(oneHeadTwoTails(100000))

/*
let str = ''
for(let i=0;i<100;i++)
    str += (pmf([0.5,0.5]) == 0 ? 'heads' : 'tails') + ' '
console.log(str)
*/

//10/32
//console.log(threeHeads(10000))

//1/8
//console.log(threeRains(10000))