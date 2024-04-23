
# Quiz README

Vores repository indeholder en quiz, der er udviklet ved hjælp af JSON-data og JavaScript. Formålet med vores README.md fil er at forklare, hvordan vi har integretet JSON-data, samt hvordan vi har anvendt Javascript til at opbygge quizzen.

## JSON Data

Vi har brugt JSON til at strukturere og gemme vores quiz-spørgsmål, svarmuligheder og forklaringer hertil. 

Et eksempel på et JSON-dataobjekt til et quiz-spørgsmålene ser således ud:

```json

[
    {
        "question": "Hvor gammel var den ældste organdonor?",
        "answers": [
            {"text": "54 år", "correct": false},
            {"text": "63 år", "correct": false},
            {"text": "84 år", "correct": false},
            {"text": "92 år", "correct": true}
        ],
        "explanation": "Den ældste til at donere i Danmark var 92 år gammel. I 2023 var den ældste donor 84 år."
    },
    // Andre spørgsmål kommer ligeledes nedenfor
]
```

På den måde repræsenterer hvert JSON-objekt et enkelt spørgsmål i quizzen og indeholder informationer om spørgsmålet, svarmulighederne og en forklaring.

## JavaScript Implementation

Vi har brugt JavaScript til at hente JSON-dataene og dynamisk generere quizzen i HTML. 

Når JSON-dataene er hentet, bliver de parsed, og et array af spørgsmål oprettes. Ud fra dette bliver quizzen oprettet ved at bruge spørgsmålene, som vi netop har hentet.

Her er et eksempel på JavaScript-koden, der er ansvarlig for at hente JSON-dataene og oprette quizzen:

```javascript 

fetch('../json/data.json')
  .then(response => response.json())
  .then(data => {
    const quizData = data;

    // Opretter et tomt array til at indeholde dine spørgsmål
    const questions = [];

    // Loop gennem quizData-objektet og opretter spørgsmål for hvert element
    quizData.forEach(item => {
        // Opretter hvert spørgsmål og tilføjer det til questions-arrayet
    });

    // Funktioner til at vise spørgsmål, tjekke svar, og vise resultater følger...
  });
```

På den måde henter Javascript-koden JSON-dataene, parser dem, opretter spørgsmålene og dermed starter quizzen.

Når quizzen starter, vises et spørgsmål ad gangen sammen med svarmulighederne. Når brugeren vælger et svar, bliver det tjekket, og det vises om svaret er korrekt eller ej. 

Når alle spørgsmål er besvaret, vises hvor mange spørgsmål brugeren har svaret rigtig på.

### True/False

#### JSON

For at definere om en svarmulighed er korrekt, har vi brugt true/false i hver af JSON-objekternes svarmuligheder. 

#### Javascript

Hertil har vi anvendt JavaScript til at implementere funktionaliteten i vores quiz. Når brugeren klikker på et svar, bliver følgende JavaScript-funktion, checkAnswer(e), udført:

```javascript

function checkAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  nextButton.addEventListener("click", showExplanation);
}
```

Dermed tjekker funktionen, om det valgte svar er korrekt eller forkert, baseret på data-attributterne i HTML-elementerne. Derefter tilføjer den enten klassen "correct" eller "incorrect" til det valgte svar. 

Hvis svaret er korrekt, tillægges et ekstra point til brugerens samlede score.

#### CSS

Vi har også anvendt CSS til elementer "correct" og "incorrect". Herunder har vi ændret baggrundsfarven, tekstfarven og kantlinjens farve for at angive, om svaret er korrekt eller forkert:

```css

.correct {
    background: #CCE2D0;
    color: #13481B;
    border: #13481B solid 1px;
}

.incorrect {
    background: #F1D1E2;
    color: #6A1D2C;
    border: #6A1D2C solid 1px;
}
```

Samlet set giver denne implementering af JSON, JavaScript og CSS en visuel feedback til brugeren, der angiver, om deres svar er korrekte eller forkerte, hvilket forbedrer brugeroplevelsen af ​​quizzen.


