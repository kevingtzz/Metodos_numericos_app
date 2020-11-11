function sustProgr(M){
    let x = new Array(M.length);
    for(let i = 0; i < x.length; i++){
        x[i] = 0;
    }
    x[0] = M[0][M.length] / M[1][1];
    x[0] = x[0].toPrecision(8);
    for(let i = 1; i < M.length; i++){
        let sum = 0;
        for(let j = 0; j < i; j++){
            sum = sum + (M[i][j] * x[j]);
        }
        x[i] = ((M[i][M.length] - sum)/(M[i][i])).toPrecision(8);
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
        x[i] = new Array(((M[i][M.length] - sum) / (M[i][i])).toPrecision(6));
    }
    return x;
}

function cambiarFilas(M, i, P){
    let aux = i;
    for(let f = i + 1; f < M.length; f++){
        if (Math.abs(M[aux][i]) < Math.abs(M[f][i])){
            aux = f;
        }
    }
    let filaAux = M[i];
    M[i] = M[aux];
    M[aux] = filaAux;
    let filaDobleAux = P[i];
    P[i] = P[aux];
    P[aux] = filaDobleAux;
}

function factorizacionLUsimpl(){
    console.log("LU con pivoteo parcial: ");
    console.log("Resultados: ");
    const table = require('table').table;
    let A = [[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]];
    let b = [1, 1, 1, 1];
    let U = [];
    let L = [];
    let P = [];
    let dataM = [];
    let dataL = [];
    let dataU = [];
    let dataP = [];
    var M = [];
    M = A;
    for(let i = 0; i < M.length; i++){
        for(let j = 0; j < M[i].length; j++){
            M[i][j] = M[i][j].toPrecision(8);
        }
    }
    for(let i = 0; i < A.length; i++){
        L.push(new Array(A.length));
        U.push(new Array(A.length));
        P.push(new Array(A.length));
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i == j){
                L[i][j] = 1;
                U[i][j] = 0;
                P[i][j] = 1;
            } else {
                L[i][j] = 0;
                U[i][j] = 0;
                P[i][j] = 0;
            }
        }
    }
    for(let i = 0; i < L.length; i++){
        for(let j = 0; j < L[i].length; j++){
            L[i][j] = L[i][j].toPrecision(8);
        }
    }
    for(let i = 0; i < U.length; i++){
        for(let j = 0; j < U[i].length; j++){
            U[i][j] = U[i][j].toPrecision(8);
        }
    }
    for(let i = 0; i < P.length; i++){
        for(let j = 0; j < P[i].length; j++){
            P[i][j] = P[i][j].toPrecision(8);
        }
    }
    for(let j = 0; j < M.length; j++){
        dataL.push(L[j]);
        dataU.push(U[j]);
    }
    for(let i = 0; i < M.length; i++){
        console.log("Etapa " + i);
        dataM = [];
        dataP = [];
        for(let j = 0; j < M.length; j++){
            dataM.push(M[j]);
            dataP.push(P[j]);
        }
        let output = table(dataM);
        console.log(output);
        output = table(dataL);
        console.log("L: ");
        console.log(output);
        if(i + 1 != M.length){
            output = table(dataU);
            console.log("U: ");
            console.log(output);
        }
        cambiarFilas(M, i, P);
        for(let j = i + 1; j < M.length; j++){
            let divisor = M[j][i] / M[i][i];
            L[j][i] = divisor.toPrecision(8);
            for(let k = i; k < M.length; k++){
                M[j][k] = (M[j][k] - (divisor * M[i][k])).toPrecision(8);
            }
        }
        for(let j = 0; j < M[i].length; j++){
            U[i][j] = M[i][j];
        }
        if(i + 1 == M.length){
            output = table(dataU);
            console.log("U: ");
            console.log(output);
        }
        console.log("P: ");
        output = table(dataP);
        console.log(output);
    }
    let Lb = [];
    Lb = L;
    for(let i = 0; i < Lb.length; i++){
        Lb[i].push(b[i].toPrecision(8));
    }
    let z = sustProgr(Lb);
    let Uz = [];
    Uz = U;
    for(let i = 0; i < Uz.length; i++){
        Uz[i].push(z[i]);
    }
    let x = sustRegr(Uz);
    console.log("Despues de aplicar sustitucion progresiva y regresiva: ");
    console.log("x: ")
    console.log(x);
}

factorizacionLUsimpl()