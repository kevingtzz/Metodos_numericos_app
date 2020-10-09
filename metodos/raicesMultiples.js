function h(x){
    return (Math.pow(Math.E, x)) - (x) - (1);
}

function dh(x){
    return (Math.pow(Math.E, x)) - (1);
}

function ddh(x){
    return (Math.pow(Math.E, x));
}

function raicesMultiples(){
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['Iter', 'xi', 'f(xi)', 'E']
    ];
    x0 = 1;
    tol = 0.0000001; //E-7
    niter = 100;
    fx = h(x0);
    dfx = dh(x0);
    ddfx = ddh(x0);
    cont = 0;
    error = tol + 1;
    data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx).toExponential(1),'']);
    while ((error > tol) && (cont < niter) && (fx != 0) && (dfx != 0)){
        x1 = x0 - ((fx * dfx)/((Math.pow(dfx, 2)) - (fx * ddfx)));
        fx = h(x1);
        dfx = dh(x1);
        ddfx = ddh(x1);
        error = Math.abs(x1 - x0);
        x0 = x1;
        cont = cont + 1;
        data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx).toExponential(1), Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0){
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else if (dfx == 0){
        console.log("Puede haber raices multiples");
    } else if (ddfx == 0){
        console.log(x0 + " puede ser una raiz con multiplicidad 2");
    } else if (error < tol) {
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else {
        console.log("El metodo no encontro la solucion");
    }
    let output = table(data);
    console.log(output);
}

raicesMultiples()