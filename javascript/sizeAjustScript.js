let display = document.getElementById("display");
let textBox = document.getElementById("result-text");
let size = 10.0

function changeText() {
    console.log("Mudou para: " + textBox.innerText)
    while (textBox.offsetWidth > display.offsetWidth - (display.offsetWidth / 9.5)) {
        size -= 0.1
        textBox.style.fontSize = `${size}vh`
        console.log("Test")
    }
}