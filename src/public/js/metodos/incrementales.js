function incrementales(){
    var mathjs = require('mathjs');
    str = 'log(sin(x)^2 + 1) - (1/2)';
    x0 = -3;
    delta = 0.5;
    niter = 100;
    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    fx0 = mathjs.evaluate(str,{x:x0});
    if (fx0 == 0){
        console.log(x0 + " es una raiz")
    }
    else {
        x1 = x0 + delta;
        cont = 0;
        fx1 = mathjs.evaluate(str,{x:x1});
        while (cont < niter){
            if (fx0 * fx1 < 0){
                if (fx1 == 0){
                    console.log(x1 + " es una raiz");
                }
                else {
                    console.log("Hay una raiz entre " + x0 + " y " + x1);
                }
            }
            x0 = x1;
            fx0 = fx1;
            x1 = x0 + delta;
            fx1 = mathjs.evaluate(str,{x:x1});
            cont = cont + 1;
        }
    }

}

incrementales()