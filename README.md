<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>心理測驗 — 五題雷達圖分析</title>
  <style>
    :root{
      --bg:#f6f7fb;
      --card:#ffffff;
      --muted:#7b7f89;
      --accent:#6c5ce7;
      --glass: rgba(255,255,255,0.6);
    }
    html,body{height:100%;}
    body{
      margin:0;font-family: "Noto Sans", "Segoe UI", Roboto, Arial, sans-serif;
      background:linear-gradient(180deg,#eef2ff 0%,var(--bg) 100%);
      color:#222;
      display:flex;align-items:flex-start;justify-content:center;
      padding:28px;
    }
    .container{
      width:100%;max-width:980px;
      box-shadow:0 10px 30px rgba(20,20,50,0.08);
      border-radius:16px;
      background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,255,0.95));
      padding:28px;
    }
    h1{margin:0 0 8px;font-size:20px}
    p.lead{margin:0 0 18px;color:var(--muted)}
    .grid{
      display:grid;grid-template-columns:1fr 380px;gap:18px;
    }

    /* quiz column */
    .quiz{
      display:flex;flex-direction:column;gap:12px;
    }
    .card{
      background:var(--card);
      border-radius:12px;
      padding:14px;
      box-shadow:0 6px 18px rgba(20,20,50,0.04);
      border:1px solid rgba(16,24,40,0.03);
    }
    .q-title{font-weight:600;margin-bottom:8px}
    .options{display:flex;gap:8px;flex-wrap:wrap}
    .option{
      flex:1 1 48%;
      min-width:140px;
      background:linear-gradient(180deg,#fff,#fbfbff);
      border-radius:10px;padding:10px;border:1px solid rgba(16,24,40,0.05);
      cursor:pointer;user-select:none;
      display:flex;align-items:center;gap:10px;
    }
    .option input{transform:scale(1.05)}
    .option-label{font-size:14px;color:#111}
    .small{font-size:13px;color:var(--muted)}
    .controls{display:flex;gap:8px;margin-top:8px;align-items:center}
    button.primary{
      background:var(--accent);color:#fff;border:none;padding:10px 14px;border-radius:10px;
      cursor:pointer;font-weight:600;
      box-shadow:0 6px 18px rgba(108,92,231,0.15);
    }
    button.ghost{background:transparent;border:1px solid rgba(16,24,40,0.06);padding:10px 12px;border-radius:10px;cursor:pointer}
    .footer-note{margin-top:12px;color:var(--muted);font-size:13px}

    /* right column - results */
    .result-area{display:flex;flex-direction:column;gap:12px}
    .canvas-wrap{background:linear-gradient(180deg,#fff,#fbfbff);border-radius:12px;padding:12px;display:flex;flex-direction:column;align-items:center;justify-content:center}
    #resultText{white-space:pre-wrap}
    .download-row{display:flex;gap:8px;align-items:center}
    .badge{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(108,92,231,0.08);color:var(--accent);font-weight:700;font-size:13px}

    /* responsive */
    @media (max-width:960px){
      .grid{grid-template-columns:1fr; }
      .canvas-wrap{order:2}
    }
  </style>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body>
  <div class="container" role="main">
    <h1>五題心理測驗（雷達圖分析）</h1>
    <p class="lead">請從每題中選出最符合你的答案，全部作答後按「產生分析」。</p>

    <div class="grid">
      <div class="quiz" aria-live="polite">

        <!-- Question cards -->
        <form id="quizForm">
          <!-- Q1 -->
          <div class="card">
            <div class="q-title">1. 當你遇到一個新的挑戰/任務時，你的第一反應是：</div>
            <div class="options">
              <label class="option"><input type="radio" name="q1" value="A"><span class="option-label">A. 馬上跳進去、先試看看</span></label>
              <label class="option"><input type="radio" name="q1" value="B"><span class="option-label">B. 先觀察環境、研究方式</span></label>
              <label class="option"><input type="radio" name="q1" value="C"><span class="option-label">C. 有點猶豫、怕搞砸、先做部分準備</span></label>
              <label class="option"><input type="radio" name="q1" value="D"><span class="option-label">D. 想幫助他人、在背後支撐或配合</span></label>
            </div>
            <div class="small">選一項</div>
          </div>

          <!-- Q2 -->
          <div class="card">
            <div class="q-title">2. 在人際互動中，當朋友需要幫忙 / 情緒低落時，你通常會：</div>
            <div class="options">
              <label class="option"><input type="radio" name="q2" value="A"><span class="option-label">A. 鼓勵他們「快起來、一起去做點什麼」</span></label>
              <label class="option"><input type="radio" name="q2" value="B"><span class="option-label">B. 安靜陪伴、傾聽他們說出來</span></label>
              <label class="option"><input type="radio" name="q2" value="C"><span class="option-label">C. 有點退縮、不太確定怎麼幫比較好</span></label>
              <label class="option"><input type="radio" name="q2" value="D"><span class="option-label">D. 主動提供支持、做好後勤或照顧他們</span></label>
            </div>
            <div class="small">選一項</div>
          </div>

          <!-- Q3 -->
          <div class="card">
            <div class="q-title">3. 當你在思考人生或尋找方向時，你偏好哪種方式：</div>
            <div class="options">
              <label class="option"><input type="radio" name="q3" value="A"><span class="option-label">A. 設定目標、立刻動手實踐</span></label>
              <label class="option"><input type="radio" name="q3" value="B"><span class="option-label">B. 深入思考、寫筆記、分析可能性</span></label>
              <label class="option"><input type="radio" name="q3" value="C"><span class="option-label">C. 小心翼翼、怕錯、慢慢走</span></label>
              <label class="option"><input type="radio" name="q3" value="D"><span class="option-label">D. 和他人分享、互相支持、一步一腳印</span></label>
            </div>
            <div class="small">選一項</div>
          </div>

          <!-- Q4 -->
          <div class="card">
            <div class="q-title">4. 面對失敗或挫折，你最可能的反應是：</div>
            <div class="options">
              <label class="option"><input type="radio" name="q4" value="A"><span class="option-label">A. 立刻反彈、再戰一次</span></label>
              <label class="option"><input type="radio" name="q4" value="B"><span class="option-label">B. 自我反省、思考教訓</span></label>
              <label class="option"><input type="radio" name="q4" value="C"><span class="option-label">C. 感到沮喪、有點退縮、怕再犯錯</span></label>
              <label class="option"><input type="radio" name="q4" value="D"><span class="option-label">D. 尋求或提供人際支持、共同面對</span></label>
            </div>
            <div class="small">選一項</div>
          </div>

          <!-- Q5 -->
          <div class="card">
            <div class="q-title">5. 如果要選擇你最看重的特質，是哪一項：</div>
            <div class="options">
              <label class="option"><input type="radio" name="q5" value="A"><span class="option-label">A. 冒險精神 / 行動力</span></label>
              <label class="option"><input type="radio" name="q5" value="B"><span class="option-label">B. 思考深度 / 內在探索</span></label>
              <label class="option"><input type="radio" name="q5" value="C"><span class="option-label">C. 謹慎 / 安全感</span></label>
              <label class="option"><input type="radio" name="q5" value="D"><span class="option-label">D. 溫暖 / 支持他人</span></label>
            </div>
            <div class="small">選一項</div>
          </div>

          <div class="card controls" style="justify-content:space-between;align-items:center;">
            <div>
              <button type="button" id="submitBtn" class="primary">產生分析</button>
              <button type="button" id="resetBtn" class="ghost">重填</button>
            </div>
            <div class="small">結果會顯示在右側區塊，並產生可以下載的雷達圖。</div>
          </div>
        </form>

        <div class="footer-note">小提醒：此測驗為趣味與自我探索用途，不等同專業心理診斷。</div>
      </div>

      <!-- Result area -->
      <div class="result-area">
        <div class="card canvas-wrap">
          <div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div>
              <div class="badge">雷達圖結果</div>
            </div>
            <div class="small">分數範圍：0 - 5</div>
          </div>
          <canvas id="radarChart" width="340" height="300" aria-label="雷達圖結果" role="img"></canvas>
          <div class="download-row" style="margin-top:10px">
            <button id="downloadChart" class="primary" style="padding:8px 12px">下載雷達圖 (PNG)</button>
            <button id="downloadText" class="ghost">下載結果文字 (TXT)</button>
          </div>
        </div>

        <div class="card">
          <h3 style="margin:0 0 6px">分析結果</h3>
          <div id="resultSummary" class="small" style="margin-bottom:8px">尚未作答或尚未產生分析，按右方「產生分析」。</div>
          <div id="resultText" style="color:#222"></div>
        </div>
      </div>
    </div>
  </div>

<script>
/*
  對應規則：
  A -> 馬型 (Horse)
  B -> 男孩型 (Boy)
  C -> 狐狸型 (Fox)
  D -> 鼴鼠型 (Mole)

  每題選一項，計數後產生雷達圖與文字結果（最高分型顯示完整描述）。
*/

const mapping = {
  A: 'Horse',
  B: 'Boy',
  C: 'Fox',
  D: 'Mole'
};

// 顯示文字內容（使用者提供的原始描述）
const descriptions = {
  Boy: {
    title: '男孩型',
    short: '關於自己，你還在學著怎麼相信。',
    text:
`關於自己，你還在學著怎麼相信。

你的樣子
你有很強的感受力，對世界充滿好奇，也對自己充滿好奇，也對自己充滿問號。你常常會想：我到底夠不夠好？我能不能被喜歡、被理解？這種敏感，讓你更容易看見別人的情緒，也更容易忽略自己的需要。

你給別人的感覺
在別人眼中，你像一個正在長大的孩子，真誠、直接、很真實。你會為了關係不斷自我檢討，只想讓自己變得更好。很多人因為你願意說出的脆弱，而覺得被陪伴。

給你的提醒
你不需要完美才值得被愛。試著多看看自己已經做得不錯的地方，允許「還在路上」的自己存在。當你願意對自己溫柔一點，你就會發現：原來你早就已經是某個人心裡，很重要的那個存在。`
  },
  Mole: {
    title: '鼴鼠型',
    text:
`你的樣子
你很重視「舒服感」—食物、氣氛、陪伴、小確幸。你知道人不可能每天都很強，所以你特別會照顧情緒、照顧氣氛。你會為別人準備點心、傳訊息問候、講些好笑的話，讓沈重變得沒那麼可怕。

你給人的感覺
你像一個會做甜點的好朋友，可能不會給一大串理性分析，但總會讓人覺得：「跟你在一起就不那麼難過了吧。」很多人其實靠你的存在，才撐過了一些很黑暗的日子。

給你的提醒
在照顧別人之前，也別忘了一句：「那我自己呢？」你值得把同樣的溫柔，留一份給自己。偶爾不用那麼逗趣、那麼體貼，也沒關係——就算今天只想躺著，你一樣是很可愛的你。`
  },
  Fox: {
    title: '狐狸型',
    text:
`你看得很清楚，只是習慣把心收好。

你的樣子
你敏銳、細心，對人的真心假意、情況的危險程度，有一種直覺式的判斷。你不會輕易把自己交出去，因為你知道受傷有多痛，所以寧可慢一點、在確定一點。

你給人的感覺
一開始，你可能讓人覺得有距離、有點冷，但真正走進你心裡的人都知道：你其實非常忠誠、非常有義氣。你不會亂承諾，一旦說出口，就會盡力做到。

給你的提醒
保持界線是好事，但也把自己關得太緊。不是每個人都會像過去那些人一樣傷害你。你可以試著多給世界一點點機會——不是為了別人，而是為了讓自己有機會好好對待。`
  },
  Horse: {
    title: '你是【馬型】',
    text:
`你習慣當那個「載大家走過去」的人。

你的樣子
你很習慣扛責任、撐住場面。很多時候，你自己其實也會累、也會徬徨，可是你會先問：「大家還好嗎？」你是那種會陪著別人走一段的人，願意當那匹穩穩向前的馬。

你給人的感覺
你讓人有安全感。只要你在，事情好像就能慢慢被處理好。很多人會在不知不覺中依賴你、把難題丟給你，因為你看起來總是知道該怎麼做。

給你的提醒
你不是永遠都要那麼堅強。當你覺得很重的時候，也可以停下來，把一些重量放回去，或者請別人幫忙扛一點。有時候，真正的力量不是一直往前衝，而是敢在需要的時候說：「我也想被照顧。」`
  }
};

// 初始化 Chart.js 雷達圖
let radarChart = null;
const ctx = document.getElementById('radarChart').getContext('2d');
function createEmptyChart(){
  if (radarChart) radarChart.destroy();
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['男孩型', '鼴鼠型', '狐狸型', '馬型'],
      datasets: [{
        label: '你的分數',
        data: [0,0,0,0],
        fill: true,
        tension: 0.3,
        pointRadius:6,
        backgroundColor: 'rgba(108,92,231,0.12)',
        borderColor: 'rgba(108,92,231,0.95)',
        borderWidth: 2,
      }]
    },
    options: {
      scales: {
        r: {
          min:0,
          max:5,
          ticks: { stepSize:1, showLabelBackdrop:true },
          pointLabels: { font: {size:12} }
        }
      },
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{
          label: ctx => `${ctx.formattedValue} 分`
        }}
      },
      responsive:true,
      maintainAspectRatio:false
    }
  });
}
createEmptyChart();

