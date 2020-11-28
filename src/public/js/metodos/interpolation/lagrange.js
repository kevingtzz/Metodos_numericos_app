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
    lagrange();
});

 function lagrange(){
    console.log("Lagrange");
    console.log("Resultados: \n");
    console.log("Polinomios interpolantes de Lagrange: ");

    let X = XY[0];
    let Y = XY[1];
    for(let i = 0; i < X.length; i++){
        for(let j = i + 1; j < X.length; j++){
            if(X[i] == X[j]){
                alert("There cannot be equal values in X vector");
                return("Error");
            }
        }
    }
    let pol = "";
    let valordeabajo = 1;
    for(let i = 0; i < X.length; i++){
        let str = "";
        for(let j = 0; j < X.length; j++){
            if(i != j){
                valordeabajo = valordeabajo * (X[i] - X[j]);
                if(X[j] >= 0){
                    str = str + ("(x - " + X[j] + ")");
                } else {
                    str = str + ("(x + " + (-X[j]) + ")");
                }
                
            }
        }
        str = str + (" / (" + valordeabajo + ")");
        valordeabajo = 1;
        console.log("L" + i + ":" + str);
        
        let title = "L" + i + ":" + str;
        let container = document.getElementById('results');
        let title_pol = document.createElement('h4');
        let tilte_pol_txt = document.createTextNode(title);
        title_pol.appendChild(tilte_pol_txt);
        container.appendChild(title_pol);

        pol = pol + ((Y[i] > 0 && i != 0) ? " + " : " ") + "(" + Y[i] + " * " + "L" + i + ")";
    }
    console.log("");
    console.log("Polinomio: ");
    console.log(pol);
    let container = document.getElementById('poli');
    let title_pol = document.createElement('h4');
    let tilte_pol_txt = document.createTextNode(pol);
    title_pol.appendChild(tilte_pol_txt);
    container.appendChild(title_pol);
}