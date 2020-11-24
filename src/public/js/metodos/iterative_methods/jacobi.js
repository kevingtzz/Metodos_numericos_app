const size_btn = document.getElementById('size_btn');
const save_btn = document.getElementById('save');
const button = document.getElementById('start');
const input_table_a = document.getElementById('input_table_a');
const input_table_b = document.getElementById('input_table_b');
const input_table_x0 = document.getElementById('input_table_x0');
const tables_container = document.getElementById('tables');


var input_table_created = false;
var stage_tables_created = false;
var size_generate = 0;

size_btn.addEventListener('click', () => {
    let size = document.getElementById('size').value;
    
    if (!input_table_created) {
        let tbody_a = document.getElementById('tbody_a');
        let tbody_b = document.getElementById('tbody_b');
        let tbody_x0 = document.getElementById('tbody_x0');
        create_input_table(tbody_a, tbody_b, tbody_x0, size);
    } else {
        size_generate = 0;
        input_table_a.removeChild(document.getElementById('tbody_a'));
        input_table_b.removeChild(document.getElementById('tbody_b'));
        input_table_x0.removeChild(document.getElementById('tbody_x0'));
        let tbody_a = document.createElement('tbody');
        let tbody_b = document.createElement('tbody');
        let tbody_x0 = document.createElement('tbody');
        tbody_a.setAttribute('id', 'tbody_a');
        tbody_b.setAttribute('id', 'tbody_b');
        tbody_x0.setAttribute('id', 'tbody_x0');
        input_table_a.appendChild(tbody_a);
        input_table_b.appendChild(tbody_b);
        input_table_x0.appendChild(tbody_x0);
        create_input_table(tbody_a, tbody_b, tbody_x0, size);
    }
});

function create_input_table(tbody_a, tbody_b, tbody_x0, size) {

    for (let row = 0; row < size; row++) {
        let input_row = document.createElement('tr');
        for (let col = 0; col < size; col++) {
            let input_col = document.createElement('td');
            let input = document.createElement('input');
            input.classList.add('matrix_input');
            input.setAttribute('placeholder', `a${row}${col}`);
            input_col.appendChild(input);
            input_row.appendChild(input_col);
        }
        size_generate++;
        tbody_a.appendChild(input_row);
    }

    for (let row = 0; row < size; row++) {
        let input_row = document.createElement('tr');
        let input_col = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add('matrix_input');
        input.setAttribute('placeholder', `b${row}`);
        input_col.appendChild(input);
        input_row.appendChild(input_col);
        tbody_b.appendChild(input_row);
    }

    for (let row = 0; row < size; row++) {
        let input_row = document.createElement('tr');
        let input_col = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add('matrix_input');
        input.setAttribute('placeholder', `x0 ${row}`);
        input_col.appendChild(input);
        input_row.appendChild(input_col);
        tbody_x0.appendChild(input_row);
    }

    input_table_created = true;
    console.log(size_generate);
}

save_btn.addEventListener('click', () => {
    if (!input_table_created) {
        alert('Set the matrix before save');
    }

    generate_arrays();
    alert('saved!');
});

function generate_arrays() {
    let a = [];
    let b = [];
    let x0 = [];

    let rows_a = document.getElementById('tbody_a').childNodes;
    let rows_b = document.getElementById('tbody_b').childNodes;
    let rows_x0 = document.getElementById('tbody_x0').childNodes;

    for (let row = 0; row < rows_a.length; row++) {
        let cols = rows_a[row].childNodes;
        let a_row = [];
        for (let col = 0; col < cols.length; col++) {
            if (isNaN(parseFloat(cols[col].firstChild.value))) {
                a_row.push(0);
            } else {
                a_row.push(parseFloat(cols[col].firstChild.value));
            }
        }
        a.push(a_row);
    }

    for (let row = 0; row < rows_b.length; row++) {
        if (isNaN(parseFloat(rows_b[row].firstChild.firstChild.value))) {
            b.push(0);
        } else {
            b.push([parseFloat(rows_b[row].firstChild.firstChild.value)]);
        }
    }

    for (let row = 0; row < rows_x0.length; row++) {
        if (isNaN(parseFloat(rows_x0[row].firstChild.firstChild.value))) {
            x0.push(0);
        } else {
            x0.push(parseFloat(rows_x0[row].firstChild.firstChild.value))
        }
    }

    return [a, b, x0];
}

