const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    biseccion();
});

function create_table(data, tbody) {
    data.forEach(row => {
        let trow = document.createElement('tr');

        let i = document.createElement('th');
        let i_text = document.createTextNode(row[0]);
        i.appendChild(i_text);
        trow.appendChild(i);

        let a = document.createElement('th');
        let a_text = document.createTextNode(row[1]);
        a.appendChild(a_text);
        trow.appendChild(a);

        let xm = document.createElement('th');
        let xm_text = document.createTextNode(row[2]);
        xm.appendChild(xm_text);
        trow.appendChild(xm);

        let b = document.createElement('th');
        let b_text = document.createTextNode(row[3]);
        b.appendChild(b_text);
        trow.appendChild(b);

        let f = document.createElement('th');
        let f_text = document.createTextNode(row[4]);
        f.appendChild(f_text);
        trow.appendChild(f);

        let e = document.createElement('th');
        let e_text = document.createTextNode(row[5]);
        e.appendChild(e_text);
        trow.appendChild(e);

        tbody.appendChild(trow);
        table_created = true;
    });
}


function biseccion() {
    let func = document.getElementById('function').value;
    let a = document.getElementById('input-a').value;
    let b = document.getElementById('input-b').value;
    let niter = document.getElementById('iterations').value;
    let tol = document.getElementById('tolerance').value;

    //console.log(func);

    if ((a == '') || (b == '') || (niter == '') || (tol == '')) {
        alert('Values missing');
    } else {
        a = parseFloat(a);
        b = parseFloat(b);
    
        let data = [];
        //a = 0;
        //b = 1;
        //tol = 0.0000001;//E-7
        //niter = 100;
        fa = math.evaluate(func,{x:a});
        fb = math.evaluate(func,{x:b});
        if(isNaN(fa) || isNaN(fb)){
            alert("Initial interval is not on functions domain");
            return("Error");
        }
        if(niter < 0){
            alert("Iterations must be positive");
            return("Error");
        }
        if(tol < 0){
            alert("Tolerance must be positive");
            return("Error");
        }
        if(b < a){
            alert("b must be greater than a");
            return("Error");
        }
    
        if (fa == 0) {
            console.log("Se encontro una aproximacion de la raiz en " + xm);
        } else {
            xm = (a + b)/(2);
            fxm = math.evaluate(func,{x:xm});
            cont = 1;
            var error = tol + 1;
            data.push([0, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1), '']);
            while ((cont <= niter) && (fxm != 0) && (error > tol)){
                if (fa * fxm > 0){
                    a = xm;
                    fa = fxm;
                } else {
                    b = xm;
                    fb = xm;
                }
                xprev = xm;
                xm = (a + b)/(2);
                fxm = math.evaluate(func,{x:xm});
                error = Math.abs(xprev - xm);
                data.push([cont, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1), Number.parseFloat(error).toExponential(1)]);
                cont = cont + 1;
            }
            if ((fxm == 0) || (error < tol)) {
                if (!table_created) {
                    create_table(data, document.getElementById('table-body'));
                } else {
                    table.removeChild(document.getElementById('table-body'));
                    let tbody = document.createElement('tbody');
                    tbody.setAttribute("id", "table-body");
                    table.appendChild(tbody);
                    create_table(data, tbody);
                }
                alert('Approximation found on: ' + xm);
            } else {
                alert("The method didn't find an approximation");
            }
        }
    }
}

function round(num, decimales = 2) {
    var signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
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