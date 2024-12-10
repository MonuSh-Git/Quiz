
// fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.error('There was a problem with the fetch operation:', error));

let data ;
async function loadQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple';    
    const result = await fetch(`${apiUrl}`);
    data = await result.json();
    // console.log(data.results);
    return data;
}    
loadQuestion();

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
// const headerScore = document.querySelector('.header-score')
const resultBox = document.querySelector('.result-box');
const homeBtn =  document.querySelector('.home-page-btn');
const playagainBtn = document.querySelector('.play-again-btn');
const home = document.querySelector('.home');
const container = document.querySelector('.container');

startBtn.addEventListener('click',()=>{
    popupInfo.classList.add('active');
    main.classList.add('active');
})

exitBtn.addEventListener('click' ,() =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
})

continueBtn.addEventListener('click',() =>{

    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    home.classList.add('disabled');

    
    showQuestions(0);
    questionCounter(1);
})

let questionCount = 0;
let questionNumb = 1;
let score = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () =>{
    if (questionCount < data.results.length - 1){
        questionCount++;
        questionNumb++;

        showQuestions(questionCount);
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    } else{
        // console.log("Ques Completed");
        scoreDisplay();
    }
})

const optionList = document.querySelector('.option-list')

let correctAnswer;
let incorrectAnswer;

function showQuestions() {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questionNumb}. ${data.results[questionCount].question}`;

    correctAnswer = data.results[questionCount].correct_answer;
    incorrectAnswer = data.results[questionCount].incorrect_answers;

    let optionArray = incorrectAnswer;
    optionArray.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer)

    let optionTag = `<div class="option">${optionArray[0]}</div>
    <div class="option">${optionArray[1]}</div>
    <div class="option">${optionArray[2]}</div>
    <div class="option">${optionArray[3]}</div>`;

    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        option.addEventListener('click', (e) => {
            // console.log(e.target);
            optionSelected(e.target);
        });    
    });

}

function optionSelected(answer) {
    let userAnswer = answer.innerText;
    if (userAnswer == correctAnswer){
        // console.log('answer is right');
        score ++;
        answer.classList.add('correct'); 
    } else {
        // console.log('answer is Wrong');
        answer.classList.add('incorrect');

        for (let i = 0; i < optionList.children.length; i++) {
            if (optionList.children[i].innerText == correctAnswer){
                optionList.children[i].classList.add('correct');
            }
        }

    }

    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter() {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${questionNumb} of ${data.results.length} Questions`;
}

function scoreDisplay() {
    resultBox.classList.add('active');
    quizSection.classList.add('active');
    quizBox.classList.remove('active');

    let scorePercentage = document.querySelector('.score-percentage');
    let scorePercentageStart = -1 ;
    let scorePercentageEnd = (score / data.results.length)*100;
    

    let resultScore = document.querySelector('.result-score');

    resultScore.innerText = `Score: ${score} / ${data.results.length}`;
    
    let progressCircle = document.querySelector('.progress-circle');


    
    let resultUpdate = setInterval(() => {
        scorePercentageStart++;
        scorePercentage.innerText = `${scorePercentageStart}%`;

        progressCircle.style.background = `conic-gradient(#3700ff ${scorePercentageStart}%, #fff 0%)`;


        if (scorePercentageStart == scorePercentageEnd) {
            clearInterval(resultUpdate);
        }
    }, 60);
}

homeBtn.addEventListener('click', ()=>{
    
    home.classList.remove('disabled');
    popupInfo.classList.remove('active');
    quizSection.classList.remove('active');
    main.classList.remove('active');
    resultBox.classList.remove('active');
    quizBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    score = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    loadQuestion();
})
    
playagainBtn.addEventListener('click',()=>{
    resultBox.classList.remove('active');
    quizBox.classList.add('active');
    questionCount = 0;
    questionNumb = 1;
    score = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    loadQuestion();
     
})


menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


const headerSlide = document.querySelector('.home-content h1');
const paraSlide = document.querySelector('.home-content p');
const aboutSlide = document.querySelector('.about');

window.addEventListener('scroll', () => {

    const scrollPosition = window.scrollY;

    if (scrollPosition > 150) {
        headerSlide.classList.add('slide-off');
        paraSlide.classList.add('slide-off');
        aboutSlide.classList.add('slide-off');
        
    } else {
        headerSlide.classList.remove('slide-off');
        paraSlide.classList.remove('slide-off');
        aboutSlide.classList.remove('slide-off');
    }
});


// let colorChange = setInterval(() => {
//     changeBG();
    
// }, 2000);

// function changeBG(){
//         let randomNo1 = Math.round(Math.random()*255);
//         let randomNo2 = Math.round(Math.random()*255);
//         let randomNo3 = Math.round(Math.random()*255);
        
//         let randomNo4 = Math.round(Math.random()*255);
//         let randomNo5 = Math.round(Math.random()*255);
//         let randomNo6 = Math.round(Math.random()*255);
         
//         // main.style.background = `linear-gradient(rgb(${randomNo1},${randomNo2},${randomNo3}),rgb(${randomNo4},${randomNo5},${randomNo6})) `;

//         main.style.transition = 'all 3s ease';  
//     }





