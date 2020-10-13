function formarMatrizA(aso){
    var A = [];
    filaN = new Array();
    i = 0;
    while(!aso[i].includes(']]')){
        j = i;
        while(!aso[j].includes(']')){
            if(aso[j].includes('[')){
                aso[j] = aso[j].replace('[','');
                if(aso[j].includes('[')){
                    aso[j] = aso[j].replace('[','');
                }
            }
            filaN.push(parseFloat(aso[j]));
            j = j + 1;
        }
        filaN.push(parseFloat(aso[j]));
        if(filaN.length == Math.sqrt(aso.length)){
            A.push(filaN);
        }
        filaN = [];
        i = i + 1;
    }
    return A;
}

function formarMatrizb(blaso){
    var b = [];
    filaN = new Array();
    j = 0;
    while(!blaso[j].includes(']')){
        if(blaso[j].includes('[')){
            blaso[j] = blaso[j].replace('[','');
            if(blaso[j].includes('[')){
                blaso[j] = blaso[j].replace('[','');
            }
        }
        filaN.push(parseFloat(blaso[j]));
        j = j + 1;
    }
    filaN.push(parseFloat(blaso[j]));
    b.push(filaN);
    return b;
}

function cambiarFilas(M, i){
    aux = i;
    for(f = i + 1; f < M.length; f++){
        if (Math.abs(M[aux][i]) < Math.abs(M[f][i])){
            aux = f;
        }
    }
    filaAux = M[i];
    M[i] = M[aux];
    M[aux] = filaAux;
    return M;
}

function gaussianaPivotParcial(){
    var aso = [];
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
      
    rl.question('Ingrese la matriz A de la forma [[a, b, c], [d, e, f]] y luego de un : la matriz B de la forma [g, h, i] -> \n', (answer) => {
        var A = [];
        var b = [];
        answerO = (answer).split(':');
        aso = (answerO[0]).split(',');
        blaso = (answerO[1]).split(',');
        if(Number.isNaN(Math.sqrt(aso.length))){
            console.log("La matriz A no es cuadrada");
        } else if (Math.sqrt(aso.length) != blaso.length){
            console.log("La matriz A no es compatible con la matriz b");
        } else {
            A = formarMatrizA(aso);
            b = formarMatrizb(blaso);
            const table = require('table').table;
            let data = [];
            var M = [];
            M = A;
            for(i = 0; i < M.length; i++){
                for(j = 0; j < M[i].length; j++){
                    M[i][j] = M[i][j].toPrecision(8);
                }
            }
            for(h = 0; h < A.length; h++) {
                data.push(M[h]);
                M[h].push(b[0][h].toPrecision(8));
            }
            for(i = 0; i < M.length; i++){
                /*console.log("ETAPA " + i);
                let output = table(data);
                console.log(output);*/
                M = cambiarFilas(M, i);
                for(j = 0; j < M[i].length - 1; j++){
                    if((i > j) && (M[i][j] != 0)){
                        divisor = M[i][j] / M[j][j];
                        for(k = 0; k < M[i].length; k++){
                            M[i][k] = (M[i][k] - (divisor * M[j][k])).toPrecision(8);
                        }
                    }
                }
                console.log("ETAPA " + i);
                let output = table(data);
                console.log(output);
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
        rl.close();
    });
}

gaussianaPivotParcial()