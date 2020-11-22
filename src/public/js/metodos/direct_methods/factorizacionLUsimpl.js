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

function factorizacionLUsimpl(){
    console.log("LU con Gaussiana Simple: ");
    console.log("Resultados: ");
    let A = [[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]];//entrada
    let b = [1, 1, 1, 1];//entrada
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
    let U = [];
    let L = [];
    let dataM = [];
    let dataL = [];
    let dataU = [];
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
    }
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i == j){
                L[i][j] = 1;
                U[i][j] = 0;
            } else {
                L[i][j] = 0;
                U[i][j] = 0;
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
    for(let i = 0; i < M.length; i++){
        dataM.push(M[i]);
        dataL.push(L[i]);
        dataU.push(U[i]);
    }
    for(let i = 0; i < M.length; i++){
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
        console.log("Etapa " + i);
        console.table(dataM);
        console.log("L: ");
        console.table(dataL);
        console.log("U: ");
        console.table(dataU);
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