// 取得表單值並計分
function gatherAnswers(){
  const form = document.getElementById('quizForm');
  const data = new FormData(form);
  const answers = [];
  for (let i=1;i<=5;i++){
    const val = data.get('q'+i);
    answers.push(val || null);
  }
  return answers;
}

function computeScores(answers){
  const scores = { Boy:0, Mole:0, Fox:0, Horse:0 };
  answers.forEach(a => {
    if (!a) return;
    const type = mapping[a];
    if (type) scores[type] += 1;
  });
  return scores;
}

function displayResult(scores){
  // update chart
  const values = [scores.Boy, scores.Mole, scores.Fox, scores.Horse];
  radarChart.data.datasets[0].data = values;
  radarChart.update();

  // find top
  const entries = Object.entries(scores);
  entries.sort((a,b)=> b[1]-a[1]);
  const topScore = entries[0][1];
  // If tie, pick first in order Boy->Mole->Fox->Horse by our sort tie-breaker
  const topTypes = entries.filter(e => e[1] === topScore).map(e=>e[0]);

  // prepare result text: show top type(s) and detailed content for each top if multiple
  const summaryDiv = document.getElementById('resultSummary');
  const textDiv = document.getElementById('resultText');

  if (topScore === 0){
    summaryDiv.textContent = '尚未作答，請完成所有題目再按「產生分析」。';
    textDiv.textContent = '';
    return;
  }

  const topNames = topTypes.map(t => descriptions[t].title).join(' / ');
  summaryDiv.textContent = `主要型態：${topNames}（最高分 ${topScore}）`;

  // Build detailed text: show full description of the highest-scoring type.
  // If multiple tied, show each.
  let full = '';
  topTypes.forEach(tp => {
    const desc = descriptions[tp];
    if (!desc) return;
    full += `=== ${desc.title} ===\n`;
    if (desc.short) full += desc.short + '\n\n';
    full += desc.text + '\n\n';
  });

  // Also show breakdown table
  full += '---\n分數細項（0-5）：\n';
  full += `男孩型: ${scores.Boy}\n`;
  full += `鼴鼠型: ${scores.Mole}\n`;
  full += `狐狸型: ${scores.Fox}\n`;
  full += `馬型: ${scores.Horse}\n`;

  textDiv.textContent = full;
}

