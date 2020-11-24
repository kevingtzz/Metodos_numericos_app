function lagrange(){
    console.log("Lagrange");
    console.log("Resultados: \n");
    console.log("Polinomios interpolantes de Lagrange: ");
    let X =[-1, 0, 3, 4];//entrada
    let Y = [15.5, 3, 8, 1];//entrada
    if(X.length != Y.length){
        alert("X y Y deben tener el mismo tamaño");
        return("Error");
    }
    let pol = "";
    let valordeabajo = 1;
    for(let i = 0; i < X.length; i++){
        let str = "";
        for(let j = 0; j < X.length; j++){
            if(i != j){
                valordeabajo = valordeabajo * (X[i] - X[j]);
                if(X[j] >= 0){
                    str = str + ("(x - " + X[j] + ")");
                } else {
                    str = str + ("(x + " + (-X[j]) + ")");
                }
                
            }
        }
        str = str + (" / (" + valordeabajo + ")");
        valordeabajo = 1;
        console.log("L" + i + ":" + str);
        pol = pol + ((Y[i] > 0 && i != 0) ? " + " : " ") + "(" + Y[i] + " * " + "L" + i + ")";
    }
    console.log("");
    console.log("Polinomio: ");
    console.log(pol);

}

lagrange()