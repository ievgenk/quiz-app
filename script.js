/* DATA */

const dataSet = [
  {
    question: `In what year did Alexander the Great become the king of Macedonia?`,
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
    question: `In what year America became independent?`,
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
    question: `In what year did Arab Spring start?`,
    answers: [`1987`, `2015`, `2011`, `1999`],
    correct: `2011`
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
  $(".questionNum").html(`: ${questionNumber}/10`);
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
  return `<fieldset role="group" aria-label="quiz-selection-option"><section class="questions">
  <h2 class="question">${dataSet[questionNumber - 1].question}</h3>
    <label for="a1">
      <input type="radio" name="answer-1" id="a1" aria-label="quiz question"  role="group"required>${
        dataSet[questionNumber - 1].answers[0]
      }</label>
    <label for="a2">
      <input type="radio" name="answer-1" id="a2" aria-label="quiz question" role="group">${
        dataSet[questionNumber - 1].answers[1]
      }</label>
    <label for="a3">
      <input type="radio" name="answer-1" id="a3" aria-label="quiz question" role="group">${
        dataSet[questionNumber - 1].answers[2]
      }</label>
    <label for="a4">
      <input type="radio" name="answer-1" id="a4" aria-label="quiz question" role="group">${
        dataSet[questionNumber - 1].answers[3]
      }</label>

      <section class="desktop-btns">
        <button class="btn startOverBtn">Start Over</button>
        <button class="btn nextQuestionBtn" type="submit">Next Question</button>
      </section>

    <section class="cell-btns">
      <button class="btn startOverBtn">Start Over</button>
      <button class="btn nextQuestionBtn">Next Question</button>
  </section>
</section></fieldset>`;
}

function templateCorrectAnswer() {
  return `<h2>Great work, this is a <span class="corAnswer">correct answer!</span></h2><br/>
  <button class="btn nextQuestionBtn">Next Question</button>
  `;
}
function templateWrongAnswer() {
  return `<h2>Unfortunately that is <span class="wrAnswer">not the correct answer</span>.<br /> The right answer is <span class="corAnswer">${
    dataSet[questionNumber - 1].correct
  }</span></h2><br/>
  <button class="btn nextQuestionBtn">Next Question</button>`;
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

function nextQuestion() {
  $(".nextQuestionBtn").on("click", function(event) {
    $("#form").html(templateQuestion);
  });
}

function finalResultBtn() {
  if (questionNumber === dataSet.length) {
    console.log(`final btn`);
    $(".nextQuestionBtn").on("click", function(event) {
      $(".nextQuestionBtn").html(`Final Results`);
    });
  }
}
function startOver() {
  $("#form").on("click", ".startOverBtn", function(event) {
    questionNumber = 0;
    $(".questionNum").html(`${questionNumber}/10`);
    wrongAnswers = 0;
    $(".wrongAnswers").html(`: ${wrongAnswers}`);
    rightAnswers = 0;
    $(".rightAnswers").html(`: ${rightAnswers}`);
    $("#form").html(`<section class="intro">
    <h1>How Well Do You Know
      <br/>World History?</h1>
    <h2>Find out by taking this quiz.</h2>
    <button id="startQuiz" class="btn">Begin</button>
  </section>
`);
    startQuiz();
  });
}

function finalResultsDisplay() {
  if (dataSet.length + 1 === questionNumber) {
    $("#form").html(
      `<h2>Thanks for taking this quiz!</h2><h3>You answered <span class="corAnswer">${rightAnswers} questions correctly</span> and <br /><span class="wrAnswer">${wrongAnswers} incorrectly</span></h3>
      <button class="btn startOverBtn">Start Over</button>`
    );
    questionNumber -= 1;
    $(".questionNum").html(`${questionNumber}/10`);
  }
}

function evaluateAnswer() {
  $("#form").on("click", ".nextQuestionBtn", function(event) {
    let inputAnswer = $("input[type=radio]:checked")
      .parent()
      .text()
      .trim();
    if (inputAnswer === dataSet[questionNumber - 1].correct) {
      incrementRightAnswers();
      $("#form").html(templateCorrectAnswer);
      incrementQuestionNumber();
      nextQuestion();
    } else {
      incrementWrongAnswers();
      $("#form").html(templateWrongAnswer);
      incrementQuestionNumber();
      nextQuestion();
    }

    finalResultBtn();
    finalResultsDisplay();
  });
}

$(function() {
  disableFormSubmission();
  startQuiz();
  evaluateAnswer();
  startOver();
  nextQuestion();
  finalResultBtn();
});
