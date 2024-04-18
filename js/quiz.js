const questions = [
    {
        question: "Hvor gammel var den ældste donor i Danmark",
        answers: [
            {text: "54 år", correct: false},
            {text: "63 år", correct: false},
            {text: "84 år", correct: false},
            {text: "92 år", correct: true},
        ],
        explanation: "Den ældste til at donere i Danmark var 92 år gammel. I 2023 var den ældste donor 84 år."

    }, 
    {
        question: "Hvor gammel var størstedelen af de afdøde donorer?",
        answers: [
            {text: "under 40 år", correct: false},
            {text: "40 - 50 år", correct: false},
            {text: "50 - 60 år", correct: false},
            {text: "Over 60 år", correct: true},
        ],
        explanation: "Størstedelen af donorerne var over 60 år. Kun få hundrede danskere dør hvert år på en måde, hvor organdonation bliver en mulighed."
    },
    {
        question: "Hvornår er organdonation en mulighed?",
        answers: [
            {text: "Når man dør af en stor skade i hjernen", correct: false},
            {text: "Når man er indlagt på hospitalet på en intensivafdeling og ligger i respirator", correct: false},
            {text: "Når individet selv eller de pårørende har sagt ja til organdonation", correct: true},
            {text: "Når ens organer er egnede til transplantation.", correct: false},
        ],
        explanation: "Det er altafgørende, at der er givet samtykke til donation, før man ser på andre faktorer."
    }  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const explanationElement = document.getElementById("explanation");
const nextQuestionButton = document.getElementById("next-question-btn");
const progressElement = document.getElementById("progress"); // Tilføj denne linje

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Check Answer";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 
    progressElement.textContent = `${questionNo} / ${questions.length}`; // Opdatere teksten for at vise det aktuelle spørgsmål og det samlede antal


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", checkAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    explanationElement.style.display = "none";
    nextQuestionButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

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
    nextButton.innerHTML = "Next Question";
    nextButton.addEventListener("click", showExplanation);
}

function showExplanation(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    explanationElement.innerHTML = currentQuestion.explanation;
    explanationElement.style.display = "block";
    nextQuestionButton.style.display = "block";
    nextQuestionButton.addEventListener("click", handleNextButton);
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore (){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
