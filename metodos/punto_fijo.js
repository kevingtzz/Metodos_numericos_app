function funcionUnoNormal(x) {
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1 / 2)-(x);
}
function funcionG(x) {
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1 / 2);
}

function puntoFijo(){
    
    const table = require('table').table;
    const fs = require('fs');
    let data = [
        ['iter', 'xi', 'g(xi)','f(xi)', 'E']
    ];
    x0 = -0.5;
    tol = 0.0000001;
    niter = 100;
    contador = 0;
    var error = tol+1;
    fx= funcionUnoNormal(x0);

    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(funcionG(x0)).toPrecision(17),Number.parseFloat(fx).toExponential(1), '']);
    while((fx!=0) && (error>tol )&& (contador<niter)){
        xn= funcionG(x0);
        fx= funcionUnoNormal(xn);
        error= Math.abs(xn-x0);
        x0= xn;
        contador= contador+1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(funcionG(x0)).toPrecision(17),Number.parseFloat(fx).toExponential(1),Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0) {
        console.log("se encontro una aproximación en: " +x0);
    } else if (error < tol) {
        console.log( "se encontro una aproximación en: " +x0);
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
    }
    let output = table(data);
    console.log(output);
}
puntoFijo()