function puntoFijo(){
    var mathjs = require('mathjs');
    let strf = 'log(sin(x)^2+1)-(1/2)-(x)';//esta es la funcion f
    let strg = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion g
    let data = [];
    x0 = -0.5;
    tol = 0.0000001;
    niter = 100;
    contador = 0;
    var error = tol+1;
    fx= math.evaluate(strf,{x:x0});
    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        console.log("La tolerancia debe ser positiva");
        return("Error");
    }

    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1), '']);
    while((fx!=0) && (error>tol )&& (contador<niter)){
        xn= math.evaluate(strg,{x:x0});
        fx= math.evaluate(strf,{x:xn});
        error= Math.abs(xn-x0);
        x0= xn;
        contador= contador+1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1),Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0) {
        console.log("se encontro una aproximación en: " +x0);
    } else if (error < tol) {
        console.log( "se encontro una aproximación en: " +x0);
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
    }
    console.table(data);
}
puntoFijo()