import hiragana from "./hiragana.json" with {type: "json"}
import katakana from "./katakana.json" with {type: "json"}
let template = document.querySelector("template")
let text = document.querySelector(".text")
let correction = document.querySelector(".correction")
let reveal = document.querySelector(".reveal")
let streakDiv = document.querySelector(".streak")
let input = document.querySelector(".ans")
let listButton = document.querySelector(".list-button")
let list = document.querySelector(".list")
let darken = document.querySelector(".darken")
let hiraContainer = document.querySelector(".hira-container")
let kataContainer = document.querySelector(".kata-container")
let hira = document.querySelector(".hira")
let kata = document.querySelector(".kata")
let hiraCheck = document.querySelector("#hiragana")
let kataCheck = document.querySelector("#katakana")
let bothCheck = document.querySelector("#both")
let ans = ""
let streak = 0
let kanas = hiragana.concat(katakana)


input.addEventListener("input", () => {
    let val = input.value.trim()
    if (val  == ans) {
        nextWord()
        input.value = ""
        streakDiv.innerText = ++streak
    }
})

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        let val = input.value
        if (val.toLowerCase() == ans) {
            streakDiv.innerText = ++streak
            nextWord()
            input.value = ""
        }
        else {
            streak = 0
            streakDiv.innerText = streak
            revealAns()
        }
    }
})

reveal.addEventListener("click", revealAns)

hiraCheck.addEventListener("click", changeKana)
kataCheck.addEventListener("click", changeKana)
bothCheck.addEventListener("click", changeKana)

listButton.addEventListener("click", () => {
    list.classList.toggle("display")
    darken.classList.toggle("display")
})

darken.addEventListener("click", () => {
    list.classList.toggle("display")
    darken.classList.toggle("display")
})

hira.addEventListener("click", () => {
    if (!hira.classList.contains("selected")) {
        kata.classList.remove("selected")
        hira.classList.add("selected")
        hiraContainer.classList.add("display")
        kataContainer.classList.remove("display")
    }
})

kata.addEventListener("click", () => {
    if (!kata.classList.contains("selected")) {
        hira.classList.remove("selected")
        kata.classList.add("selected")
        kataContainer.classList.add("display")
        hiraContainer.classList.remove("display")
    }
})

for (const kana of hiragana) {
    let clone = template.content.cloneNode(true)
    let jp = clone.querySelector(".jp")
    let romaji = clone.querySelector(".romaji")
    jp.innerText = kana.text
    romaji.innerText = kana.pronounce
    hiraContainer.appendChild(clone)
}

for (const kana of katakana) {
    let clone = template.content.cloneNode(true)
    let jp = clone.querySelector(".jp")
    let romaji = clone.querySelector(".romaji")
    jp.innerText = kana.text
    romaji.innerText = kana.pronounce
    kataContainer.appendChild(clone)
}

function nextWord() {
    let obj
    do {
        obj = kanas[Math.floor(Math.random() * kanas.length)]
    } while (obj.text == "" || ans == obj.pronounce)
    text.innerText = obj.text
    ans = obj.pronounce
}

function revealAns() {
    if (correction.innerText == "") {
        correction.innerText = ans
        reveal.innerText = "Next"
    }
    else {
        correction.innerText = ""
        nextWord()
        reveal.innerText = "Reveal"
        input.value = ""
    }
}

function changeKana() {
    if (hiraCheck.checked) kanas = hiragana
    if (kataCheck.checked) kanas = katakana
    else kanas = hiragana.concat(katakana)
    nextWord()
    streak = 0
    streakDiv.innerText = streak
    input.focus()
}

nextWord()
input.focus()