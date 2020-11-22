const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;

button.addEventListener('click', () => {
    newton();
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

function newton() {

    //let str = 'log(sin(x)^2+1)-(1/2)';//esta es la funcion
    let str = document.getElementById('function').value;
    var dfx = math.derivative(str,'x');
    let data = [];

   //x0 = 0.5;
    let x0 = parseFloat(document.getElementById('input-x0').value);
    //tol = 0.0000001;
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

    fx0 = math.evaluate(str,{x:x0});
    dfx0= dfx.evaluate({x:x0});
    contador = 0;
    var error = tol + 1;
    data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), '']);
    while ((error > tol) && (fx0 != 0) && (dfx0 != 0) && (contador < niter)) {
        xn = x0 - (fx0 / dfx0);
        fx0 = math.evaluate(str,{x:xn});
        dfx0= dfx.evaluate({x:xn});
        error = Math.abs(xn - x0);
        x0 = xn;
        contador = contador + 1;
        data.push([contador, Number.parseFloat(x0).toPrecision(17), Number.parseFloat(fx0).toExponential(1), Number.parseFloat(error).toExponential(1)]);

    }
    if (fx0 == 0) {
        alert("Aproximation found in " + x0);
    } else if (error < tol) {
        alert("Root aproximation found in " + xn);
    } else if (dfx0 == 0) {
        alert("Posible multiple roots");
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