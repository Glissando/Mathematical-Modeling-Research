function middleSquareMethod(seed, n) {
    const length = 2 * n;
    //1: Start a four digit number x0, called the seed
    let result = (seed**2).toString().padStart(length, "0").slice(length / 4, (length / 2) + (length / 4));

    return parseInt(result);
}

function linearCongruenceMethod(a, b, c, seed) {
    //1: Choose 3 integers a, b, c and initial seed value

    //2: Then generate the sequence
    let xn = (a * seed + b) % c;

    return xn;
}

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function monteCarloIntegral(f, n) {
    const M = 1.25;
    const a = 0.5;
    const b = 1.5;
    
    //Step 1
    let pointsUnderCurve = 0;

    //Step 2
    for(let i=0; i < n; i++) {
        let x = randomRange(a, b);
        let y = randomRange(0, M);
        
        if(y <= f(x))
            pointsUnderCurve++;
    }

    //Step 6
    const area = (a + b) * M;

    //Step 7
    return area * pointsUnderCurve / n
}

function monteCarloDoubleIntegral(f, n) {
    const Mx = Math.sqrt(32);
    const My = Math.sqrt(64);
    const Mz = Math.sqrt(128);
    
    //Step 1
    let pointsUnderSurface = 0;

    //Step 2
    for(let i=0; i < n; i++) {
        let x = randomRange(0, Mx);
        let y = randomRange(0, My);
        let z = randomRange(0, Mz);
        console.log(f3(x,y));
        if(z <= f3(x, y))
            pointsUnderSurface++;
    }

    //Step 6
    const area = Mx * My * Mz;
    console.log(pointsUnderSurface);
    //Step 7
    return area * pointsUnderSurface / n;
}

function f1(x) {
    return Math.E**(-(x**2));
}

function f2(x) {
    return Math.sqrt(x);
}

function f3(x, y) {
    return Math.sqrt(128 - (2 * (x**2)) - (1 * (y**2)));
}

function problemFour() {
    //Generate a random number in the range [0, 1]
    //Any range can be used as long as the pdf is uniform
    let r = Math.random();

    if(r <= 0.22)
        return 1;
    else if(r > 0.22 && r <= 0.37)
        return 2;
    else if(r > 0.37 && r <= 0.68)
        return 3;
    else if(r > 0.68 && r <= 0.94)
        return 4;
    else if(r > 0.94 && r <= 1)
        return 5;
    
}

console.log(monteCarloDoubleIntegral(f3, 100));