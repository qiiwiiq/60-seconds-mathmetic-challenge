const screens = document.querySelectorAll('.screen');
const gamePage = document.getElementById('game-page');
const start_btn = document.getElementById('start-btn');
const restart_btn = document.getElementById('restart-btn');
const timeEl = document.getElementById('time');
const currentScoreEl = document.getElementById('current-score');
const finalScoreEl = document.getElementById('final-score');

const firstNum = document.getElementById('first-num');
const secondNum = document.getElementById('second-num');
const operator = document.getElementById('operator');
const userInput = document.getElementById('user-input');

const operators = ['+', '−', '×', '÷'];

let gameStart = false;
let seconds = 59;
let score = 0;

let correctAns = 0;

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
    num2 = createNum();
    correctAns = num1 * num2;
  } else if (oper === '−') {
    let nums = [createNum(), createNum()];
    num1 = Math.max(...nums);
    num2 = Math.min(...nums);
    correctAns = num1 - num2;
  } else if (oper === '÷') {
    num2 = createNum();
    num1 = num2 * Math.floor(Math.random() * 10);
    correctAns = num1 / num2;
  } else {
    num1 = createNum();
    num2 = createNum();
  }

  firstNum.innerText = num1;
  secondNum.innerText = num2;
  operator.innerText = oper;
}

function createNum() {
  let num;
  if (seconds >= 41) {
    num = getRandom(0, 9);
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
  console.log('userAns', +userInput.value);
  console.log('correctAns', correctAns);
  let userAns = +userInput.value;
  if (userAns === correctAns) {
    if (seconds >=21) score += 1;
    else score += 5;
  } else {
    if (score > 0) score -= 1;
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
}

function showResult() {
  gamePage.classList.add('up');
  finalScoreEl.innerText = score;
}

