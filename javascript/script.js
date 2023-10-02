let buttons = document.getElementsByClassName("button")
let resultText = document.getElementById("result-text")

for (let i in buttons) {
    if (parseInt(buttons[i].value) || buttons[i].value == "0") {
        buttons[i].addEventListener("click", function () {
            if (buttons[i].value == "0" && resultText.innerText.length == 0) {

            } else {
                resultText.innerText += buttons[i].value
            }
        })
    } else if (buttons[i].value == "") {

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