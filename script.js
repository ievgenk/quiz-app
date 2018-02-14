/* DATA */

const dataSet = [
  {
    question: `In which year did Alexander the Great become the king of Macedonia?`,
    answers: [`336BC`, `323BC`, `350BC`, `200BC`],
    correct: `336BC`
  },
  {
    question: `In which European country did renaissance start?`,
    answers: [`England`, `France`, `Germany`, `Italy`],
    correct: `Italy`
  },
  {
    question: `The Battle of Waterloo was fought in the year`,
    answers: [`1800`, `1805`, `1807`, `1815`],
    correct: `1815`
  },
  {
    question: `In which year America became independent?`,
    answers: [`1760`, `1776`, `1780`, `1782`],
    correct: `1776`
  },
  {
    question: `Who drew the world famous painting “Mona Lisa”?`,
    answers: [
      `Leonardo da Vinci`,
      `Michelangelo`,
      `Vincent van Gogh`,
      `Filippo Brunelleschi`
    ],
    correct: `Leonardo da Vinci`
  },
  {
    question: `The Hundred Years’ War was fought between`,
    answers: [
      `England and France`,
      `Germany and Russia`,
      `America and Argentina`,
      `England and Germany`
    ],
    correct: `England and France`
  },
  {
    question: `When did the second Russian revolution start?`,
    answers: [`August, 1905`, `February, 1917`, `October, 1917`, `March, 1921`],
    correct: `October, 1917`
  },
  {
    question: `Who is known as the ‘Father of History’?`,
    answers: [`Homer`, `Thucydides`, `Herodotus`, `Archimides`],
    correct: `Herodotus`
  },
  {
    question: `Who was the founder of Ottoman Empire?`,
    answers: [`Osman I`, `Orhan`, `Mura I`, `Bayezid I`],
    correct: `Osman I`
  },
  {
    question: `Which country first invented gunpowder in around 270 AD?`,
    answers: [`India`, `China`, `England`, `Korea`],
    correct: `China`
  }
];

let questionNumber = 0;
let rightAnswers = 0;
let wrongAnswers = 0;

/* FUNCTIONS */

function incrementQuestionNumber() {
  questionNumber++;
  $(".questionNum").html(`${questionNumber}/10`);
}
function incrementRightAnswers() {
  rightAnswers++;
  $(".rightAnswers").html(`: ${rightAnswers}`);
}
function incrementWrongAnswers() {
  wrongAnswers++;
  $(".wrongAnswers").html(`: ${wrongAnswers}`);
}

function templateQuestion() {
  return `<section class="questions">
  <h2 class="question">${dataSet[(questionNumber - 1)].question}</h3>
    <label for="a1">
      <input type="radio" name="answer-1" id="a1">${
        dataSet[(questionNumber - 1)].answers[0]
      }</label>
    <label for="a2">
      <input type="radio" name="answer-1" id="a2">${
        dataSet[(questionNumber - 1)].answers[1]
      }</label>
    <label for="a3">
      <input type="radio" name="answer-1" id="a3">${
        dataSet[(questionNumber - 1)].answers[2]
      }</label>
    <label for="a4">
      <input type="radio" name="answer-1" id="a4">${
        dataSet[(questionNumber - 1)].answers[3]
      }</label>
    <button class="btn">Start Over</button>
    <button class="nextQuestionBtn">Next Question</button>
</section>`;
}

function disableFormSubmission() {
  $("#form").submit(function(event) {
    event.preventDefault();
  });
}

function startQuiz() {
  $("#startQuiz").on("click", function(event) {
    incrementQuestionNumber();
    $("#form").html(templateQuestion);
  });
}
function evaluateAnswer() {
  $("#form").on("click", ".nextQuestionBtn", function(event) {
    let inputAnswer = $("input[type=radio]:checked")
      .parent()
      .text()
      .trim();
    if (inputAnswer === dataSet[questionNumber-1].correct) {
      console.log(`hooray!`);
    }
  });
}

$(function() {
  disableFormSubmission();
  startQuiz();
  evaluateAnswer();
});
