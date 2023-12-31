const playBtn = document.querySelector("#play")

function index() {
    const image = document.querySelector('img')
    const input = document.getElementById('input')
    const stopBtn = document.querySelector("#stop")
    const nextBtn = document.querySelector("#next")
    const backBtn = document.querySelector('#back')
    const frameNumber = document.querySelector('#frame-number')

    playBtn.removeEventListener('click', index)
    const urlBase = 'https://raw.githubusercontent.com/ArtKolyach/selfie/master/img/img_split'

    image.setAttribute("src", `${urlBase}/frame_00_delay-0.05s.gif`)

    const changePhoto = () => {
        let frame = 0

        return function (direction) {
            if (direction === "forward") {
                if (frame >= 29) {
                    frame = 0
                    return frame
                } else return (++frame)
            }
            if (direction === "back") {
                if (frame <= 0) {
                    frame = 29
                    return frame
                } else return (--frame)
            }
        }
    }

    const parseFrameNumber = (frame) => {
        if (frame < 10) return `0${frame}`
        return String(frame)
    }

    let newFrame = changePhoto()

    let intervalId = setInterval(() => {
    }, 100)

    const setPhotoInterval = () => {
        intervalId = setInterval(() => {
            const frame = newFrame("forward")
            frameNumber.textContent = frame+1
            image.setAttribute("src", `${urlBase}/frame_${parseFrameNumber(frame)}_delay-0.05s.gif`)
        }, 1000 - input.value)
    }

    input.addEventListener("change", (e) => {
        clearInterval(intervalId)
        setPhotoInterval()
    })

    image.addEventListener("mousedown", () => {
        clearInterval(intervalId)
    })
    image.addEventListener("mouseup", setPhotoInterval)
    image.addEventListener("touchstart", () => clearInterval(intervalId))
    image.addEventListener("touchend", setPhotoInterval)

    playBtn.addEventListener("click", () => {
        if (intervalId) clearInterval(intervalId)
        setPhotoInterval()
    })
    stopBtn.addEventListener('click', () => clearInterval(intervalId))

    nextBtn.addEventListener("click", () => {
        const frame = newFrame("forward")
        image.setAttribute("src", `${urlBase}/frame_${parseFrameNumber(frame)}_delay-0.05s.gif`)
        frameNumber.textContent = frame+1
    })

    backBtn.addEventListener("click", () => {
        const frame = newFrame("back")
        image.setAttribute("src", `${urlBase}/frame_${parseFrameNumber(frame)}_delay-0.05s.gif`)
        frameNumber.textContent = frame+1
    })
}

window.addEventListener('DOMContentLoaded', index)

//playBtn.addEventListener("click", index)


