const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    raicesMultiples();
});

function raicesMultiples(){

    //let str = 'e^x - x - 1';//esta es la funcion
    let str = document.getElementById('function').value;
    var dh = math.derivative(str,'x');
    var ddh = math.derivative(dh, 'x');
    let data = [];
    //x0 = 1;
    let x0 = parseFloat(document.getElementById('input-x0').value);
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
    fx = math.evaluate(str,{x:x0});
    dfx = dh.evaluate({x:x0});
    ddfx = ddh.evaluate({x:x0});
    cont = 0;
    error = tol + 1;
    data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx).toExponential(1),'']);
    while ((error > tol) && (cont < niter)){
        x1 = x0 - ((fx * dfx)/((Math.pow(dfx, 2)) - (fx * ddfx)));
        fx = math.evaluate(str,{x:x1});
        dfx = dh.evaluate({x:x1});
        ddfx = ddh.evaluate({x:x1});
        error = Math.abs(x1 - x0);
        x0 = x1;
        cont = cont + 1;
        data.push([cont, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx).toExponential(1), Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0){
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else if (dfx == 0){
        console.log("Puede haber raices multiples");
    } else if (ddfx == 0){
        console.log(x0 + " puede ser una raiz con multiplicidad 2");
    } else if (error < tol) {
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else {
        console.log("El metodo no encontro la solucion");
    }
    console.table(data);
}