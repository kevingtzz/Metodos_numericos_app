function f(x){
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1/2);
}

function secante(){
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['Iter','xi','f(xi)','E']
    ];
    x0 = 0.5;
    x1 = 1;
    tol = 0.0000001; //E-7
    niter = 100;
    fx0 = f(x0);
    if (fx0 == 0){
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else {
        fx1 = f(x1);
        cont = 0;
        var error = tol + 1;
        data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
        while ((cont <= niter) && (error > tol) && (fx1 != 0)){
            xn = x1 - ((fx1 * (x1 - x0))/(fx1 - fx0));
            error = Math.abs(x1 - x0);
            x0 = x1;
            fx0 = fx1;
            x1 = xn;
            fx1 = f(xn);
            cont = cont + 1;
            data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), Number.parseFloat(error).toExponential(1)]);
        }
        if (fx1 == 0){
            console.log("Se encontro una aproximacion de la raiz en " + x1);
        } else if (error < tol){
            console.log("Se encontro una aproximacion de la raiz en " + x1);
        } else if (fx1 - fx0){
            console.log("Puede haber raices multiples");
        } else {
            console.log("El metodo no encontro el resultado");
        }
    }
    let output = table(data);
    console.log(output);
}

secante()