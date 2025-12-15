import { getWeather} from "./handlers.js"
const main = () => {
    const btn = document.querySelector(".fetch-button")
    console.log(btn)
    btn.addEventListener("click", async () => {
        try {
        const res = getWeather()
        const content = document.querySelector(".content")
        content.textContent = "Current temperature is " + res.main.temp  
        } catch(e) {
            alert("error")
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})
