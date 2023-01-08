var thesaurus = require("thesaurus")

let synonyms = document.getElementById("synonyms")
let input = document.getElementById("input")
const search = document.getElementById("search")

let copy = function() {
    var r = document.createRange();
    r.selectNode(document.getElementById(this.id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    alert("Copied to clipboard.")
}

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
                str += `
                    <li>
                        <button class="li-button" id="li${i}">
                            ${list[i]}
                        </button>
                    </li>
                `
                if ((i+1)%5===0 || i===list.length-1) {
                    str += `</ul></div>`
                }
            }
            str += `</div>`
        }
    }
    synonyms.innerHTML = str

    let buttons = document.getElementsByClassName("li-button")

    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", copy, false)
    }
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