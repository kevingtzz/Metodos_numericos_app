
function funcionNormal(x) {
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1 / 2);
}

function reglaFalsa() {
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['iter', 'a', 'xm','b','f(xm)', 'E']
    ];

    a = 0;
    b = 1;
    tol = 0.0000001;
    niter = 100;

    fa = funcionNormal(a);
    fb = funcionNormal(b);

    if (fa == 0) {
        console.log(a + " es una raiz");
    } else if ((fa * fb) < 0) {
        xm = (a - ((fa * (b - a)) / (fb - fa)));
        fxm = funcionNormal(xm);
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
        fxm = funcionNormal(xm);
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