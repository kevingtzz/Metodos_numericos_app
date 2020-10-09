const { error } = require('console');

function f(x){
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1/2);
}

function biseccion(){
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['Iter', 'a', 'xm', 'b', 'f(xm)', 'E']
    ];
    a = 0;
    b = 1;
    tol = 0.0000001;//E-7
    niter = 100;
    fa = f(a);
    fb = f(b);
    if (fa == 0){
        console.log("Se encontro una aproximacion de la raiz en " + xm);
    } else {
        xm = (a + b)/(2);
        fxm = f(xm);
        cont = 1;
        var error = tol + 1;
        data.push([0, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1), '']);
        while ((cont <= niter) && (fxm != 0) && (error > tol)){
            if (fa * fxm > 0){
                a = xm;
                fa = fxm;
            } else {
                b = xm;
                fb = xm;
            }
            xprev = xm;
            xm = (a + b)/(2);
            fxm = f(xm);
            error = Math.abs(xprev - xm);
            data.push([cont, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1), Number.parseFloat(error).toExponential(1)]);
            cont = cont + 1;
        }
        if (fxm == 0){
            console.log("Se encontro una aproximacion de la raiz en " + xm);
        } else if (error < tol){
            console.log("Se encontro una aproximacion de la raiz en " + xm);
        } else {
            console.log("El metodo no encontro el resultado");
        }
    }
    let output = table(data);
    console.log(output);
}

biseccion()