const size_btn = document.getElementById('size_btn');
const save_btn = document.getElementById('save');
const button = document.getElementById('start');
const input_table = document.getElementById('input_table');

var input_table_created = false;


let XY = [];
 
size_btn.addEventListener('click', () => {
    let size = document.getElementById('size').value;
    
    if (input_table_created) input_table.removeChild(document.getElementById('input_tbody'));

    let input_tbody = document.createElement('input_tbody');
    input_tbody.setAttribute('id', 'input_tbody')
    input_table.appendChild(input_tbody);
    create_input_table(input_tbody, size);
});

function create_input_table(tbody, size) {

    for (let row = 0; row < size; row++) {
        let input_row = document.createElement('tr');
        let x = document.createElement('td');
        let y = document.createElement('td');
        let input_x = document.createElement('input');
        let input_y = document.createElement('input');
        input_x.classList.add('matrix_input');
        input_y.classList.add('matrix_input');
        input_x.setAttribute('placeholder', `x ${row}`);
        input_y.setAttribute('placeholder', `y ${row}`);
        x.appendChild(input_x);
        y.appendChild(input_y);
        input_row.appendChild(x);
        input_row.appendChild(y);
        tbody.appendChild(input_row);
    }

    input_table_created = true;
}

save_btn.addEventListener('click', () => {
    if (!input_table_created) {
        alert('Set the matrix before save');
    }

    generate_arrays();
    alert('saved!');
});

function generate_arrays() {

    let x = [];
    let y = [];

    let rows = document.getElementById('input_tbody').childNodes;
    rows.forEach(row => {
       if (isNaN(parseFloat(row.childNodes[0].children[0].value))) {
            x.push(0);
        } else {
            x.push(parseFloat(row.childNodes[0].children[0].value));
        }
       if (isNaN(parseFloat(row.childNodes[1].children[0].value))) {
            y.push(0);
        } else {
            y.push(parseFloat(row.childNodes[1].children[0].value));
        }
    });
    XY = [x,y];
}

button.addEventListener('click', () => {
    trazLin();
});


function trazLin(){

    let X = XY[0]
    let Y = XY[1]

    let len = 2 * (X.length - 1);
    let A = [];
    let b = new Array(len);
    for(let i = 0; i < len; i++){
        A.push(new Array(len));
        b[i] = 0;
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A[i].length; j++){
            A[i][j] = 0;
        }
    }
    A[0][0] = X[0];
    A[0][1] = 1;
    b[0] = Y[0];
    let aux = 0;
    for(let i = 1; i < X.length; i++){
        for(let j = 0; j < A[i].length; j++){
            if((j % 2 == 0) && (((i * 2) - 2) == j)){
                A[i][j] = X[i];
            }
        }
        for(let j = 0; j < A[i].length; j++){
            if((j % 2 != 0) && (((i * 2) - 1) == j)){
                A[i][j] = 1;
            }
        }
        b[i] = Y[i];
        aux = i;
    }
    for(let i = aux + 1; i < len; i++){
        for(let j = 0; j < len; j++){
            if((j % 2 == 0) && (((2 * i) - (2 * (aux + 1))) == j)){
                A[i][j] = X[i - aux];
            }
            if((j % 2 != 0) && (((2 * i) - (2 * (aux + 1)) + 1) == j)){
                A[i][j] = 1;
            }
            if((j % 2 == 0) && (((2 * i) - (2 * (aux + 1)) + 2) == j)){
                if(X[i - aux] != 0){
                    A[i][j] = -X[i - aux];
                } else {
                    A[i][j] = X[i - aux];
                }
                
            }
            if((j % 2 != 0) && (((2 * i) - (2 * (aux + 1)) + 3) == j)){
                A[i][j] = -1;
            }
        }
    }
    let x = math.lusolve(A, b);
    let as = [];
    let bes = [];
    for(let i = 0; i < x.length; i++){
        if(i % 2 == 0){
            as.push(x[i][0].toPrecision(8));
        } else {
            bes.push(x[i][0].toPrecision(8));
        }
    }
    console.log("Trazadores lineales: ");
    console.log("");
    console.log("Resultados: ");
    console.log("");
    console.log("Coeficientes de los trazadores: ");
    for(let i = 0; i < X.length - 1; i++){
        console.log(as[i] + " " + bes[i]);

        let title = as[i] + " " + bes[i];
        let container = document.getElementById('results');
        let title_pol = document.createElement('h4');
        let tilte_pol_txt = document.createTextNode(title);
        title_pol.appendChild(tilte_pol_txt);
        container.appendChild(title_pol);
    }
    console.log("");
    console.log("Trazadores: ");
    for(let i = 0; i < X.length - 1; i++){
        if(bes[i] >= 0){
            console.log(as[i] + "x + " + bes[i]);

            let pol = as[i] + "x + " + bes[i];
            let container = document.getElementById('poli');
            let title_pol = document.createElement('h4');
            let tilte_pol_txt = document.createTextNode(pol);
            title_pol.appendChild(tilte_pol_txt);
            container.appendChild(title_pol);
        } else {
            console.log(as[i] + "x " + bes[i]);
        }
        
    }
}