const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    incrementales();
});

function incrementales(){

    //str = 'log(sin(x)^2 + 1) - (1/2)';
    let str = document.getElementById('function').value;
    let x0 = parseFloat(document.getElementById('input-x0').value);
    let delta = parseFloat(document.getElementById('input-delta').value);
    let niter = document.getElementById('iterations').value;

    if (!table_created) {
        var tbody = document.getElementById('table-body');
    } else {
        table.removeChild(document.getElementById('table-body'));
        tbody = document.createElement('tbody');
        tbody.setAttribute("id", "table-body");
        table.appendChild(tbody);
    }
    
    //x0 = -3;
    //delta = 0.5;
    //niter = 100;
    if(niter < 0){
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    fx0 = math.evaluate(str,{x:x0});
    if(isNaN(fx0)){
        alert("Initian value is not on functions domain");
        return("Error");
    }
    if (fx0 == 0){
        let row = document.createElement('tr');

        let des = document.createElement('th');
        let des_text = document.createTextNode(`Root in ${x0}`);
        des.appendChild(des_text);
        row.appendChild(des);

        tbody.appendChild(row);
    }
    else {
        x1 = x0 + delta;
        cont = 0;
        fx1 = math.evaluate(str,{x:x1});
        while (cont < niter){
            if (fx0 * fx1 < 0){
                if (fx1 == 0){
                    let row = document.createElement('tr');

                    let des = document.createElement('th');
                    let des_text = document.createTextNode(`Root in ${x1}`);
                    des.appendChild(des_text);
                    row.appendChild(des);

                    tbody.appendChild(row);
                }
                else {
                    console.log("Hay una raiz entre " + x0 + " y " + x1);
                    let row = document.createElement('tr');

                    let des = document.createElement('th');
                    let des_text = document.createTextNode(`Root between ${x0} and ${x1}`);
                    des.appendChild(des_text);
                    row.appendChild(des);

                    tbody.appendChild(row);
                }
            }
            x0 = x1;
            fx0 = fx1;
            x1 = x0 + delta;
            fx1 = math.evaluate(str,{x:x1});
            cont = cont + 1;
        }
        table_created = true;
    }

}

var parameters = {
    target: '#myFunction',
    data: [{
      fn: 'sin(x)', 
   }],
    grid: true,
    yAxis: {domain: [-1, 1]},
    xAxis: {domain: [0, 2*Math.PI]}
};
  
function plot() {
    var aus = "";
    aus = document.getElementById('function').value;
    var fu = aus.replaceAll('e','2.718281828459045');
    var xMin = document.querySelector("#xMin").value;
    var xMax = document.querySelector("#xMax").value;
    var yMin = document.querySelector("#yMin").value;
    var yMax = document.querySelector("#yMax").value;
    
    parameters.data[0].fn = fu;
    parameters.xAxis.domain = [xMin, xMax];
    parameters.yAxis.domain = [yMin, yMax];
    
    functionPlot(parameters);
}