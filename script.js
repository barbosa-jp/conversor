//Mudar de conversao
function mudarOpcao(opcao) {
    const opcaoAnterior = document.querySelector("#opcao-ativada")
    opcaoAnterior.setAttribute("id", " ")
    opcao.setAttribute("id", "opcao-ativada")
    const textareaConversao = document.querySelector("#textarea-conversao")
    const textareaDecimal = document.querySelector("#textarea-decimal")
    if (opcao.textContent == "BIN"){
        textareaConversao.setAttribute("placeholder", "Digite o Binário Aqui!")
        textareaConversao.setAttribute("onkeyup", "binarioParaDecimal()")
        textareaDecimal.setAttribute("onkeyup", "decimalParaBinario()")
    } else if (opcao.textContent == "OCT"){
        textareaConversao.setAttribute("placeholder", "Digite o Octal Aqui!")
        textareaConversao.setAttribute("onkeyup", "octalParaDecimal()")
        textareaDecimal.setAttribute("onkeyup", "decimalParaOctal()")
    } else {
        textareaConversao.setAttribute("placeholder", "Digite o Hexadecimal Aqui!")
        textareaConversao.setAttribute("onkeyup", "hexParaDecimal()")
        textareaDecimal.setAttribute("onkeyup", "decimalParaHex()")
    }
}  
//Decimal para binário
function decimalParaBinario() {
    //Ler valor
    let valor = document.querySelector("#textarea-decimal").value
    if (valor != ""){
        //Separar parte inteira
        let aux = parseInt(valor)
        //Transfomar parte inteira para binário
        let vetorInteiro = []
        let resultado = ""
        if (aux != 0){
            for(var i = 0; aux != 0; i++){
                vetorInteiro[i] = (aux%2).toString()
                aux /= 2
                if(aux%2 != 0){
                    aux = parseInt(aux)
                }
            }    
            for(var i = 1; i <= vetorInteiro.length; i++){
                resultado += vetorInteiro[vetorInteiro.length - i]
            }
        } else {
            resultado += "0"
        }
        //Separar parte decimal
        let vetorDecimal = []
        aux = parseFloat(valor)%1
        vetorDecimal = valor.split("")
        if (aux != 0){
            let valorPosicao = ""
            resultado += "."
            do{
                valorPosicao = vetorDecimal.splice(0, 1)
            } while(valorPosicao != ".")
            let parteDecimal = "0."
            for(var i = 0; i < vetorDecimal.length; i++){
                parteDecimal += vetorDecimal[i]
            }
            //Transformar parte fracionada para binário
            aux = parseFloat(parteDecimal)
            for(var i = 0; aux != 1; i++){
                aux *= 2
                if (aux >= 1){
                    resultado += "1"
                    if (aux != 1){
                        let vetorAux = []
                        vetorAux = aux.toString().split("")
                        do{
                            valorPosicao = vetorAux.splice(0, 1)
                        } while(valorPosicao != ".")
                        aux = "0."
                        for(var i = 0; i < vetorAux.length; i++){
                            aux += vetorAux[i]
                        }
                        aux = parseFloat(aux)
                    }
                } else {
                    resultado += "0"
                }
                if (resultado.length == 30){
                    aux = 1
                }
            }
        }
        //Mostrar resultado
        const output = document.querySelector("#textarea-conversao")
        output.value = ""
        for(var i = 0; i < resultado.length; i++){
            output.value += resultado[i]
        }
    }else {
        //Mostrar resultado
        const output = document.querySelector("#textarea-conversao")
        output.value = ""
    } 
}
//Binario para Decimal
function binarioParaDecimal() {
    //Ler valor
    let valor = document.querySelector("#textarea-conversao").value
    if(valor != ""){
        //Separar parte inteira
        let vetorInteiro = []
        let aux = parseInt(valor)
        vetorInteiro = aux.toString().split("")
        let parteInteira = 0
        for (var i = 0; i < vetorInteiro.length; i++){
            if (vetorInteiro[vetorInteiro.length - (i + 1)] == "1"){
                parteInteira  += (parseInt(vetorInteiro[vetorInteiro.length - (i+1)]) * 2**i)
            }
        }
        let resultado = ""
        resultado += parteInteira.toString() 
        //Separar parte decimal
        let vetorDecimal = []
        aux = parseFloat(valor)%1
        if (aux != 0){
            aux = aux.toString()
            vetorDecimal = valor.split("")
            let valorPosicao = ""
            do{
                valorPosicao = vetorDecimal.splice(0, 1)
            } while(valorPosicao != ".")
            //Transformar parte fracionada para decimal
            let vetorAux1 = []
            let vetorAux2 = []
            let aux2 = 0
            for(var i = 0; i < vetorDecimal.length; i++){
                if(i==0){
                    aux = parseInt(vetorDecimal[i]) * 0.5
                    aux = aux.toString()
                    vetorAux1 = aux.split("")
                    valorPosicao = ""
                    if (aux != "0"){
                        do{
                            valorPosicao = vetorAux1.splice(0, 1)
                        } while(valorPosicao != ".")
                    }
                } else {   
                    aux = parseInt(vetorDecimal[i]) * 0.5**(i+1)
                    aux= aux.toString()
                    vetorAux2 = aux.split("")
                    valorPosicao = ""
                    if (aux != 0){
                        do{
                            valorPosicao = vetorAux2.splice(0, 1)
                        } while(valorPosicao != ".")
                    }
                    if (vetorAux1.length > vetorAux2.length ){
                        for(var j = (vetorAux1.length - vetorAux2.length); j > 0; j--){
                            vetorAux2[vetorAux1.length - j] = "0"
                        }
                    } else if (vetorAux1.length < vetorAux2.length){
                        for(var j = (vetorAux2.length - vetorAux1.length); j > 0; j--){
                            vetorAux1[vetorAux2.length - j] = "0"
                        }
                    } 
                    for (var j = vetorAux1.length - 1; j >= 0; j--){
                        aux = parseInt(vetorAux1[j]) + parseInt(vetorAux2[j]) + aux2
                        if (aux > 9){
                            aux -= 10
                            aux2 = 1
                        } else {
                            aux2 = 0
                        }
                        vetorAux1[j] = aux
                    }
                }
            }
            if (aux2 == 1){
                resultado +=".1"
            } else {
                resultado += "."
            }
            for(var i = 0; i < vetorAux1.length; i++){
                resultado += vetorAux1[i]
            }
        }
        //Mostrar resultado
        const output = document.querySelector("#textarea-decimal")
        output.value = ""
        for(var i = 0; i < resultado.length; i++){
            output.value += resultado[i]
        }
    } else {
        //Mostrar resultado
        const output = document.querySelector("#textarea-decimal")
        output.value = ""
    }
}
//Decimal para Octal
function decimalParaOctal() {
    //Ler valor
    let valor = document.querySelector("#textarea-decimal").value
    if (valor != ""){
        //Separar parte inteira
        let aux = parseInt(valor)
        //Transfomar parte inteira para binário
        let resultado = ""
        if (aux != 0){
            let vetorInteiro = []
            for (var i = 0; aux != 0; i++){
                vetorInteiro[i] = (aux%8).toString()
                aux /= 8
                if (aux%8 != 0){
                    aux = parseInt(aux) 
                }
            }
            for(var i = 1; i <= vetorInteiro.length; i++){
                resultado += vetorInteiro[vetorInteiro.length - i]
            }
        } else {
            resultado = "0"
        }
        //Mostrar resultado
        const output = document.querySelector("#textarea-conversao")
        output.value = ""
        output.value += resultado
    } else {
        const output = document.querySelector("#textarea-conversao")
        output.value = ""
    }
}
//Decimal para Hex
function decimalParaHex() {
    //Variáveis 
    let resultado = "" 
    let parteInteira = 0
    let parteFracionada = 0
    let posicao = 0
    let vetorInteiro = []
    //Ler valor
    let valor = document.querySelector("#textarea-decimal").value
    //Separar parte inteira
    parteInteira = parseInt(valor)
    //Separar parte fracionada
    let aux = parteInteira
    for (var i = 1; valor > aux; i++){
        for (var j = 0; j <= 9; j++){
            if ((aux + 0.1**i * j <= valor)){
                parteFracionada += 0.1**i * (j - 1)
                aux += 0.1**i * (j - 1)
                j = 10
            }
        }
        posicao++
    }
    //Transfomar parte inteira para binário
    aux = parteInteira
    posicao = 0
    while (aux != 0 && valor != ""){
        vetorInteiro[posicao] = aux%16
        switch (vetorInteiro[posicao]) {
            case 10:
                vetorInteiro[posicao] = "A"
                break
            case 11:
                vetorInteiro[posicao] = "B"
                break
            case 12:
                vetorInteiro[posicao] = "C"
                break
            case 13:
                vetorInteiro[posicao] = "D"
                break
            case 14:
                vetorInteiro[posicao] = "E"
                break
            case 15:
                vetorInteiro[posicao] = "F"
                break
            default:
                vetorInteiro[posicao] = vetorInteiro[posicao].toString()
                break
        }
        if (aux%16 != 0){
            aux = parseInt(aux/16) 
        } else { 
            aux = aux/16
        }
        posicao++
    }   
    for(var i = 0; i < vetorInteiro.length; i++){
        resultado += vetorInteiro[vetorInteiro.length - (i+1)]
    }
    //Transformar parte fracionada para binário
    aux = parteFracionada
    for(var i = 0; aux != 0; i++){
        aux *= 8
        if (aux >= 7){
            resultado += 0.1**(i+1)
            aux -= 7
        }
    }
    //Mostrar resultado
    const output = document.querySelector("#textarea-conversao")
    output.value = resultado
}
//Octal para Decimal
function octalParaDecimal() {
    //Variáveis 
    let parteInteira = 0
    let posicao = 0
    let vetorInteiro = []
    let vetorFracionado = []
    let resultado = 0
    //Ler valor
    let valor = document.querySelector("#textarea-conversao").value
    //Separar parte inteira
    parteInteira = parseInt(valor)
    //Separar parte fracionada em array
    let aux = parteInteira
    for (var i = 1; valor > aux; i++){
        for (var j = 0; j < 8; j++){
            if (!(aux + 0.1**j > valor)){
                vetorFracionado[posicao] = j
                aux += 0.1**i * j
            }
        }
        posicao++
    }
    //Separar parte inteira em array
    aux = parteInteira.toString()
    for(var i = 0; i < aux.length; i++){
        vetorInteiro[i] = aux.charAt(i)
    }
    //Transformar parte inteira em decimal
    for(var i = 1; i <= vetorInteiro.length; i++){
        for(var j = 0; j < 8; j++){
            if (vetorInteiro[vetorInteiro.length - i] == j){
                resultado += (8**(i-1)) * j
            }
        }
    }
    //Transformar parte fracionada em decimal
    for(var i = 0; i < vetorFracionado.length; i++){
        if (vetorFracionado[i] == "1"){
            resultado += 0.125**(i+1)
        }
    }
    //Mostrar resultado
    const output = document.querySelector("#textarea-decimal")
    output.value = resultado
}
//Hex para Decimal
function hexParaDecimal() {
    //Variáveis 
    let parteInteira = 0
    let posicao = 0
    let vetorInteiro = []
    let vetorFracionado = []
    let resultado = 0
    //Ler valor
    let valor = document.querySelector("#textarea-conversao").value
    //Separar parte inteira
    parteInteira = valor.toUpperCase()
    vetorInteiro = parteInteira.split("")

    for(var i = 0; i < vetorInteiro.length; i++){
        switch(vetorInteiro[vetorInteiro.length - (1+i)]){
            case "A":
                resultado += (16**i) * 10
                window.alert(resultado)
            break
            case "B":
                resultado += (16**i) * 11
            break
            case "C":
                resultado += (16**i) * 12
            break
            case "D":
                resultado += (16**i) * 13
            break
            case "E":
                resultado += (16**i) * 14
            break
            case "F":
                resultado += (16**i) * 15
            break
            default:
                resultado += (16**i) * (parseInt(vetorInteiro[vetorInteiro.length - (1+i)]))
            break
        }
    }
    

    //Mostrar resultado
    const output = document.querySelector("#textarea-decimal")
    output.value = resultado
}
