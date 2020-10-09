
function funcionNormal(x) {
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1 / 2);
}

function funcionDerivada(x) {
    return (2 * Math.pow(((Math.sin(x) * Math.sin(x)) + 1),  (-1))) * (Math.sin(x)) * (Math.cos(x));
}

function newton() {
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['iter', 'xi', 'f(xi)', 'E']
    ];
    x0 = 0.5;
    tol = 0.0000001;
    niter = 100;

    fx0 = funcionNormal(x0);
    dfx0 = funcionDerivada(x0);
    contador = 0;
    var error = tol + 1;
    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
    while ((error > tol) && (fx0 != 0) && (dfx0 != 0) && (contador < niter)) {
        xn = x0 - (fx0 / dfx0);
        fx0 = funcionNormal(xn);
        dfx0 = funcionDerivada(xn);
        error = Math.abs(xn - x0);
        x0 = xn;
        contador = contador + 1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), Number.parseFloat(error).toExponential(1)]);

    }
    if (fx0 == 0) {
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else if (error < tol) {
        console.log("Se encontro una aproximacion de la raiz en " + xn);
    } else if (dfx0 == 0) {
        console.log("Acá se pueden presenta casos de raices  multiples");
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
    }
    let output = table(data);
    console.log(output);
}
newton()