button.addEventListener('click', () => {
    jacobi();
});

function hallarInversa(A){
    let I = [];
    for(let i = 0; i < A.length; i++){
        I.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i == j){
                I[i][j] = 1;
            } else {
                I[i][j] = 0;
            }
        }
    }
    for(let i = 0; i < A.length; i++){
        let divFila = 1/A[i][i];
        for(let j = 0; j < A[i].length; j++){
            A[i][j] = (A[i][j]) * divFila;
            I[i][j] = (I[i][j]) * divFila;
        }
        for(let j = 0; j < A.length; j++){
            if(i != j){
                let div = A[j][i] / A[i][i];
                for(let k = 0; k < A.length; k++){
                    A[j][k] = (A[j][k] - (div * A[i][k]));
                    I[j][k] = (I[j][k] - (div * I[i][k]));
                }
            }
        }
    }
    return I;
}

function formarMatrizD(A){
    let D = [];
    for(let i = 0; i < A.length; i++){
        D.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i == j){
                D[i][j] = A[i][j];
            } else {
                D[i][j] = 0;
            }
        }
    }
    return D;
}

function formarMatrizL(A){
    let L = [];
    for(let i = 0; i < A.length; i++){
        L.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i > j){
                L[i][j] = -A[i][j];
            } else {
                L[i][j] = 0;
            }
        }
    }
    return L;
}

function formarMatrizU(A){
    let U = [];
    for(let i = 0; i < A.length; i++){
        U.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i < j){
                U[i][j] = -A[i][j];
            } else {
                U[i][j] = 0;
            }
        }
    }
    return U;
}

function sumarMatrices(A, B){
    let SUM = [];
    for(let i = 0; i < A.length; i++){
        SUM.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            SUM[i][j] = A[i][j] + B[i][j];
        }
    }
    return SUM;
}

function restarMatrices(A, B){
    let SUB = [];
    for(let i = 0; i < A.length; i++){
        SUB.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            SUB[i][j] = A[i][j] - B[i][j];
        }
    }
    return SUB;
}

function multiplicarMatrices(A, B){
    let MUL = [];
    for(let i = 0; i < A.length; i++){
        MUL.push(new Array(B[i].length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < B[i].length; j++){
            MUL[i][j] = 0;
        }
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < B[i].length; j++){
            for(let k = 0; k < A.length; k++){
                MUL[i][j] = MUL[i][j] + (A[i][k] * B[k][j]);
            }
        }
    }
    return MUL;
}

function imprimirMatriz(A){
    let data = [];
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A[i].length; j++){
            A[i][j] = A[i][j].toPrecision(6);
        }
    }
    for(let i = 0; i < A.length; i++){
        data.push(A[i]);
    }
    return data;
}

