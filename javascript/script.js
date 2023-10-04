let buttons = document.getElementsByClassName("button")
let resultText = document.getElementById("result-text")
let clear = document.getElementById("clear")
let clearText = false

let value1, value2
let operatos = "+-*/"
let operation = ""
let firstValueInsert = false
let fastOperation = false

function playClick() {
    var audio = document.getElementById("click-sound");
    audio.play();
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
                    resultText.innerText += buttons[i].value
                }
                clear.innerText = "C"
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
                    value1 = parseFloat(resultText.innerText.replace(".", "").replace(",", "."))
                } else if (value1 != undefined && value2 == undefined) {
                    value2 = parseFloat(resultText.innerText.replace(".", "").replace(",", "."))
                }

                if (value1 != undefined && value2 != undefined && operation != "") {
                    parseOperation(value1, value2, operation)
                    value1 = parseFloat(resultText.innerText.replace(".", "").replace(",", "."))
                    value2 = undefined
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
            playClick()
        })
    }
}

clear.addEventListener("click", function () {
    if (clear.innerText == "C" && resultText.innerText != "0") {
        resultText.innerText = "0"
        value2 = undefined

        if (value1 != undefined) {
            clear.innerText = "AC"
        }
        clearText = true
    } else if (clear.innerText == "AC" && value1 != undefined && clearText) {
        resultText.innerText = "0"
        value1 = undefined
        value2 = undefined
        clear.innerText = "C"
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
