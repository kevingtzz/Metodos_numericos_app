function trazLin(){
    var mathjs = require('mathjs');//usa libreria
    let X = [-1, 0, 3, 4];//entrada
    let Y = [15.5, 3, 8, 1];//entrada
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
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
    let x = mathjs.lusolve(A, b);
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
    }
    console.log("");
    console.log("Trazadores: ");
    for(let i = 0; i < X.length - 1; i++){
        if(bes[i] >= 0){
            console.log(as[i] + "x + " + bes[i]);
        } else {
            console.log(as[i] + "x " + bes[i]);
        }
        
    }
}

trazLin()