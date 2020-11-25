const size_btn = document.getElementById('size_btn');
const save_btn = document.getElementById('save');
const button = document.getElementById('start');
const input_table_a = document.getElementById('input_table_a');
const input_table_b = document.getElementById('input_table_b');
const tables_container = document.getElementById('tables');

var input_table_created = false;
var stage_tables_created = false;
var size_generate = 0;

size_btn.addEventListener('click', () => {
    let size = document.getElementById('size').value;
    
    if (!input_table_created) {
        let tbody_a = document.getElementById('tbody_a');
        let tbody_b = document.getElementById('tbody_b');
        create_input_table(tbody_a, tbody_b, size);
    } else {
        size_generate = 0;
        input_table_a.removeChild(document.getElementById('tbody_a'));
        input_table_b.removeChild(document.getElementById('tbody_b'));
        let tbody_a = document.createElement('tbody');
        let tbody_b = document.createElement('tbody');
        tbody_a.setAttribute('id', 'tbody_a');
        tbody_b.setAttribute('id', 'tbody_b');
        input_table_a.appendChild(tbody_a);
        input_table_b.appendChild(tbody_b);
        create_input_table(tbody_a, tbody_b, size);
    }
});


function create_input_table(tbody_a, tbody_b, size) {

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

    let rows_a = document.getElementById('tbody_a').childNodes;
    let rows_b = document.getElementById('tbody_b').childNodes;

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
            b.push(parseFloat(rows_b[row].firstChild.firstChild.value))
        }
    }

    return [a, b];
}

button.addEventListener('click', () => {
    cholesky();
});

function sustProgr(M){
    let x = new Array(M.length);
    for(let i = 0; i < x.length; i++){
        x[i] = 0;
    }
    x[0] = M[0][M.length] / M[1][1];
    for(let i = 1; i < M.length; i++){
        let sum = 0;
        for(let j = 0; j < i; j++){
            sum = sum + (M[i][j] * x[j]);
        }
        x[i] = ((M[i][M.length] - sum)/(M[i][i]));
    }
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

function cholesky(){
    console.log("Cholesky");
    console.log("Resultados: \n");

    if (stage_tables_created) {
        tables_container.removeChild(document.getElementById('stage_tables'));
        let stage_tables = document.createElement('div');
        stage_tables.setAttribute('id', 'stage_tables');
        tables_container.appendChild(stage_tables);
    }
    
    AB = generate_arrays();
    var A = AB[0];
    var b = AB[1];

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
    let L = [];
    let U = [];
    let dataU = [];
    let dataL = [];
    let dataA = [];
    for(let i = 0; i < A.length; i++){
        L.push(new Array(A.length));
        U.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            A[i][j] = A[i][j].toPrecision(8);
            if(i == j){
                L[i][j] = 1;
                U[i][j] = 1;
                U[i][j] = U[i][j].toPrecision(8);
                L[i][j] = L[i][j].toPrecision(8);
            } else {
                L[i][j] = 0;
                U[i][j] = 0;
                U[i][j] = U[i][j].toPrecision(8);
                L[i][j] = L[i][j].toPrecision(8);
            }
        }
    }
    for(let i = 0; i < A.length; i++){
        dataL.push(L[i]);
        dataU.push(U[i]);
        dataA.push(A[i]);
    }
    for(let i = 0; i < A.length; i++){
        let sum = 0;
        for(let j = 0; j < i; j++){
            sum = sum + (L[i][j] * U[j][i]);
        }
        if(A[i][i] - sum < 0){
            alert("Error. En el proceso aparecen numeros complejos que el lenguaje no soporta");
            return ("ERROR");
        } else {
            U[i][i] = Math.sqrt(A[i][i] - sum);
        }
        L[i][i] = U[i][i].toPrecision(8);

        for(let j = i; j < A.length; j++){
            sum = 0;
            for(let k = 0; k < i; k++){
                sum = sum + (L[j][k] * U[k][i]);
            }
            L[j][i] = ((A[j][i] - sum)/(L[i][i])).toPrecision(8);
        }
        for(let j = i; j < A.length; j++){
            sum = 0;
            for(let k = 0; k < i; k++){
                sum = sum + (L[i][k] * U[k][j]);
            }
            U[i][j] = ((A[i][j] - sum)/(L[i][i])).toPrecision(8);
        }
        if(i == 0){
            console.log("Etapa " + (i));
            console.table(dataA);

            let title = document.createElement('h3');
            title.appendChild(document.createTextNode(`Stage ${i}`));
            title.classList.add("stage_title");
            stage_tables.appendChild(title);
    
            let table = document.createElement('table');
            let tbody = document.createElement('tbody');
            tbody.setAttribute("id", `tbody_etapa${i}`);
            table.appendChild(tbody);
            stage_tables.appendChild(table);
            create_process_tables(dataA, i, tbody);
        }
        console.log("Etapa " + (i + 1));
        console.log("L: ");
        console.table(dataL);

        let titleL = document.createElement('h3');
        titleL.appendChild(document.createTextNode(`L ${i}`));
        titleL.classList.add("stage_title");
        stage_tables.appendChild(titleL);

        let tableL = document.createElement('table');
        let tbodyL = document.createElement('tbody');
        tbodyL.setAttribute("id", `L${i}`);
        tableL.appendChild(tbodyL);
        stage_tables.appendChild(tableL);
        create_process_tables(dataL, i, tbodyL);

        console.log("U: ");
        console.table(dataU);

        let titleU = document.createElement('h3');
        titleU.appendChild(document.createTextNode(`U ${i}`));
        titleU.classList.add("stage_title");
        stage_tables.appendChild(titleU);

        let tableU = document.createElement('table');
        let tbodyU = document.createElement('tbody');
        tbodyU.setAttribute("id", `U${i}`);
        tableU.appendChild(tbodyU);
        stage_tables.appendChild(tableU);
        create_process_tables(dataU, i, tbodyU);

    }
    let Lb = [];
    Lb = L;
    let z = math.lusolve(L,b);
    for(let i = 0; i < Lb.length; i++){
        Lb[i].push(b[i]);
    }
    let a = sustProgr(Lb);
    let Uz = [];
    Uz = U;
    for(let i = 0; i < Uz.length; i++){
        Uz[i].push(z[i]);
    }
    let x = sustRegr(Uz);
    console.log("Despues de aplicar sustitucion progresiva y regresiva: ");
    console.log(x);

    if (!stage_tables_created) {
        create_res_table(x, document.getElementById('tbody_res'));
        stage_tables_created = true;
    } else {
        let table = document.getElementById('res');
        table.removeChild(document.getElementById('tbody_res'));
        let tbody = document.createElement('tbody');
        tbody.setAttribute('id', 'tbody_res');
        table.appendChild(tbody);
        create_res_table(x, tbody);
    }
}

function create_process_tables(data, stage, tbody) {
    
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