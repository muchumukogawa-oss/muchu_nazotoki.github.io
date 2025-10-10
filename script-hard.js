// ===============================
// 初期設定
// ===============================

// 制限時間（秒）
let time = 120;

// 問題データ
const hardProblems = [
  { img: 'img/hard_01.png', answer: ['石川'] },
  { img: 'img/hard_02.png', answer: ['CARD', 'card'] },
  { img: 'img/hard_03.png', answer: ['砂時計'] },
  { img: 'img/hard_04.png', answer: ['どりる', 'ドリル'] },
  { img: 'img/hard_05.png', answer: ['はんたい', '反対'] },
  { img: 'img/hard_06.png', answer: ['make', 'MAKE'] },
  { img: 'img/hard_07.png', answer: ['とるそー', 'トルソー'] },
  { img: 'img/hard_08.png', answer: ['店'] },
  { img: 'img/hard_09.png', answer: ['巳'] },
  { img: 'img/hard_10.png', answer: ['文化祭'] },
  { img: 'img/hard_11.png', answer: ['D'] },
  { img: 'img/hard_12.png', answer: ['月'] }
];

const teacherProblems = [
  { img: 'img/teacher_01.png', answer: ['ゾウ', 'ぞう', '像'] },
  { img: 'img/teacher_02.png', answer: ['4', 'フォー'] },
  { img: 'img/teacher_03.png', answer: ['卓球'] },
  { img: 'img/teacher_04.png', answer: ['1023'] },
  { img: 'img/teacher_05.png', answer: ['コンポーネント'] },
  { img: 'img/teacher_06.png', answer: ['サイネージ', 'さいねーじ'] },
  { img: 'img/teacher_07.png', answer: ['クラスター'] },
  { img: 'img/teacher_08.png', answer: ['こうぞうか', '構造化', 'KOUZOUKA'] },
  { img: 'img/teacher_09.png', answer: ['かわいいだけじゃだめですか？'] }
];

// ランダム取得用関数（取り出して削除）
function pickRandom(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr.splice(idx, 1)[0]; // spliceで取り出し＆削除
}

// 出題順を決定（3問固定）
const hardCopy = [...hardProblems]; // 元配列を壊さないようコピー
const quizSet = [
  pickRandom(hardCopy), // 1問目 hard
  pickRandom([...teacherProblems]), // 2問目 teacher
  pickRandom(hardCopy) // 3問目 hard
];

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
    window.location.href = 'gameover-hard.html';
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
        // ▼ クリア日時を記録して保存
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const formatted = `${month}月${day}日 ${hour}時${minute}分`;

        localStorage.setItem('clearTime', formatted);
        window.location.href = 'gameclear-hard.html';
      }
    }, 1000);
  } else {
    // 不正解処理
    marubatuImg.src = 'img/batu.png';
    marubatuImg.style.display = 'block';
    formInput.value = ''; // 入力値を削除

    setTimeout(() => {
      marubatuImg.style.display = 'none';
    }, 1000);
  }
});

// ===============================
// ブラウザバック禁止
// ===============================
// 履歴を1つ追加して戻れないようにする
history.pushState(null, null, location.href);

// ブラウザの戻るボタン検知
window.addEventListener('popstate', function (e) {
  alert('ブラウザの戻るボタンは使用できません。');
  // 履歴を再度追加して戻れないようにする
  history.pushState(null, null, location.href);
});
