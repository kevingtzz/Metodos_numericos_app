const size_btn = document.getElementById('size_btn');
const save_btn = document.getElementById('save');
const button = document.getElementById('start');
const input_table_a = document.getElementById('input_table_a');
const input_table_b = document.getElementById('input_table_b');

var input_table_created = false;
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
            a_row.push(parseFloat(cols[col].firstChild.value));
        }
        a.push(a_row);
    }

    for (let row = 0; row < rows_b.length; row++) {
        b.push(parseFloat(rows_b[row].firstChild.firstChild.value))
    }

    return [a, b];
}

button.addEventListener('click', () => {
    gaussianaSimple();
});

function gaussianaSimple(){

    AB = generate_arrays();
      
    var A = AB[0];
    var b = AB[1];

    let data = [];
    var M = [];
    M = A;
    for(i = 0; i < M.length; i++){
        for(j = 0; j < M[i].length; j++){
            M[i][j] = M[i][j].toPrecision(8);
        }
    }
    for(i = 0; i < A.length; i++) {
        data.push(M[i]);
        M[i].push(b[i].toPrecision(8));
    }
    for(i = 0; i < M.length; i++){
        for(j = i + 1; j < M.length; j++){
            divisor = M[j][i] / M[i][i];
            for(k = i; k < M.length + 1; k++){
                M[j][k] = (M[j][k] - (divisor * M[i][k])).toPrecision(8);
            }
        }
        console.log("ETAPA " + i);
        console.table(data);
    }
    x = new Array(A.length);
    for(i = 0; i < x.length; i++){
        x[i] = 0;
    }
    for(i = M.length - 1; i >= 0; i--){
        sum = 0;
        for(j = i + 1; j < M[i].length; j++){
            sum = sum + (M[i][j - 1] * x[j - 1]);
        }
        x[i] = new Array(((M[i][M.length] - sum) / (M[i][i])).toPrecision(6));
    }
    console.log("x: ");
    console.log(x);
}