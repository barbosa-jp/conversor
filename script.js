function mudarOpcao(opcao) {
    const opcaoAnterior = document.querySelector("#opcao-ativada")
    opcaoAnterior.setAttribute("id", " ")
    opcao.setAttribute("id", "opcao-ativada")
    const textareaConversao = document.querySelector("#textarea-conversao")
    const textareaDecimal = document.querySelector("#textarea-decimal")
    if (opcao.textContent == "BIN"){
        textareaConversao.setAttribute("placeholder", "Digite o Binario Aqui!")
        textareaConversao.setAttribute("onkeyup", "binaroParaDecimal()")
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
    //Variáveis 
    let resultado = 0 
    let parteInteira = 0
    let parteFracionada = 0
    let posicao = 0
    let vetorInteiro = []
    //Ler valor
    let valor = document.querySelector("#textarea-decimal").value
    //Separar parte inteira
    parteInteira = parseInt(valor)
    //Transfomar parte inteira para binário
    let aux = parteInteira
    while(aux != 0 && valor != ""){
        vetorInteiro[posicao] = aux%2
        if(aux%2 != 0){
            aux = aux/2
            aux = parseInt(aux)
        } else { 
            aux = aux/2
        }
        posicao++
    }   
    for(var i = 0; i < vetorInteiro.length; i++){
        resultado += vetorInteiro[i] * 10**i
    }
    //Separar parte fracionada
    aux = parteInteira
    for (var i = 1; valor > aux; i++){
        for (var j = 0; j <= 9; j++){
            if (aux + 0.1**i * j <= valor){
                parteFracionada += 0.1**i * j
                aux += 0.1**i * j
                j = 10
            }
        }
        posicao++
    }
    //Transformar parte fracionada para binário
    aux = parteFracionada
    for(var i = 0; aux != 0; i++){
        aux *= 2
        if (aux >= 1){
            resultado += 0.1**(i+1)
            aux -= 1
        }
    }
    //Mostrar resultado
    const output = document.querySelector("#textarea-conversao")
    output.value = resultado
}
//Decimal para Octal
function decimalParaOctal() {
    //Variáveis 
    let resultado = 0 
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
        vetorInteiro[posicao] = aux%8
        if (aux%8 != 0){
            aux = parseInt(aux/8) 
        } else { 
            aux = aux/8
        }
        posicao++
    }   
    for(var i = 0; i < vetorInteiro.length; i++){
        resultado += vetorInteiro[i] * 10**i
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
//Decimal para hex
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
//Binario para decimal
function binarioParaDecimal() {
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
        if (!(aux + 0.1**i > valor)){
            vetorFracionado[posicao] = 1
            aux += 0.1**i
        } else {
            vetorFracionado[posicao] = 0
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
        if (vetorInteiro[vetorInteiro.length - i] == "1"){
            resultado += 2**(i-1)
        }
    }
    //Transformar parte fracionada em decimal
    for(var i = 0; i < vetorFracionado.length; i++){
        if (vetorFracionado[i] == "1"){
            resultado += 0.5**(i+1)
        }
    }
    //Mostrar resultado
    const output = document.querySelector("#textarea-decimal")
    output.value = resultado
}
//Binario para decimal
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

//Binario para decimal
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
