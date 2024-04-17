// Finder videoelementet
var video = document.getElementById("videoPlayer");

// Finder knappen i HTML
var pausePlayBtn = document.getElementById("pausePlayBtn");
var finishBtn = document.getElementById("finishBtn");

// Lyt efter begivenheden "canplaythrough", der udløses, når videoen kan afspilles uden afbrydelser
video.addEventListener("canplaythrough", function() {
    // Starter afspilningen automatisk, når videoen er færdig indlæst
    video.play();

    // Aktiver knappen, når videoen er klar til at afspille
    pausePlayBtn.disabled = false;
    finishBtn.disabled = false;
});

// Lyt efter afspilningsafslutning
video.addEventListener("ended", function() {
    // Diriger brugeren til en anden side
    window.location.href = "video-slut.html"; // Tilføjer link til ny side
});

// Tilføjer en eventlistener, der lytter efter klik på pause/afspil-knappen
pausePlayBtn.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        pausePlayBtn.textContent = "Pause"; // Ændrer tekst til "Pause"
    } else {
        video.pause();
        pausePlayBtn.textContent = "Play"; // Ændrer tekst til "Play" når videoen er sat på pause
    }
});

// Tilføjer en eventlistener, der lytter efter klik på afslutningsknappen
finishBtn.addEventListener("click", function() {
    // Diriger brugeren til en anden side
    window.location.href = "video-slut.html";
});

// Deaktiver knapperne ved start, da videoen ikke er klar til afspilning endnu
pausePlayBtn.disabled = true;
finishBtn.disabled = true;

console.log("Script loaded!"); // Tilføj denne linje for at kontrollere, om scriptet indlæses korrekt


// ------------------------------------------

