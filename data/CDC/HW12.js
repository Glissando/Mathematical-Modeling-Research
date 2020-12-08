const EPSILON = 0.01

function dichotomous(f, a, b, t) {
    let n = Math.ceil(log(t / (b - a), 0.5))

    for(let k=0;k<n;k++) {
        let x1 = ((a + b) / 2) - EPSILON
        let x2 = ((a + b) / 2) + EPSILON

        console.log('a: ' + a)
        console.log('b: ' + b)
        if(f(x1) < f(x2)) {
            b = x2
        }
        else {
            a = x1
        }

        
    }

    let x = (a + b) / 2
    console.log(x)
    return f(x)
}

function goldenSection(f, a, b, t) {
    const r = 0.618
    let x1 = a + (1 - r) * (b - a)
    let x2 = a + r * (b - a)

    while(t < b - a) {
        let y1 = f(x1)
        let y2 = f(x2)

        if(y1 > y2) {
           a = x1
           x1 = x2
           x2 = a + r * (b - a)
        }
        else {
            b = x2
            x2 = x1
            x1 = a + (1 - r) * (b - a)
        }
    }

    let x = (a + b) / 2
    console.log(x)
    return f(x)
}

function log(x, b) {
    return Math.log(x) / Math.log(b)
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/*
console.log(dichotomous(function(x){
    return -4 * (x**2) + 3.2*x + 3;
}, -2, 2, 0.2))
*/

console.log(goldenSection(function(x){
    return -4 * (x**2) + 3.2*x + 3
},-2, 2, 0.2))