function gaussTotal(A, b){
    let M = [];
    M = A;
    for(let h = 0; h < A.length; h++) {
        M[h].push(b[h]);
    }
    for(let i = 0; i < M.length; i++){
        M = cambiarFilas(M, i);
        for(let j = i + 1; j < M.length; j++){
            let divisor = M[j][i] / M[i][i];
            for(let k = i; k < M.length + 1; k++){
                M[j][k] = (M[j][k] - (divisor * M[i][k]));
            }
        }
    }
    let x = sustRegr(M);
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

function cambiarFilas(M, i){
    let aux = i;
    let aux2 = i;
    for(let f = i; f < M.length; f++){
        for(let h = i; h < M.length; h++){
            if (Math.abs(M[aux][aux2]) < Math.abs(M[f][h])){
                aux = f;
                aux2 = h;
            }
        }
    }
    let filaAux = M[i];
    M[i] = M[aux];
    M[aux] = filaAux;
    for(let b = 0; b < M.length; b++){
        let colAux = M[b][i];
        M[b][i] = M[b][aux2];
        M[b][aux2] = colAux;
    }
    return M;
}

function vandermonde(){
    console.log("Vandermonde");
    console.log("Resultados: ");
    let X = [-1, 0, 3, 4];//entrada
    let Y = [15.5, 3, 8, 1];//entrada
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
    let V = [];
    let data = [];
    for(let i = 0; i < X.length; i++){
        V.push(new Array(X.length));
        data.push(V[i]);
    }
    for(let i = 0; i < V.length; i++){
        for(let j = 0; j < V[i].length; j++){
            V[i][j] = Math.pow(X[i], (V.length - 1) - j).toPrecision(8);
        }
    }
    console.log("Matriz de Vandermonde: ");
    console.table(data);
    let x = gaussTotal(V, Y);
    let str = "";
    console.log("Coeficientes del polinomio: ");
    for(let i = 0; i < x.length; i++){
        str = str + " " + x[i];
    }
    console.log(str);
    console.log("Polinomio: ");
    str = "";
    for(let i = 0; i < x.length; i++){
        if(x[i] >= 0){
            if((x.length - 1 - i) == 1){
                str = str + " + " + x[i] + "x";
            } else if((x.length - 1 - i) == 0){
                str = str + " + " + x[i];
            } else {
                str = str + " + " + x[i] + "x^" + (x.length - 1 - i);
            }
        } else {
            if((x.length - 1 - i) == 1){
                str = str + " " + x[i] + "x";
            } else if((x.length - 1 - i) == 0){
                str = str + " " + x[i];
            } else {
                str = str + " " + x[i] + "x^" + (x.length - 1 - i);
            }
        }
    }
    console.log(str);
    
}

vandermonde()