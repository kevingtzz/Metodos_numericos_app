const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    secante();
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
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        alert("La tolerancia debe ser positiva");
        return("Error");
    }
    if(x1 <= x0){
        alert("x1 debe ser mayor a x0");
        return("Error");
    }
    fx0 = math.evaluate(str,{x:x0});
    fx1 = math.evaluate(str,{x:x1});
    if(isNaN(fx0) || isNaN(fx1)){
        alert("Initial interval is not on functions domain");
        return("Error");
    }
    if (fx0 == 0){
        console.log("Se encontro una aproximacion de la raiz en " + x0);
    } else {
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
            alert("Root aproximation found in " + x1);
        } else if (error < tol){
            alert("Root aproximation found in " + x1);
        } else if (fx1 - fx0){
            alert("Posible multiple roots");
        } else {
            alert("The method didn't found an aproximation, try again.");
        }
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