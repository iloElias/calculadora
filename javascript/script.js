let buttons = document.getElementsByClassName("button")
let resultText = document.getElementById("result-text")
let clear = document.getElementById("clear")

let value1, value2
let operatos = "+-*/"
let operation = ""
let firstValueInsert = false
let fastOperation = false

function playClick() {
    if (document.getElementById("click-sound")) {
        let audio = document.getElementById("click-sound");
        audio.play();
    }
}

function formatOutput(output) {
    let formattedNumber = output.replace(".", ",");

    if (formattedNumber.includes(",")) {
        let parts = formattedNumber.split(",");
        let integerPart = parts[0];
        let decimalPart = parts[1];

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        formattedNumber = integerPart + "," + decimalPart;
    } else {
        formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return formattedNumber;
}


function parseOperation(val1, val2, mathOperation) {
    let result = ""
    if (mathOperation == "+") {
        result = `${(val1 + val2)}`
    } else if (mathOperation == "-") {
        result = `${(val1 - val2)}`
    } else if (mathOperation == "*") {
        result = `${(val1 * val2)}`
    } else if (mathOperation == "/") {
        result = `${(val1 / val2)}`
    }

    result = result.replace(".", ",")

    if (result.includes(",")) {
        let dotIndex = result.indexOf(",")

        result = result.substring(0, dotIndex + 3)
    }

    resultText.innerText = formatOutput(result)
}

for (let i in buttons) {
    if (parseInt(buttons[i].value) || buttons[i].value == "0") {
        buttons[i].addEventListener("click", function () {
            if (resultText.innerText.length <= 11) {
                if (firstValueInsert && resultText.innerText != "") {
                    resultText.innerText = ""
                }

                if (resultText.innerText.length = 1 && resultText.innerText == "0" && !firstValueInsert) {
                    resultText.innerText = buttons[i].value
                } else {
                    if (formatOutput((resultText.innerText + buttons[i].value).replaceAll(".", "")).length <= 11) {
                        resultText.innerText = formatOutput((resultText.innerText + buttons[i].value).replaceAll(".", ""))
                    }
                }

                if (document.getElementById("selected-operation")) {
                    document.getElementById("selected-operation").removeAttribute("id")
                }

                if (resultText.innerText != "0") {
                    clear.innerText = "C"
                }

                changeText()

                firstValueInsert = false
            }
            playClick()
        })
    } else if (buttons[i].value == ",") {
        buttons[i].addEventListener("click", function () {
            if (!resultText.innerText.includes(",") && resultText.innerText.length <= 11) {
                if (resultText.innerText != "") {
                    resultText.innerText += buttons[i].value
                } else {
                    resultText.innerText += "0" + buttons[i].value
                }
                changeText()
            }
            playClick()
        })
    } else if (buttons[i].value == "%") {
        buttons[i].addEventListener("click", function () {
            if (resultText.innerText != "") {
                value1 = parseFloat(resultText.innerText.replace(",", ".")) / 100
                value2 = undefined
                operation = "*"

                firstValueInsert = true
                resultText.innerText = `${value1}`.replace(".", ",")
            }
            playClick()
        })
    }
    else if (buttons[i].value == "equals") {
        buttons[i].addEventListener("click", function () { // Botão para realizar o calculo
            if (resultText.innerText != "") {
                if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                    resultText.innerText += "0"
                }

                if (value1 == undefined && value2 == undefined) {
                    let aux = resultText.innerText.replaceAll(".", "")
                    if (aux.includes(",")) {
                        aux = aux.replace(",", ".")
                    }
                    value1 = parseFloat(aux)
                } else if (value1 != undefined && value2 == undefined) {
                    let aux = resultText.innerText.replaceAll(".", "")
                    if (aux.includes(",")) {
                        aux = aux.replace(",", ".")
                    }
                    value2 = parseFloat(aux)
                }

                if (value1 != undefined && value2 != undefined && operation != "") {
                    parseOperation(value1, value2, operation)
                    value1 = undefined
                    value2 = undefined
                    if (document.getElementById("selected-operation")) {
                        document.getElementById("selected-operation").removeAttribute("id")
                    }
                    operation = ""
                }

                changeText()
                firstValueInsert = true
            }
            playClick()
        })
    } else if (buttons[i].value && operatos.includes(buttons[i].value)) {
        buttons[i].addEventListener("click", function () { // Botão de operador
            if (resultText.innerText != "") {
                if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                    resultText.innerText += "0"
                }

                operation = buttons[i].value
                let mathSelect = document.getElementsByClassName("math-select")
                if (document.getElementById("selected-operation")) {
                    document.getElementById("selected-operation").removeAttribute("id")
                }
                for (let index in mathSelect) {
                    if (mathSelect[index].value == buttons[i].value) {
                        mathSelect[index].setAttribute("id", "selected-operation")
                    }
                }

                if (value1 == undefined && value2 == undefined) {
                    let aux = resultText.innerText.replaceAll(".", "")
                    if (aux.includes(",")) {
                        aux = aux.replace(",", ".")
                    }
                    value1 = parseFloat(aux)
                } else if (value1 != undefined && value2 == undefined) {
                    let aux = resultText.innerText.replaceAll(".", "")
                    if (aux.includes(",")) {
                        aux = aux.replace(",", ".")
                    }
                    value2 = parseFloat(aux)
                }

                if (fastOperation) {
                    if (value1 != undefined && value2 != undefined && operation != "") {
                        parseOperation(value1, value2, operation)
                        value1 = undefined
                        value2 = undefined
                        operation = ""
                    }
                }

                if (operation == "") {
                    value2 = undefined
                }

                firstValueInsert = true
            }
            playClick()
        })
    }
}

clear.addEventListener("click", function () {
    if (clear.innerText == "C") {
        resultText.innerText = "0"
        value2 = undefined
        clear.innerText = "AC"
    } else if (clear.innerText == "AC") {
        resultText.innerText = "0"
        if (value1 || value2) {
            value1 = undefined
            value2 = undefined
        }
        if (document.getElementById("selected-operation")) {
            document.getElementById("selected-operation").removeAttribute("class")
            operation = ""
        }
    }

    textBox.style.fontSize = "10vh"
    size = 10.0
})

document.getElementById("revert-signal").addEventListener("click", function () {
    if (resultText.innerText.length != 0 && resultText.innerText[0] != "-") {
        let splitText = resultText.innerText.split("")

        if (parseInt(splitText[splitText.length - 1])) {
            resultText.innerText = `-${splitText.join("")}`
        }
    } else {
        resultText.innerText = resultText.innerText.replace("-", "")
    }
})

resultText.innerText = "0"