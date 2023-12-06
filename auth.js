//import {index} from "./modules";
import {passwordCheck} from "./modules/passwordCheck.js";


window.addEventListener('DOMContentLoaded', go)

function go () {
    const authWrapper = document.getElementById("auth-wrapper")
    const passwordInput = document.getElementById("password-input")
    const contentWrapper = document.getElementsByClassName("content-wrapper")

    passwordInput.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            if (passwordCheck(e.target.value)) {
                //index()
                contentWrapper[0].classList.remove("hidden")
                authWrapper.hidden = true
            } else e.target.value = ""
        }
    })
}