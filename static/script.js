// --- DOM ELEMENTS ---
const recordBtn = document.getElementById("recordBtn");
const generateBtn = document.getElementById("generateBtn");
const abstractInput = document.getElementById("abstractInput");
const resultImage = document.getElementById("resultImage");
const loadingText = document.getElementById("loading");

let mediaRecorder;
let audioChunks = [];

// --- START RECORDING ---
recordBtn.addEventListener("click", async () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
        audioChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = e => {
            audioChunks.push(e.data);
        };

        mediaRecorder.start();
        recordBtn.innerText = "Stop Recording 🎤";
    } 
    else if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        recordBtn.innerText = "Record Voice 🎙️";
    }
});

// --- SEND TO BACKEND ---
generateBtn.addEventListener("click", async () => {
    loadingText.style.display = "block";
    resultImage.src = "";

    const abstractText = abstractInput.value;

    const payload = {
        prompt: abstractText
    };

    // ✅ CORRECT ENDPOINT
    const response = await fetch("https://artify-2.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    loadingText.style.display = "none";

    if (data.url) {
        resultImage.src = data.url;
    } else {
        alert("Error generating image.");
    }
});

