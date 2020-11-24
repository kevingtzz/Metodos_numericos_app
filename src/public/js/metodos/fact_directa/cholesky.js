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
    let A = [[20, -1, 3, 4], [6, 23, 4, 3], [7, 21, 46, 9], [-3, -9, 12, 38]];//entrada
    let b = [30, -10, 20, -14];//entrada
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
    var mathjs = require('mathjs');//usa mathjs
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
            console.warn("Error. En el proceso aparecen numeros complejos que el lenguaje no soporta");
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
        }
        console.log("Etapa " + (i + 1));
        console.log("L: ");
        console.table(dataL);
        console.log("U: ");
        console.table(dataU);
    }
    let Lb = [];
    Lb = L;
    let z = mathjs.lusolve(L,b);
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
}

cholesky()