const size_btn = document.getElementById('size_btn');
const save_btn = document.getElementById('save');
const button = document.getElementById('start');
const input_table = document.getElementById('input_table');

var input_table_created = false;
var table_created = false;


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
    newtonInterpolacion();
});

function newtonInterpolacion(){
    console.log("Newton");
    console.log("Resultados: ");
    let X = XY[0]
    let Y = XY[1]
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
    let b = [];
    let D = [];
    let data = [];
    for(let i = 0; i < X.length; i++){
        D.push(new Array(X.length));
    }
    for(let i = 0; i < X.length; i++){
        data.push(D[i]);
    }
    for(let i = 0; i < D.length; i++){
        for(let j = 0; j < D[i].length; j++){
            D[i][j] = 0;
            D[i][j] = D[i][j].toPrecision(8);
        }
    }
    for(let i = 0; i < X.length; i++){
        D[i][0] = Y[i].toPrecision(8);
    }
    for(let i = 0; i < X.length; i++){
        for(let j = 1; j < i + 1; j++){
            D[i][j] = ((D[i][j - 1] - D[i - 1][j - 1])/(X[i] - X[i - j])).toPrecision(8);
        }
    }
    for(let i = 0; i < D.length; i++){
        for(let j = 0; j < D[i].length; j++){
            if(i == j){
                b.push(D[i][j]);
            }
        }
    }
    let bla = "";
    let str = D[0][0] + " ";
    for(let i = 1; i < X.length; i++){
        if(X[i - 1] >= 0){
            bla = bla + "(x" + " - "+ (X[i - 1]) +")";
            str = str + (D[i][i] > 0 ? " + " : " ") + (D[i][i] + " * " + bla);
        } else {
            bla = bla + "(x" + " + "+ (-X[i - 1]) +")";
            str = str + (D[i][i] > 0 ? " + " : " ") + (D[i][i] + " * " + bla);
        }
        
    }
    console.log("Tabla de diferencias divididas: ");
    console.table(data);

    if (table_created) {
        document.getElementById('div_table').removeChild(document.getElementById('div_tbody'))
    } 
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'div_tbody');
    document.getElementById('div_table').appendChild(tbody);
    create_process_tables(data, tbody);

    console.log("Coeficientes del polinomio de Newton: ");
    console.log(b);

    if (table_created) {
        document.getElementById('co_table').removeChild(document.getElementById('co_tbody'));
    } 
    let co_tbody = document.createElement('tbody');
    co_tbody.setAttribute('id', 'co_tbody');
    document.getElementById('co_table').appendChild(co_tbody);
    create_res_table(b, co_tbody);

    console.log("Polinomio de Newton: ");
    console.log(str);

    if (table_created) {
        document.getElementById('poli').removeChild(document.getElementById('pol'));
    }

    let container = document.getElementById('poli');
    let title_pol = document.createElement('h4');
    title_pol.setAttribute('id', 'pol');
    let tilte_pol_txt = document.createTextNode(str);
    title_pol.appendChild(tilte_pol_txt);
    container.appendChild(title_pol);

    table_created = true;
}

function create_process_tables(data, tbody) {
    
    for (let row = 0; row < data.length; row++) {
        let input_row = document.createElement('tr');
        for (let col = 0; col < data[row].length; col++) {
            let input_col = document.createElement('td');
            let input = document.createTextNode(data[row][col]);
            console.log(data[row][col]);
            input_col.appendChild(input);
            input_row.appendChild(input_col)
        }
        tbody.appendChild(input_row);
    }
}

function create_res_table(data, tbody) {
    let input_row = document.createElement('tr');
    for (let col = 0; col < data.length; col++) {
        let input_col = document.createElement('td');
        let input = document.createTextNode(data[col]);
        input_col.appendChild(input)
        input_row.appendChild(input_col);
    }
    tbody.appendChild(input_row);
}