//Getting elements by id
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const API_KEY = atob("YmFiYTViODhhNzNmNGM5ZmI3Y2IzMjBjMjMyNGJhNjI=");

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Text-to-speech API calls and handling
function tellMe(joke) {
    VoiceRSS.speech({
        key: API_KEY,
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
    });
}

// Get jokes from api and play it
async function getJokes() {
    let Joke;
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
    try {
        response = await fetch(apiUrl);
        data = await response.json();
        if (data.type === "single") {
            Joke = data.joke;
        } else {
            Joke = `${data.setup} .... ${data.delivery}`;
        }
        tellMe(Joke);
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}

//Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
