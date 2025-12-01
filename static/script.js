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

        mediaRecorder.onstop = () => {
            console.log("Recording stopped.");
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

    let audioBase64 = "";

    // Convert audio blob to Base64
    if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const reader = new FileReader();

        audioBase64 = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result.split(",")[1]);
            reader.readAsDataURL(audioBlob);
        });
    }

    const abstractText = abstractInput.value;

    const payload = {
        abstract: abstractText,
        audio: audioBase64
    };

    // Send to backend
    const response = await fetch("/generate_art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    loadingText.style.display = "none";

    if (data.image) {
        resultImage.src = "data:image/png;base64," + data.image;
    } else {
        alert("Error generating image.");
    }
});

