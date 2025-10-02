// ===============================
// 初期設定
// ===============================

// 制限時間（秒）
let time = 120;

// 問題データ（easyは3問固定）
const easyProblems = [
  { img: 'img/easy_01.png', answer: ['クイズ'] },
  { img: 'img/easy_02.png', answer: ['さくら'] },
  { img: 'img/easy_03.png', answer: ['からくり'] }
];

// 出題順（easyは3問そのまま）
const quizSet = [...easyProblems];

// 現在の問題番号
let current = 0;

// DOM要素取得
const quizImg = document.querySelector('.quiz');
const marubatuImg = document.querySelector('.marubatu');
const formInput = document.querySelector('.form');
const answerBtn = document.querySelector('.answer');
const clockImg = document.querySelector('.clock');
const timerText = document.getElementById('timer');

// 初期値セット
quizImg.src = quizSet[current].img;
marubatuImg.style.display = 'none';
timerText.innerText = time;

// ===============================
// タイマー処理
// ===============================
const timer = setInterval(() => {
  time--;
  timerText.innerText = time;

  if (time <= 0) {
    clearInterval(timer);
    window.location.href = 'gameover-easy.html'; // easy用に変更
  }
}, 1000);

// ===============================
// 答え判定処理
// ===============================
answerBtn.addEventListener('click', () => {
  const inputValue = formInput.value.trim();

  if (quizSet[current].answer.includes(inputValue)) {
    // 正解処理
    marubatuImg.src = 'img/maru.png';
    marubatuImg.style.display = 'block';

    setTimeout(() => {
      marubatuImg.style.display = 'none';
      current++;

      if (current < quizSet.length) {
        // 次の問題へ
        quizImg.src = quizSet[current].img;
        formInput.value = '';
      } else {
        // 全問正解 → ゲームクリア
        clearInterval(timer);
        window.location.href = 'gameclear-easy.html'; // easy用に変更
      }
    }, 1000);
  } else {
    // 不正解処理
    marubatuImg.src = 'img/batu.png';
    marubatuImg.style.display = 'block';

    setTimeout(() => {
      marubatuImg.style.display = 'none';
    }, 1000);
  }
});
