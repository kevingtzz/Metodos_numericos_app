function newton() {
    var mathjs = require('mathjs');
    let str = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion
    var dfx = math.derivative(str,'x');
    let data = [];
    x0 = 0.5;
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

    fx0 = math.evaluate(str,{x:x0});
    dfx0= dfx.evaluate({x:x0});
    contador = 0;
    var error = tol + 1;
    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
    while ((error > tol) && (fx0 != 0) && (dfx0 != 0) && (contador < niter)) {
        xn = x0 - (fx0 / dfx0);
        fx0 = math.evaluate(str,{x:xn});
        dfx0= dfx.evaluate({x:xn});
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
    console.table(data);
}
newton()