const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    secante();
});

function secante(){

    //let str = 'log(sin(x)^2 + 1) - (1/2)';//esta es la funcion
    let str = document.getElementById('function').value;
    let data = [];
    //x0 = 0.5;
    let x0 = parseFloat(document.getElementById('input-x0').value)
    //x1 = 1;
    let x1 = parseFloat(document.getElementById('input-x1').value)
    //tol = 0.0000001; //E-7
    let tol = parseFloat(document.getElementById('input-tol').value);
    //niter = 100;
    let niter = document.getElementById('iterations').value;

    if(niter < 0){
        console.log("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        console.log("La tolerancia debe ser positiva");
        return("Error");
    }
    if(x1 <= x0){
        console.log("x1 debe ser mayor a x0");
        return("Error");
    }
    fx0 = math.evaluate(str,{x:x0});
    if (fx0 == 0){
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else {
        fx1 = math.evaluate(str,{x:x1});
        cont = 0;
        var error = tol + 1;
        data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
        while ((cont <= niter) && (error > tol) && (fx1 != 0)){
            xn = x1 - ((fx1 * (x1 - x0))/(fx1 - fx0));
            error = Math.abs(x1 - x0);
            x0 = x1;
            fx0 = fx1;
            x1 = xn;
            fx1 = math.evaluate(str,{x:xn});
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
    console.table(data);
}