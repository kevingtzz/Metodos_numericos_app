function trazCub(){
    var mathjs = require('mathjs');//usa libreria
    let X = [-1, 0, 3, 4];//entrada
    let Y = [15.5, 3, 8, 1];//entrada
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
    let len = 4 * (X.length - 1);
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
    A[0][0] = Math.pow(X[0], 3);
    A[0][1] = Math.pow(X[0], 2);
    A[0][2] = X[0];
    A[0][3] = 1;
    b[0] = Y[0];
    let aux = 0;
    let auxilio = 0;
    for(let i = 1; i < X.length; i++){
        for(let j = 0; j < A[i].length; j++){
            if(((i * 4) - 4) == j){
                A[i][j] = Math.pow(X[i], 3);
            }
        }
        for(let j = 0; j < A[i].length; j++){
            if(((i * 4) - 3) == j){
                A[i][j] = Math.pow(X[i], 2);
            }
        }
        for(let j = 0; j < A[i].length; j++){
            if(((i * 4) - 2) == j){
                A[i][j] = X[i];
            }
        }
        for(let j = 0; j < A[i].length; j++){
            if(((i * 4) - 1) == j){
                A[i][j] = 1;
            }
        }
        b[i] = Y[i];
        auxilio = i;
    }
    aux = auxilio;
    for(let i = aux + 1; i < (len / 2); i++){
        for(let j = 0; j < len; j++){
            if(((4 * i) - (4 * (aux + 1))) == j){
                A[i][j] = Math.pow(X[i - aux],3);
            }
            if(((4 * i) - (4 * (aux + 1)) + 1) == j){
                A[i][j] = Math.pow(X[i - aux],2);
            }
            if(((4 * i) - (4 * (aux + 1)) + 2) == j){
                A[i][j] = X[i - aux];
            }
            if(((4 * i) - (4 * (aux + 1)) + 3) == j){
                A[i][j] = 1;
            }
            if(((4 * i) - (4 * (aux + 1)) + 4) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -Math.pow(X[i - aux],3);
                } else {
                    A[i][j] = Math.pow(X[i - aux],3);
                }    
            }
            if(((4 * i) - (4 * (aux + 1)) + 5) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -Math.pow(X[i - aux],2);
                } else {
                    A[i][j] = Math.pow(X[i - aux],2);
                }  
            }
            if(((4 * i) - (4 * (aux + 1)) + 6) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -X[i - aux];
                } else {
                    A[i][j] = X[i - aux];
                }  
            }
            if(((4 * i) - (4 * (aux + 1)) + 7) == j){
                A[i][j] = -1;
            }
        }
        auxilio = i;
    }
    aux = auxilio;
    for(let i = aux + 1; i < ((3 * X.length) - 4); i++){
        for(let j = 0; j < len; j++){
            if(((4 * i) - (4 * (aux + 1))) == j){
                A[i][j] = 3 * Math.pow(X[i - aux],2);
            }
            if(((4 * i) - (4 * (aux + 1)) + 1) == j){
                A[i][j] = 2 * X[i - aux];
            }
            if(((4 * i) - (4 * (aux + 1)) + 2) == j){
                A[i][j] = 1;
            }
            if(((4 * i) - (4 * (aux + 1)) + 4) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -3 * Math.pow(X[i - aux],2);
                } else {
                    A[i][j] = 3 * Math.pow(X[i - aux],2);
                }    
            }
            if(((4 * i) - (4 * (aux + 1)) + 5) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -2 * X[i - aux];
                } else {
                    A[i][j] = 2 * X[i - aux];
                }    
            }
            if(((4 * i) - (4 * (aux + 1)) + 6) == j){
                A[i][j] = -1;
            }
        }
        auxilio = i;
    }
    aux = auxilio;
    for(let i = aux + 1; i < len - 2; i++){
        for(let j = 0; j < len; j++){
            if(((4 * i) - (4 * (aux + 1))) == j){
                A[i][j] = 6 * X[i - aux];
            }
            if(((4 * i) - (4 * (aux + 1)) + 1) == j){
                A[i][j] = 2;
            }
            if(((4 * i) - (4 * (aux + 1)) + 4) == j){
                if(X[i - aux] != 0){
                    A[i][j] = -6 * X[i - aux];
                }
            }
            if(((4 * i) - (4 * (aux + 1)) + 5) == j){
                A[i][j] = -2;
            }
        }
        auxilio = i;
    }
    aux = auxilio;
    for(let i = aux + 1; i < len - 1; i++){
        A[i][0] = 6 * X[0];
        A[i][1] = 2;
        auxilio = i;
    }
    aux = auxilio;
    for(let i = aux + 1; i < len; i++){
        A[i][len - 4] = 6 * X[X.length - 1];
        A[i][len - 3] = 2;
    }
    let x = mathjs.lusolve(A, b);
    let as = [];
    let bes = [];
    let ces = [];
    let des = [];
    for(let i = 0; i < x.length; i++){
        if(i % 4 == 0){
            as.push(x[i][0].toPrecision(8));
        } else if(i % 4 == 1) {
            bes.push(x[i][0].toPrecision(8));
        } else if(i % 4 == 2){
            ces.push(x[i][0].toPrecision(8));
        } else {
            des.push(x[i][0].toPrecision(8));
        }
    }
    console.log("Trazadores cubicos: ");
    console.log("");
    console.log("Resultados: ");
    console.log("");
    console.log("Coeficientes de los trazadores: ");
    for(let i = 0; i < X.length - 1; i++){
        console.log(as[i] + " " + bes[i] + " " + ces[i] + " " + des[i]);
    }
    console.log("");
    console.log("Trazadores: ");
    for(let i = 0; i < X.length - 1; i++){
        if(bes[i] >= 0){
            if(ces[i] >= 0){
                if(des[i] >= 0){
                    console.log(as[i] + "x^3 + " + bes[i] + "x^2 + " + ces[i] + "x + " + des[i]);
                } else {
                    console.log(as[i] + "x^3 + " + bes[i] + "x^2 + " + ces[i] + "x " + des[i]);
                }
            } else {
                if(des[i] >= 0){
                    console.log(as[i] + "x^3 + " + bes[i] + "x^2 " + ces[i] + "x + " + des[i]);
                } else {
                    console.log(as[i] + "x^3 + " + bes[i] + "x^2 " + ces[i] + "x " + des[i]);
                }
            }
        } else {
            if(ces[i] >= 0){
                if(des[i] >= 0){
                    console.log(as[i] + "x^3 " + bes[i] + "x^2 + " + ces[i] + "x + " + des[i]);
                } else {
                    console.log(as[i] + "x^3 " + bes[i] + "x^2 + " + ces[i] + "x " + des[i]);
                }
            } else {
                if(des[i] >= 0){
                    console.log(as[i] + "x^3 " + bes[i] + "x^2 " + ces[i] + "x + " + des[i]);
                } else {
                    console.log(as[i] + "x^3 " + bes[i] + "x^2 " + ces[i] + "x " + des[i]);
                }
            }
        }
    }
}

trazCub()