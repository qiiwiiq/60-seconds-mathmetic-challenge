const screens = document.querySelectorAll('.screen');
const paints = document.querySelectorAll('.paint');
const gamePage = document.getElementById('game-page');
const start_btn = document.getElementById('start-btn');
const restart_btn = document.getElementById('restart-btn');
const correct_icon = document.getElementById('ic-correct');
const wrong_icon = document.getElementById('ic-wrong');
const score_gain = document.getElementById('score-gain');
const timeEl = document.getElementById('time');
const currentScoreEl = document.getElementById('current-score');
const finalScoreEl = document.getElementById('final-score');
const finalResultEl = document.getElementById('final-result');

const firstNum = document.getElementById('first-num');
const secondNum = document.getElementById('second-num');
const operator = document.getElementById('operator');
const userInput = document.getElementById('user-input');

const operators = ['+', '−', '×', '÷'];

let gameStart = false;
let seconds = 59;
let score = 0;
let quizzes = 0;
let quiz_correct = 0;
let quiz_wrong = 0;

let correctAns = 0;

initGame();

function initGame() {
  const color = localStorage.getItem('bg-color');
  if (color) document.documentElement.style.setProperty('--main-color', color);
}

paints.forEach(paint => paint.addEventListener('click', (e) => {
  const color = e.target.dataset.color;
  document.documentElement.style.setProperty('--main-color', color);
  localStorage.setItem('bg-color', color);
}))

start_btn.addEventListener('click', () => {
  gameStart = true;
  screens[0].classList.add('up');
  startGame();
});

window.addEventListener('keydown', (event) => {
  if (gameStart && event.code === 'Enter') {
    checkAnswer();
    createQuiz();
    userInput.value = null;
  };
});

restart_btn.addEventListener('click', () => {
  window.location.reload();
});

function startGame() {
  createQuiz();
  setInterval(decreaseTime, 1000);
}

function decreaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `${m}:${s}`;
  if (seconds > 0) {
    seconds--;
  }

  if (seconds === 0) {
    gameStart = false;
    showResult();
  }
}

function createQuiz() {
  let num1, num2;
  let oper = operators[Math.floor(Math.random()*4)];
  if (oper === '+') {
    num1 = createNum();
    num2 = createNum();
    correctAns = num1 + num2;
  } else if (oper === '×') {
    num1 = createNum();
    num2 = getRandom(0, 9);
    correctAns = num1 * num2;
  } else if (oper === '−') {
    let nums = [createNum(), createNum()];
    num1 = Math.max(...nums);
    num2 = Math.min(...nums);
    correctAns = num1 - num2;
  } else if (oper === '÷') {
    num2 = createNum('noZero');
    num1 = num2 * Math.floor(Math.random() * 10);
    correctAns = num1 / num2;
  }

  firstNum.innerText = num1;
  secondNum.innerText = num2;
  operator.innerText = oper;
}

function createNum(rule) {
  let num;
  if (seconds >= 41) {
    if (rule === 'noZero') num = getRandom(1, 9);
    else num = getRandom(0, 9);
  } else if (seconds >=21) {
    num = getRandom(10, 99);
  } else {
    num = getRandom(100, 999);
  }
  
  return num;
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
};

function checkAnswer() {
  quizzes++;

  let userAns = +userInput.value;
  if (userAns === correctAns) {
    quiz_correct++;

    correct_icon.style.transform = 'scale(1)';
    setTimeout(() => {
      correct_icon.style.transform = 'scale(0)';
    }, 500)

    if (seconds >=21) {
      score += 1;
      score_gain.innerText = '+1';
    } else {
      score += 5;
      score_gain.innerText = '+5';
    }

  } else {
    quiz_wrong++;

    wrong_icon.style.transform = 'scale(1)';
    setTimeout(() => {
      wrong_icon.style.transform = 'scale(0)';
    }, 500)

    if (score > 0) {
      score -= 1;
      score_gain.innerText = '-1';
    }
    else score = 0;
  }

  let scoreText;
  if (score < 10) {
    scoreText = `00${score}`;
  } else if (score < 100) {
    scoreText = `0${score}`;
  } else {
    scoreText = `${score}`;
  }

  currentScoreEl.innerText = scoreText;
  score_gain.style.transform = 'scaleY(1)';
  setTimeout(() => {
    score_gain.style.transformOrigin = 'top';
    score_gain.style.transform = 'scaleY(0)';
  }, 500)
}

function showResult() {
  gamePage.classList.add('up');
  finalScoreEl.innerText = score;
  finalResultEl.innerHTML = `
    <div>You have answered ${quizzes} quizzes</div>
    <div>
      <i class="fas fa-check"></i> Answered correct: ${quiz_correct}
    </div>
    <div>
      <i class="fas fa-times"></i> Answered incorrect: ${quiz_wrong}
    </div>
  `
}

