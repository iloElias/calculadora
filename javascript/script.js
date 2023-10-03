let buttons = document.getElementsByClassName("button")
let resultText = document.getElementById("result-text")
let clear = document.getElementById("clear")

let value1, value2
let operatos = "+-*/"
let operation = ""
let firstValueInsert = false
let fastOperation = false

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

    resultText.innerText = result
}

for (let i in buttons) {
    if (parseInt(buttons[i].value) || buttons[i].value == "0") {
        buttons[i].addEventListener("click", function () {
            if (firstValueInsert && resultText.innerText != "") {
                resultText.innerText = ""
            }
            resultText.innerText += buttons[i].value

            firstValueInsert = false
        })
    } else if (buttons[i].value == ",") {
        buttons[i].addEventListener("click", function () {
            if (!resultText.innerText.includes(",")) {
                if (resultText.innerText != "") {
                    resultText.innerText += buttons[i].value
                } else {
                    resultText.innerText += "0" + buttons[i].value
                }
            }
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
        })
    }
    else if (buttons[i].value == "equals") {
        buttons[i].addEventListener("click", function () { // Botão para realizar o calculo
            if (resultText.innerText != "") {
                if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                    resultText.innerText += "0"
                }

                if (value1 == undefined && value2 == undefined) {
                    value1 = parseFloat(resultText.innerText.replace(",", "."))
                } else if (value1 != undefined && value2 == undefined) {
                    value2 = parseFloat(resultText.innerText.replace(",", "."))
                }

                if (value1 != undefined && value2 != undefined && operation != "") {
                    parseOperation(value1, value2, operation)
                    value1 = parseFloat(resultText.innerText.replace(",", "."))
                    value2 = undefined
                    operation = ""
                }

                firstValueInsert = true
            }
        })
    } else if (buttons[i].value && operatos.includes(buttons[i].value)) {
        buttons[i].addEventListener("click", function () { // Botão de operador
            if (resultText.innerText != "") {
                if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                    resultText.innerText += "0"
                }

                if (value1 == undefined && value2 == undefined) {
                    value1 = parseFloat(resultText.innerText.replace(",", "."))
                } else if (value1 != undefined && value2 == undefined) {
                    value2 = parseFloat(resultText.innerText.replace(",", "."))
                }

                if (fastOperation) {
                    if (value1 != undefined && value2 != undefined && operation != "") {
                        parseOperation(value1, value2, operation)
                        value1 = parseFloat(resultText.innerText.replace(",", "."))
                        value2 = undefined
                        operation = ""
                    }
                }

                if (operation == "") {
                    value2 = undefined
                }

                operation = buttons[i].value
                firstValueInsert = true
            }
        })
    }
}

clear.addEventListener("click", function () {
    if (clear.innerText == "AC") {
        resultText.innerText = ""
        value1 = undefined
        value2 = undefined
        clear.innerText = "C"
    } else if (clear.innerText = "C") {
        resultText.innerText = ""
        value2 = undefined
        clear.innerText = "AC"
    }
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
