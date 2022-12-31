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
        str = `
            <ul>
                <li>testing 1</li>
                <li>testing 2</li>
                <li>testing 3</li>
            </ul>
        `
    }

    synonyms.innerHTML = str
})

function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str)
}