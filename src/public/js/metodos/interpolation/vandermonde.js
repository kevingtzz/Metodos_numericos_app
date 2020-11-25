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
    vandermonde();
});

function gaussTotal(A, b){
    let M = [];
    M = A;
    for(let h = 0; h < A.length; h++) {
        M[h].push(b[h]);
    }
    for(let i = 0; i < M.length; i++){
        M = cambiarFilas(M, i);
        for(let j = i + 1; j < M.length; j++){
            let divisor = M[j][i] / M[i][i];
            for(let k = i; k < M.length + 1; k++){
                M[j][k] = (M[j][k] - (divisor * M[i][k]));
            }
        }
    }
    let x = sustRegr(M);
    return x;
}

function sustRegr(M){
    let x = new Array(M.length);
    for(let i = 0; i < x.length; i++){
        x[i] = 0;
    }
    for(let i = M.length - 1; i >= 0; i--){
        let sum = 0;
        for(let j = i + 1; j < M[i].length; j++){
            sum = sum + (M[i][j - 1] * x[j - 1]);
        }
        x[i] = ((M[i][M.length] - sum) / (M[i][i])).toPrecision(8);
    }
    return x;
}

function cambiarFilas(M, i){
    let aux = i;
    let aux2 = i;
    for(let f = i; f < M.length; f++){
        for(let h = i; h < M.length; h++){
            if (Math.abs(M[aux][aux2]) < Math.abs(M[f][h])){
                aux = f;
                aux2 = h;
            }
        }
    }
    let filaAux = M[i];
    M[i] = M[aux];
    M[aux] = filaAux;
    for(let b = 0; b < M.length; b++){
        let colAux = M[b][i];
        M[b][i] = M[b][aux2];
        M[b][aux2] = colAux;
    }
    return M;
}

function vandermonde(){
    console.log("Vandermonde");
    console.log("Resultados: ");
    let X = XY[0];
    let Y = XY[1];

    for(let i = 0; i < X.length; i++){
        for(let j = i; j < X.length; j++){
            if(X[i] == X[j]){
                alert("There cannot be equal values in X vector");
                return("Error");
            }
        }
    }
    let V = [];
    let data = [];
    for(let i = 0; i < X.length; i++){
        V.push(new Array(X.length));
        data.push(V[i]);
    }
    for(let i = 0; i < V.length; i++){
        for(let j = 0; j < V[i].length; j++){
            V[i][j] = Math.pow(X[i], (V.length - 1) - j).toPrecision(8);
        }
    }
    console.log("Matriz de Vandermonde: ");
    console.table(data);

    if (table_created) {
        document.getElementById('div_table').removeChild(document.getElementById('div_tbody'))
    } 
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'div_tbody');
    document.getElementById('div_table').appendChild(tbody);
    create_process_tables(data, tbody);

    let x = gaussTotal(V, Y);
    let str = "";
    console.log("Coeficientes del polinomio: ");
    for(let i = 0; i < x.length; i++){
        str = str + " " + x[i];
    }
    console.log(str);

    if (table_created) {
        document.getElementById('co_pol').removeChild(document.getElementById('co_pol_title'));
    }

    let co_container = document.getElementById('co_pol');
    let co_title_pol = document.createElement('h4');
    co_title_pol.setAttribute('id', 'co_pol_title');
    let co_tilte_pol_txt = document.createTextNode(str);
    co_title_pol.appendChild(co_tilte_pol_txt);
    co_container.appendChild(co_title_pol);

    console.log("Polinomio: ");
    str = "";
    for(let i = 0; i < x.length; i++){
        if(x[i] >= 0){
            if((x.length - 1 - i) == 1){
                str = str + " + " + x[i] + "x";
            } else if((x.length - 1 - i) == 0){
                str = str + " + " + x[i];
            } else {
                str = str + " + " + x[i] + "x^" + (x.length - 1 - i);
            }
        } else {
            if((x.length - 1 - i) == 1){
                str = str + " " + x[i] + "x";
            } else if((x.length - 1 - i) == 0){
                str = str + " " + x[i];
            } else {
                str = str + " " + x[i] + "x^" + (x.length - 1 - i);
            }
        }
    }
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