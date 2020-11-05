const { Expression } = require('algebra.js');
const { table } = require('console');
const { max } = require('mathjs');

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
    const table = require('table').table;
    let data = [];
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A[i].length; j++){
            A[i][j] = A[i][j].toPrecision(6);
        }
    }
    for(let i = 0; i < A.length; i++){
        data.push(A[i]);
    }
    let output = table(data);
    return output;
}

function gaussSeidel(){
    //una wea
    const table = require('table').table;
    var algebra = require('algebra.js');
    var matrix = require('mathjs');
    var mama = require('ml-matrix');
    let data = [];
    let A = [[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]];
    let b = [[1], [1], [1], [1]];
    let x0 = [0, 0, 0, 0];
    let x1 = new Array(x0.length);
    let tol = 0.0000001;
    let Nmax = 100;
    let D = formarMatrizD(A);
    let L = formarMatrizL(A);
    let U = formarMatrizU(A);
    let DL = restarMatrices(D, L);
    let DLI = hallarInversa(DL);
    let T = multiplicarMatrices(DLI, U);
    let C = multiplicarMatrices(DLI, b);
    let error = 1;
    let cont = 0;
    for(let i = 0; i< x0.length; i++){
        x0[i] = x0[i].toPrecision(8);
    }
    data = [
        ['Iter', 'E', 'x']
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
    let output = table(data);
    console.log(output);
    let matrizT = imprimirMatriz(T);
    console.log("T: ");
    console.log(matrizT);
    let matrizC = imprimirMatriz(C);
    console.log("C: ");
    console.log(matrizC);
    console.log("Radio espectral: ");
    var e = new mama.EigenvalueDecomposition(T);
    var aba = e.realEigenvalues;
    for(let i = 0; i < aba.length; i++){
        aba[i] = Math.abs(aba[i]).toPrecision(8);
    }
    console.log(max(aba));
}

gaussSeidel()