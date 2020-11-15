const button = document.getElementById('start');
const table = document.getElementById('table');

var table_created = false;
var num_decimals = 4;

if (window.screen.availWidth > 900) {
    num_decimals = 6;
}

button.addEventListener('click', () => {
    reglaFalsa();
});

function create_table(data, tbody) {
    data.forEach(row => {
        let trow = document.createElement('tr');

        let i = document.createElement('th');
        let i_text = document.createTextNode(row[0]);
        i.appendChild(i_text);
        trow.appendChild(i);

        let a = document.createElement('th');
        let a_text = document.createTextNode(row[1], num_decimals);
        a.appendChild(a_text);
        trow.appendChild(a);

        let xm = document.createElement('th');
        let xm_text = document.createTextNode(row[2], num_decimals);
        xm.appendChild(xm_text);
        trow.appendChild(xm);

        let b = document.createElement('th');
        let b_text = document.createTextNode(row[3], num_decimals);
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

function reglaFalsa() {

    let str = document.getElementById('function').value;
    let a = document.getElementById('input-a').value;
    let b = document.getElementById('input-b').value;
    let niter = document.getElementById('iterations').value;
    let tol = document.getElementById('tolerance').value;

    //let str = 'log(sin(x)^2+1)-(1/2)';
    let data = [];

    // a = 0;
    // b = 1;
    // tol = 0.0000001;
    // niter = 100;

    if(niter < 0){
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        alert("La tolerancia debe ser positiva");
        return("Error");
    }
    if(b <= a){
        alert("b debe ser mayor a a");
        return("Error");
    }

    fa = math.evaluate(str,{x:a});
    fb = math.evaluate(str,{x:b});
    if (fa == 0) {
        console.log(a + " es una raiz");
    } else if ((fa * fb) < 0) {
        xm = (a - ((fa * (b - a)) / (fb - fa)));
        fxm= math.evaluate(str,{x:xm});
        contador = 1;
        var error = tol + 1;

    }
    data.push([contador, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1) ,'']);
    while ((error > tol) && (fxm != 0) && (contador < niter)) {
        if (fa * fxm < 0) {
            b = xm;
            fb = fxm;
        } else {
            a = xm;
            fa = fxm;
        }
        xprev = xm;
        xm = (a - ((fa * (b - a)) / (fb - fa)));
        fxm= math.evaluate(str,{x:xm});
        error = Math.abs(xm - xprev);
        contador = contador + 1;
        data.push([contador, Number.parseFloat(a).toPrecision(17), Number.parseFloat(xm).toPrecision(17), Number.parseFloat(b).toPrecision(17), Number.parseFloat(fxm).toExponential(1) ,Number.parseFloat(error).toExponential(1)]);
    }
    if (fxm == 0 || (error < tol)) {
        console.log("Se encontro una aproximacion de la raiz en " + xm);
        create_table(data, document.getElementById('table-body'));
        console.table(data);
    } else {
        console.log("El  metodo no encontro el resultado, intente de nuevo");
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