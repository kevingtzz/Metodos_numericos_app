const { string } = require('mathjs');

function reglaFalsa() {
    const table = require('table').table;
    const fs = require('fs');
    var mathjs = require('mathjs');
    let str = 'log(sin(x)^2+1)-(1/2)';
    let data = [
        ['iter', 'a', 'xm','b','f(xm)', 'E']
    ];

    a = 0;
    b = 1;
    tol = 0.0000001;
    niter = 100;

    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        console.log("La tolerancia debe ser positiva");
        return("Error");
    }
    if(b <= a){
        console.log("b debe ser mayor a a");
        return("Error");
    }

    fa = mathjs.evaluate(str,{x:a});
    fb = mathjs.evaluate(str,{x:b});
    if (fa == 0) {
        console.log(a + " es una raiz");
    } else if ((fa * fb) < 0) {
        xm = (a - ((fa * (b - a)) / (fb - fa)));
        fxm= mathjs.evaluate(str,{x:xm});
        contador = 1;
        var error = tol + 1;

    }
    data.push([contador, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1) ,'']);
    while ((error > tol) && (fxm != 0) && (contador < niter)) {
        if (fa * fxm < 0) {
            b = xm;
            fb = fxm;
        } else {
            a = xm;
            fa = fxm;
        }
        xprev = xm;
        xm = (a - ((fa * (b - a)) / (fb - fa)));
        fxm= mathjs.evaluate(str,{x:xm});
        error = Math.abs(xm - xprev);
        contador = contador + 1;
        data.push([contador, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1) ,Number.parseFloat(error).toExponential(1)]);
    }
    if (fxm == 0) {
        console.log("Se encontro una aproximacion de la raiz en " + xm);
    } else if (error < tol) {
        console.log("Se encontro una aproximacion de la raiz en " + xm);
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
    }

    let output = table(data);
    console.log(output);
}
reglaFalsa()