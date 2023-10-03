let buttons = document.getElementsByClassName("button")
let resultText = document.getElementById("result-text")

let value1, value2, result
let operatos = "+-*/%"
let operation = ""
let firstValueInsert = false

function parseOperation(val1, val2, mathOperation) {
    if (mathOperation == "+") {
        resultText.innerText = `${val1 + val2}`.replace(".", ",")
    } else if (mathOperation == "-") {
        resultText.innerText = `${val1 - val2}`.replace(".", ",")
    } else if (mathOperation == "*") {
        resultText.innerText = `${val1 * val2}`.replace(".", ",")
    } else if (mathOperation == "/") {
        resultText.innerText = `${val1 / val2}`.replace(".", ",")
    }
}

for (let i in buttons) {
    if (parseInt(buttons[i].value) || buttons[i].value == "0") {
        buttons[i].addEventListener("click", function () {
            if (buttons[i].value == "0" && resultText.innerText.length == 0) {

            } else {
                if (firstValueInsert) {
                    resultText.innerText = ""
                }
                resultText.innerText += buttons[i].value
                firstValueInsert = false
            }
        })
    } else if (buttons[i].value == ",") {
        buttons[i].addEventListener("click", function () {
            if (resultText.innerText != "" && !resultText.innerText.includes(",")) {
                resultText.innerText += buttons[i].value
            }
        })
    } else if (buttons[i].value == "equals") {
        buttons[i].addEventListener("click", function () { // Botão para realizar o calculo
            if (operation != "" && resultText.innerText != "") {
                if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                    resultText.innerText += "0"
                }

                if (value1 == undefined && value2 == undefined) {
                    value1 = parseFloat(resultText.innerText.replace(",", "."))
                } else if (value1 != undefined && value2 == undefined) {
                    value2 = parseFloat(resultText.innerText.replace(",", "."))
                }

                if (value1 != undefined && value2 != undefined) {
                    parseOperation(value1, value2, operation)
                    value1 = parseFloat(resultText.innerText)
                    value2 = undefined
                    operation = ""
                }

                firstValueInsert = true
            }
        })
    } else if (buttons[i].value && operatos.includes(buttons[i].value)) {
        buttons[i].addEventListener("click", function () { // Botão de operador
            if (resultText.innerText[resultText.innerText.length - 1] == ",") {
                resultText.innerText += "0"
            }

            if (value1 == undefined && value2 == undefined) {
                value1 = parseFloat(resultText.innerText.replace(",", "."))
            } else if (value1 != undefined && value2 == undefined) {
                value2 = parseFloat(resultText.innerText.replace(",", "."))
            }

            if (value1 != undefined && value2 != undefined) {
                parseOperation(value1, value2, operation)
                value1 = parseFloat(resultText.innerText)
                value2 = undefined
                operation = ""
            }

            firstValueInsert = true
            operation = buttons[i].value
        })
    }

}

document.getElementById("clear").addEventListener("click", function () {
    if (resultText.innerText.length != 0) {
        resultText.innerText = ""
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
