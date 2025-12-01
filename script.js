<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>五題心理學測驗 + 雷達圖分析</title>
  <style>
    :root{ --bg:#f7f8fb; --card:#fff; --accent:#4f46e5; --muted:#6b7280 }
    body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans TC',"Helvetica Neue",Arial; background:var(--bg); margin:0; padding:20px; color:#111}
    .container{max-width:900px;margin:20px auto}
    .card{background:var(--card);padding:18px;border-radius:12px;box-shadow:0 6px 18px rgba(15,23,42,0.06)}
    h1{margin:0 0 8px;font-size:20px}
    p.lead{margin:0 0 16px;color:var(--muted)}
    .q{margin-bottom:12px}
    label{display:block;margin-bottom:8px;font-weight:600}
    .options{display:flex;gap:8px}
    .options button{flex:1;padding:10px;border-radius:8px;border:1px solid #e6e9ef;background:#fff;cursor:pointer}
    .options button.selected{background:var(--accent);color:#fff;border-color:transparent}
    .btn-row{display:flex;gap:8px;margin-top:12px}
    button.primary{background:var(--accent);color:#fff;padding:10px 14px;border-radius:8px;border:0;cursor:pointer}
    button.ghost{background:transparent;border:1px solid #e6e9ef;padding:10px;border-radius:8px;cursor:pointer}
    canvas{max-width:100%;}
    .result-meta{margin-top:12px;color:var(--muted)}
    footer{margin-top:18px;text-align:center;color:var(--muted);font-size:13px}
    @media(min-width:700px){ .options button{padding:14px} }
  </style>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <div class="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
    <h2 class="text-2xl font-bold text-center mb-4">五題心理學測驗</h2>

    <!-- 問題容器 -->
    <div id="quiz-container"></div>

    <!-- 導覽按鈕 -->
    <div class="flex justify-between mt-6">
      <button id="prevBtn" class="px-4 py-2 bg-gray-300 rounded hidden">上一題</button>
      <button id="nextBtn" class="px-4 py-2 bg-blue-500 text-white rounded">下一題</button>
    </div>

    <!-- 結果區 -->
    <div id="result" class="hidden mt-6"></div>
  </div>

<script>
const questions = [
  { q: "當你第一次見到某人時，什麼會讓你最先注意到他？", options: ["A. 行為舉止", "B. 言談內容", "C. 外貌形象", "D. 氣質氛圍"] },
  { q: "如果你要表達某件重要的事情，你通常會選擇？", options: ["A. 先想清楚再說", "B. 直接說出口", "C. 透過文字表達", "D. 看對方狀態再決定"] },
  { q: "面對壓力時你最可能的反應是？", options: ["A. 找人討論解決方法", "B. 自己先把情緒消化", "C. 做其他事情轉移注意", "D. 假裝沒事並撐過去"] },
  { q: "在團體中你通常扮演的角色是？", options: ["A. 活動發起者", "B. 氣氛帶動者", "C. 聆聽者與支持者", "D. 觀察者"] },
  { q: "如果給你一天完全自由的時間，你會選擇？", options: ["A. 外出探索新地點", "B. 和朋友聚會", "C. 在家放鬆休息", "D. 做一些能充電的事如閱讀/散步"] }
];

const resultsText = {
  A: "### 🐎 你是：馬型人格...（此處省略全文，保留原內容）",
  B: "### 🦊 你是：狐狸型人格...",
  C: "### 👦 你是：男孩型人格...",
  D: "### 🐾 你是：鼴鼠型人格..."
};

let current = 0;
let answers = [];

function renderQuestion() {
  const q = questions[current];
  const container = document.getElementById('quiz-container');
  
  container.innerHTML = `
    <div>
      <h3 class="text-xl font-semibold mb-4">第 ${current+1} 題：${q.q}</h3>
      <div class="space-y-3">
        ${q.options.map((opt,i)=>`
          <label class='block p-3 border rounded cursor-pointer hover:bg-blue-50'>
            <input type='radio' name='q${current}' value='${opt[0]}' class='mr-2'>${opt}
          </label>`).join('')}
      </div>
    </div>`;

  document.getElementById("prevBtn").classList.toggle("hidden", current === 0);
  document.getElementById("nextBtn").innerText = current === questions.length - 1 ? "提交" : "下一題";
}

function calculateResult() {
  const count = {A:0,B:0,C:0,D:0};
  answers.forEach(a => count[a]++);

  let final = Object.keys(count).sort((a,b)=>count[b]-count[a])[0];

  document.getElementById('result').innerHTML = `
    <h3 class='text-2xl font-bold mb-4'>你的結果</h3>
    <p class='whitespace-pre-line'>${resultsText[final]}</p>`;

  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('prevBtn').classList.add('hidden');
  document.getElementById('nextBtn').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
}

// 下一題按鈕
nextBtn.onclick = () => {
  const selected = document.querySelector(`input[name='q${current}']:checked`);
  if (!selected) return alert("請先選擇一個選項");

  answers[current] = selected.value;

  if (current === questions.length - 1) return calculateResult();

  current++;
  renderQuestion();
};

// 上一題按鈕
prevBtn.onclick = () => {
  current--;
  renderQuestion();
};

renderQuestion();
</script>
</body>
</html>