// 下載雷達圖 (PNG)
document.getElementById('downloadChart').addEventListener('click', ()=>{
  const link = document.createElement('a');
  link.download = 'radar_result.png';
  link.href = radarChart.toBase64Image();
  link.click();
});

// 下載文字結果
document.getElementById('downloadText').addEventListener('click', ()=>{
  const text = document.getElementById('resultText').textContent || '尚未產生結果';
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'result.txt'; a.click();
  URL.revokeObjectURL(url);
});

// submit
document.getElementById('submitBtn').addEventListener('click', ()=>{
  const answers = gatherAnswers();
  // check completeness
  const unanswered = answers.reduce((acc,v,i)=> (v?acc:acc.concat(i+1)), []);
  if (unanswered.length > 0){
    // allow partial but warn: per需求你說作答完再分析 — 我們提醒使用者未完成
    if (!confirm('有題目尚未作答（第 ' + unanswered.join(',') + ' 題）。是否仍然進行分析？')) {
      return;
    }
  }
  const scores = computeScores(answers);
  displayResult(scores);
});

// reset
document.getElementById('resetBtn').addEventListener('click', ()=>{
  document.getElementById('quizForm').reset();
  createEmptyChart();
  document.getElementById('resultSummary').textContent = '尚未作答或尚未產生分析，按右方「產生分析」。';
  document.getElementById('resultText').textContent = '';
});
</script>
</body>
</html>
