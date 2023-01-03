var thesaurus = require("thesaurus")

let synonyms = document.getElementById("synonyms")
let input = document.getElementById("input")
const search = document.getElementById("search")

search.addEventListener("click", function() {
    let str = ""
    let word = input.value

    if (!isAlpha(word)) {
        str = `
            <div class="error">
                <h3>'${word}' is not a valid input.</h3>
                <p>Please enter a word.</p>
            </div>
        `
    }
    else {
        var list = thesaurus.find(word)
        str += `<ul>`
        for (i in list) {
            str += `<li>${list[i]}</li>`
        }
        str += `</ul>`
    }

    synonyms.innerHTML = str
})

function isAlpha(str) {
    return /^[a-zA-Z ]+$/.test(str)
}