fetch('../json/data.json')
  .then(response => response.json())
  .then(data => {
    const quizData = data;

    // Opret et tomt array til at indeholde dine spørgsmål
    const questions = [];

    // Loop gennem quizData-objektet og opret spørgsmål for hvert element
    quizData.forEach(item => {
      const question = {
        question: item.question, // Brug data fra JSON-filen til at sætte spørgsmålet
        answers: item.answers,
        correctAnswerIndex: item.correct, // Brug data fra JSON-filen til at sætte det korrekte svar-indeks
        explanation: item.explanation // Brug data fra JSON-filen til at sætte forklaringen
      };

      // Tilføj det oprettede spørgsmål til questions-arrayet
      questions.push(question);
    });


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

})
