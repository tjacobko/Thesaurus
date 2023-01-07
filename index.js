var thesaurus = require("thesaurus")

let synonyms = document.getElementById("synonyms")
let input = document.getElementById("input")
const search = document.getElementById("search")

search.addEventListener("click", function() {
    let str = ""
    let word = input.value

    if (!isAlpha(word)) {
        if (word === "") {
            str = `
                <div class="bottom-container">
                    <div class="error">
                        <h3>Input is empty.</h3>
                        <p>Please enter a word.</p>
                    </div>
                </div>
            `
        }
        else {
            str = `
                <div class="bottom-container">
                    <div class="error">
                        <h3>'${word}' is not a valid input.</h3>
                        <p>Please enter a word.</p>
                    </div>
                </div>
            `
        }
    }
    else {        
        var list = thesaurus.find(word)
        if (list.length > 20) {
            list.length = 20
        }

        if (list.length === 0) {
            str += `
                <div class="bottom-container">
                    <div class="error">
                        <h3>No synonyms found.</h3>
                    </div>
                </div>
            `
        }
        else {
            str += `<div class="bottom-container">`
            for (let i=0; i < list.length; i++) {
                if ((i+1)%5===1) {
                    str += `<div class="col"><ul>`
                }
                str += `<li>${list[i]}</li>`
                if ((i+1)%5===0 || i===list.length-1) {
                    str += `</ul></div>`
                }
            }
            str += `</div>`
        }
    }
    synonyms.innerHTML = str
})

// EventListener allows user to use 'Enter' to input word
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        search.click()
    }
})

// Helper function to check if word
// only contains alphas and spaces
function isAlpha(str) {
    return /^[a-zA-Z ]+$/.test(str)
}