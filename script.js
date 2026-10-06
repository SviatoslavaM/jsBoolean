// Навчальний тренажер операторів порівняння.
// Оператор уже заданий у кожному виразі.
// Учень прогнозує тільки результат: true або false.

const tasks = [
  {
    expression: '17 === 17',
    value: true,
    explanation: 'Обидва значення — число 17, і їхній тип однаковий: Number.'
  },
  {
    expression: '17 === "17"',
    value: false,
    explanation: 'Значення виглядають однаково, але типи різні: Number і String.'
  },
  {
    expression: '10 + 5 === 15',
    value: true,
    explanation: 'Спочатку 10 + 5 дає 15. Потім 15 строго порівнюється з 15.'
  },
  {
    expression: '20 / 2 > 8',
    value: true,
    explanation: '20 / 2 дорівнює 10. Число 10 більше за 8.'
  },
  {
    expression: '10 % 2 === 0',
    value: true,
    explanation: '10 ділиться на 2 без остачі, тому 10 % 2 дорівнює 0.'
  },
  {
    expression: '12 * 4 !== 48',
    value: false,
    explanation: '12 * 4 дорівнює 48. Вираз 48 !== 48 повертає false.'
  },
  {
    expression: '9 >= 9',
    value: true,
    explanation: 'Оператор >= означає «більше або дорівнює». 9 дорівнює 9.'
  },
  {
    expression: '5 + 5 === "10"',
    value: false,
    explanation: 'Ліворуч отримуємо Number 10, праворуч маємо String "10". Строга рівність повертає false.'
  },
  {
    expression: '25 < 30',
    value: true,
    explanation: '25 менше за 30.'
  },
  {
    expression: '18 <= 17',
    value: false,
    explanation: '18 не менше і не дорівнює 17.'
  }
];

const expression = document.getElementById('expression');
const checkBtn = document.getElementById('checkBtn');
const result = document.getElementById('result');
const resultWord = document.getElementById('resultWord');
const explanation = document.getElementById('explanation');
const roundBadge = document.getElementById('roundBadge');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const randomBtn = document.getElementById('randomBtn');
const paradoxOverlay = document.getElementById('paradoxOverlay');
const closeParadox = document.getElementById('closeParadox');
const voteButtons = document.querySelectorAll('.vote');

let taskIndex = 0;
let selectedVote = null;

function renderTask() {
  const task = tasks[taskIndex];

  expression.textContent = task.expression;
  roundBadge.textContent = `${taskIndex + 1} / ${tasks.length}`;

  selectedVote = null;
  result.hidden = true;
  result.className = 'result';
  voteButtons.forEach((button) => button.classList.remove('active'));
  checkBtn.disabled = true;
}

voteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedVote = button.dataset.vote === 'true';

    voteButtons.forEach((item) => {
      item.classList.toggle('active', item === button);
    });

    checkBtn.disabled = false;
  });
});

checkBtn.addEventListener('click', () => {
  const task = tasks[taskIndex];
  const predictionCorrect = selectedVote === task.value;

  result.hidden = false;
  result.className = `result ${task.value ? 'true' : 'false'}`;
  resultWord.textContent = task.value ? 'TRUE' : 'FALSE';

  explanation.textContent = predictionCorrect
    ? `${task.explanation} Твій прогноз правильний.`
    : `${task.explanation} Твій прогноз не збігся з результатом.`;
});

function goToTask(index) {
  taskIndex = (index + tasks.length) % tasks.length;
  renderTask();
}

nextBtn.addEventListener('click', () => {
  if (taskIndex === tasks.length - 1) {
    paradoxOverlay.hidden = false;
    return;
  }

  goToTask(taskIndex + 1);
});

prevBtn.addEventListener('click', () => goToTask(taskIndex - 1));

randomBtn.addEventListener('click', () => {
  let nextIndex = taskIndex;

  while (nextIndex === taskIndex && tasks.length > 1) {
    nextIndex = Math.floor(Math.random() * tasks.length);
  }

  goToTask(nextIndex);
});

closeParadox.addEventListener('click', () => {
  paradoxOverlay.style.display = 'none';
  goToTask(0);
});

renderTask();
