const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    raicesMultiples();
});

function create_table(data, tbody) {
    data.forEach(row => {
        let trow = document.createElement('tr');

        let i = document.createElement('th');
        let i_text = document.createTextNode(row[0]);
        i.appendChild(i_text);
        trow.appendChild(i);

        let xi = document.createElement('th');
        let xi_text = document.createTextNode(row[1]);
        xi.appendChild(xi_text);
        trow.appendChild(xi);

        let fxi = document.createElement('th');
        let fxi_text = document.createTextNode(row[2]);
        fxi.appendChild(fxi_text);
        trow.appendChild(fxi);

        let E = document.createElement('th');
        let E_text = document.createTextNode(row[3]);
        E.appendChild(E_text);
        trow.appendChild(E);

        tbody.appendChild(trow);
        table_created = true;
    });
}

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
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        alert("La tolerancia debe ser positiva");
        return("Error");
    }
    fx = math.evaluate(str,{x:x0});
    dfx = dh.evaluate({x:x0});
    ddfx = ddh.evaluate({x:x0});
    if(isNaN(fx) || !isFinite(fx)){
        alert("Initial value is not on functions domain");
        return("Error");
    }
    if(isNaN(dfx) || !isFinite(dfx)){
        alert("Initian value is not on derivative domain");
        return("Error");
    }
    if(isNaN(ddfx) || !isFinite(ddfx)){
        alert("Initian value is not on second derivative domain");
        return("Error");
    }
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
        alert("Se encontro una aproximacion de la raiz en " + x0);
    } else if (dfx == 0){
        alert("Puede haber raices multiples");
    } else if (ddfx == 0){
        alert(x0 + " puede ser una raiz con multiplicidad 2");
    } else if (error < tol) {
        alert("Se encontro una aproximacion de la raiz en " + x0);
    } else {
        alert("El metodo no encontro la solucion");
        return("No la encontro");
    }
    if (!table_created) {
        create_table(data, document.getElementById('table-body'));
    } else {
        table.removeChild(document.getElementById('table-body'));
        let tbody = document.createElement('tbody');
        tbody.setAttribute("id", "table-body");
        table.appendChild(tbody);
        create_table(data, tbody);
    }
    console.table(data);
}

var parameters = {
    target: '#myFunction',
    data: [{
      fn: 'sin(x)', 
   }],
    grid: true,
    /*yAxis: {domain: [-1, 1]},
    xAxis: {domain: [0, 2*Math.PI]}*/
};
  
function plot() {
    var aus = "";
    aus = document.getElementById('function').value;
    var fu = aus.replaceAll('e','2.718281828459045');
    /*var xMin = document.querySelector("#xMin").value;
    var xMax = document.querySelector("#xMax").value;
    var yMin = document.querySelector("#yMin").value;
    var yMax = document.querySelector("#yMax").value;*/
    
    parameters.data[0].fn = fu;
    /*parameters.xAxis.domain = [xMin, xMax];
    parameters.yAxis.domain = [yMin, yMax];*/
    
    functionPlot(parameters);
}