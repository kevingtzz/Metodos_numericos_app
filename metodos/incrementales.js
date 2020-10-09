function f(x){
    return Math.log((Math.sin(x) * Math.sin(x)) + 1) - (1/2);
}


function incrementales(){
    x0 = -3;
    delta = 0.5;
    niter = 100;
    fx0 = f(x0);
    if (fx0 == 0){
        console.log(x0 + " es una raiz")
    }
    else {
        x1 = x0 + delta;
        cont = 0;
        fx1 = f(x1);
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
            fx1 = f(x1);
            cont = cont + 1;
        }
    }

}

incrementales()