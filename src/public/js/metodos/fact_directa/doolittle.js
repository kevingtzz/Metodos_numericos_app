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

function doolittle(){
    console.log("Doolittle");
    console.log("Resultados: ");
    console.log("Etapa 0");
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
    let L = [];
    let U = [];
    let data = [];
    let dataU = [];
    let dataL = [];
    for(let i = 0; i < A.length; i++){
        L.push(new Array(A.length));
        U.push(new Array(A.length));
        data.push(A[i]);
    }
    
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A[i].length; j++){
            A[i][j] = A[i][j].toPrecision(8);
        }
    }
    console.table(data);
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length; j++){
            if(i == j){
                L[i][j] = 1;
                U[i][j] = 1;
            } else {
                L[i][j] = 0;
                U[i][j] = 0;
            }
        }
    }
    for(let i = 0; i < A.length; i++){
        dataL.push(L[i]);
        dataU.push(U[i]);
    }
    for(let i = 0; i < L.length; i++){
        for(let j = 0; j < L[i].length; j++){
            L[i][j] = L[i][j].toPrecision(8);
            U[i][j] = U[i][j].toPrecision(8);
        }
    }
    for(let i = 1; i < A.length + 1; i++){
        let sum = 0;
        for(let j = 0; j < i - 1; j++){
            sum = sum + (L[i - 1][j] * U[j][i - 1]);
        }
        U[i - 1][i - 1] = ((A[i - 1][i - 1] - sum)/(L[i - 1][i - 1])).toPrecision(8);
        for(let j = i + 1; j < A.length + 1; j++){
            sum = 0;
            for(let k = 0; k < i - 1; k++){
                sum = sum + (L[i - 1][k] * U[k][j - 1]);
            }
            U[i - 1][j - 1] = ((A[i - 1][j - 1] - sum)/(L[i - 1][i - 1])).toPrecision(8);
        }
        for(let j = i + 1; j < A.length + 1; j++){
            sum = 0;
            for(let k = 0; k < i - 1; k++){
                sum = sum + (L[j - 1][k] * U[k][i - 1]);
            }
            L[j - 1][i - 1] = ((A[j - 1][i - 1] - sum)/(U[i - 1][i - 1])).toPrecision(8);
        }
        console.log("Etapa " + i);
        console.log("");
        console.log("L: ");
        console.table(dataL);
        console.log("U: ");
        console.table(dataU);
    }
    let Lb = [];
    Lb = L;
    for(let i = 0; i < Lb.length; i++){
        Lb[i].push(b[i]);
    }
    let z = sustProgr(Lb);
    let Uz = [];
    Uz = U;
    for(let i = 0; i < Uz.length; i++){
        Uz[i].push(z[i]);
    }
    let x = sustRegr(Uz);
    console.log("Despues de aplicar sustitucion progresiva y regresiva");
    console.log("x: ");
    for(let i = 0; i < x.length; i++){
        console.log(x[i]);
    }
}

doolittle()