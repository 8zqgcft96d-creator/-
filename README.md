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

  每題選一項，計數後產生雷達圖與文字結果。
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
    title: '你是【男孩型】',
    short: '關於自己，你還在學著怎麼相信。',
  },
  Mole: {
    title: '你是【鼴鼠型】',
    short: '你的溫柔，是世界很需要的安慰。',
  },
  Fox: {
    title: '你是【狐狸型】',
    short: '你看得很清楚，只是習慣把心收好。',
  },
  Horse: {
    title: '你是【馬型】',
    short: '你習慣當那個「載大家走過去」的人。',
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

// 完整解析
    const detail = {
        男孩:`你是【男孩型】：\n關於自己，你還在學著怎麼相信。`,

        鼴鼠:`你是【鼴鼠型】：\n你的溫柔，是世界很需要的安慰。`,

        狐狸:`你是【狐狸型】：\n你看得很清楚，只是習慣把心收好。`,

        馬:`你是【馬型】：\n你習慣當那個「載大家走過去」的人。`,
    };

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