function jacobi(){

    if (stage_tables_created) {
        tables_container.removeChild(document.getElementById('stage_tables'));
        let stage_tables = document.createElement('div');
        stage_tables.setAttribute('id', 'stage_tables');
        tables_container.appendChild(stage_tables);
    }

    AB = generate_arrays();
    //una wea
    //var mama = require('ml-matrix');//usa libreria
    let data = [];
    var A = AB[0];
    var b = AB[1];
    let x0 = AB[2];//entrada
    let x1 = new Array(x0.length);
    let tol = parseFloat(document.getElementById('tolerance').value);
    let Nmax = document.getElementById('iterations').value;
    for(let i = 0; i < A.length;i++){
        if(A.length != A[i].length){
            alert("La matriz A debe ser cuadrada");
            return("Error");
        }
    }
    if(A.length != b.length){
        alert("Las matrices A debe tener la misma cantidad de columnas que filas de b");
        return("Error");
    }
    if(x0.length != A.length){
        alert("El vector inicial debe ser compatible con la matriz A");
        return("Error");
    }
    if(Nmax < 0){
        alert("El numero de iteraciones debe ser positivo");
        return("Error");
    }
    if(tol < 0){
        alert("La tolerancia debe ser positiva");
        return("Error");
    }
    let D = formarMatrizD(A);
    let L = formarMatrizL(A);
    let U = formarMatrizU(A);
    let DI = hallarInversa(D);
    let LU = sumarMatrices(L, U);
    let T = multiplicarMatrices(DI, LU);
    let C = multiplicarMatrices(DI, b);
    let error = 1;
    let cont = 0;
    for(let i = 0; i< x0.length; i++){
        x0[i] = x0[i].toPrecision(8);
    }
    data = [
        /*['Iter', 'E', 'x']*/
    ];
    data.push([cont, '', x0]);
    while((cont < Nmax) && (error > tol)){
        for(let i = 0; i < x0.length; i++){
            let sum = 0;
            for(let j = 0; j < x0.length; j++){
                sum = sum + (T[i][j] * x0[j]);
            }
            x1[i] = (sum + C[i][0]).toPrecision(8);
        }
        let suma = 0;
        for(let i = 0; i < x1.length; i++){
            suma = suma + (Math.pow(Math.abs(x1[i] - x0[i]),2));
        }
        error = Math.sqrt(suma).toExponential(1);
        cont = cont + 1;
        data.push([cont, error, x1]);
        x0 = x1;
        x1 = new Array(x0.length);
    }
    console.table(data);

    let title = document.createElement('h3');
    title.appendChild(document.createTextNode(`Results`));
    title.classList.add("stage_title");
    stage_tables.appendChild(title);

    let table = document.createElement('table');
    table.classList.add("table");
    let tbody = document.createElement('tbody');
    tbody.setAttribute("id", `tbody_results`);
    table.appendChild(tbody);
    stage_tables.appendChild(table);
    create_result_table(data, tbody);

    let matrizT = imprimirMatriz(T);
    console.log("T: ");
    console.table(matrizT);

    let titlet = document.createElement('h3');
    titlet.appendChild(document.createTextNode(`T`));
    titlet.classList.add("stage_title");
    stage_tables.appendChild(titlet);

    let tablet = document.createElement('table');
    tablet.classList.add("table");
    let tbodyt = document.createElement('tbody');
    tbodyt.setAttribute("id", `tbody_t`);
    tablet.appendChild(tbodyt);
    stage_tables.appendChild(tablet);
    create_result_table(matrizT, tbodyt);

    let matrizC = imprimirMatriz(C);
    console.log("U: ");
    console.table(matrizC);

    let titlec = document.createElement('h3');
    titlec.appendChild(document.createTextNode(`C`));
    titlec.classList.add("stage_title");
    stage_tables.appendChild(titlec);

    let tablec = document.createElement('table');
    tablec.classList.add("table");
    let tbodyc = document.createElement('tbody');
    tbodyc.setAttribute("id", `tbody_c`);
    tablec.appendChild(tbodyc);
    stage_tables.appendChild(tablec);
    create_result_table(matrizC, tbodyc);

    // console.log("Radio espectral: ");
    // var e = new mama.EigenvalueDecomposition(T);
    // var aba = e.realEigenvalues;
    // for(let i = 0; i < aba.length; i++){
    //     aba[i] = Math.abs(aba[i]).toPrecision(8);
    // }
    // console.log(max(aba));
}

function create_result_table(data, tbody) {
    
    for (let row = 0; row < data.length; row++) {
        let t_row = document.createElement('tr');
        for (let col = 0; col < data[row].length; col++) {
            let t_col = document.createElement('td');
            let iter = document.createElement('span');
            let iter_text = document.createTextNode(data[row][col]);
            iter.appendChild(iter_text);
            t_col.appendChild(iter);
            t_row.appendChild(t_col);
        }
        tbody.appendChild(t_row);
    }
}