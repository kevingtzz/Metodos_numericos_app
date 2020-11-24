
function newtonInterpolacion(){
    console.log("Newton");
    console.log("Resultados: ");
    let X = [-1, 0, 3, 4];//entrada
    let Y = [15.5, 3, 8, 1];//entrada
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
    let b = [];
    let D = [];
    let data = [];
    for(let i = 0; i < X.length; i++){
        D.push(new Array(X.length));
    }
    for(let i = 0; i < X.length; i++){
        data.push(D[i]);
    }
    for(let i = 0; i < D.length; i++){
        for(let j = 0; j < D[i].length; j++){
            D[i][j] = 0;
            D[i][j] = D[i][j].toPrecision(8);
        }
    }
    for(let i = 0; i < X.length; i++){
        D[i][0] = Y[i].toPrecision(8);
    }
    for(let i = 0; i < X.length; i++){
        for(let j = 1; j < i + 1; j++){
            D[i][j] = ((D[i][j - 1] - D[i - 1][j - 1])/(X[i] - X[i - j])).toPrecision(8);
        }
    }
    for(let i = 0; i < D.length; i++){
        for(let j = 0; j < D[i].length; j++){
            if(i == j){
                b.push(D[i][j]);
            }
        }
    }
    let bla = "";
    let str = D[0][0] + " ";
    for(let i = 1; i < X.length; i++){
        if(X[i - 1] >= 0){
            bla = bla + "(x" + " - "+ (X[i - 1]) +")";
            str = str + (D[i][i] > 0 ? " + " : " ") + (D[i][i] + " * " + bla);
        } else {
            bla = bla + "(x" + " + "+ (-X[i - 1]) +")";
            str = str + (D[i][i] > 0 ? " + " : " ") + (D[i][i] + " * " + bla);
        }
        
    }
    console.log("Tabla de diferencias divididas: ");
    console.table(data);
    console.log("Coeficientes del polinomio de Newton: ");
    console.log(b);
    console.log("Polinomio de Newton: ");
    console.log(str);

}

newtonInterpolacion()