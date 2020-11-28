
const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    puntoFijo();
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

        let gxi = document.createElement('th');
        let gxi_text = document.createTextNode(row[3]);
        gxi.appendChild(gxi_text);
        trow.appendChild(gxi);

        let E = document.createElement('th');
        let E_text = document.createTextNode(row[4]);
        E.appendChild(E_text);
        trow.appendChild(E);

        tbody.appendChild(trow);
        table_created = true;
    });
}

function puntoFijo(){

    //let strf = 'log(sin(x)^2+1)-(1/2)-(x)';//esta es la funcion f
    let strf = document.getElementById('function_f').value;
    //let strg = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion g
    let strg = document.getElementById('function_g').value;
    let data = [];
    //x0 = -0.5;
    let x0 = parseFloat(document.getElementById('input-x0').value);
    //tol = 0.0000001;
    let tol = parseFloat(document.getElementById('input-tol').value);
    //niter = 100;
    let niter = document.getElementById('iterations').value;
    contador = 0;
    var error = tol+1;
    fx= math.evaluate(strf,{x:x0});
    if(isNaN(fx) || !isFinite(fx)){
        alert("Initial value is not on functions domain");
        return("Error");
    }
    if(niter < 0){
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        alert("La tolerancia debe ser positiva");
        return("Error");
    }

    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1), '']);
    while((fx!=0) && (error>tol ) && (contador<niter)){
        xn= math.evaluate(strg,{x:x0});
        fx= math.evaluate(strf,{x:xn});
        error= Math.abs(xn-x0);
        x0= xn;
        contador= contador+1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(math.evaluate(strg,{x:x0})).toPrecision(17),Number.parseFloat(fx).toExponential(1),Number.parseFloat(error).toExponential(1)]);
    }
    if (fx == 0) {
        alert("Root aproximation found in " + x0);
    } else if (error < tol) {
        alert("Root aproximation found in " + x0);
    } else {
        alert("The method didn't found an aproximation, try again.");
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
    aus = document.getElementById('function_f').value;
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