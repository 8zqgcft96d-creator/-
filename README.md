<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>心理測驗</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      max-width: 600px;
      margin: auto;
    }

    /* 進度條容器 */
    .progress-container {
      width: 100%;
      background: #eee;
      border-radius: 20px;
      height: 16px;
      margin-bottom: 20px;
      overflow: hidden;
    }

    /* 進度條本體 */
    .progress-bar {
      height: 100%;
      width: 0%;
      background: #7aa6ff;
      transition: width 0.3s;
    }

    /* 讓字體在不同裝置都保持清晰 */
    h2 {
      font-size: clamp(20px, 4vw, 28px);
    }
    label {
      font-size: clamp(16px, 3.5vw, 20px);
    }
    button {
      font-size: clamp(16px, 3.5vw, 20px);
      padding: 10px 16px;
      margin: 10px 5px;
      cursor: pointer;
      border-radius: 10px;
      border: none;
      background: #5b8bff;
      color: white;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    #result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 10px;
      background: #f4f4f4;
      font-size: clamp(16px, 3vw, 18px);
    }

  </style>
</head>
<body>
  <h2>心理測驗</h2>

  <!-- 進度條 -->
  <div class="progress-container">
    <div class="progress-bar" id="progressBar"></div>
  </div>

  <div id="quiz"></div>
  <button id="prevBtn" onclick="prevQuestion()" disabled>上一題</button>
  <button id="nextBtn" onclick="nextQuestion()">下一題</button>
  <div id="result"></div>

  <script>
    const questions = [
      {
        q: "1. 當你遇到一個新的挑戰/任務時，你的第一反應是：",
        options: ["(A) 馬上跳進去、先試看看", "(B) 先觀察環境、研究方式", "(C) 有點猶豫、怕搞砸、先做部分準備", "(D) 想幫助他人、在背後支撐或配合"]
      },
      {
        q: "2. 在人際互動中，當朋友需要幫忙/情緒低落時，你通常會：",
        options: ["(A) 鼓勵他們「快起來、一起去做點什麼」", "(B) 安靜陪伴、傾聽他們說出來
", "(C)有點退縮、不太確定怎麼幫比較好", "(D)主動提供支持、做好後勤或照顧他們
"]
      },
      {
        q: "3. 當你在思考人生或尋找方向時,你偏好哪種方式:",
        options: ["(A) 設定目標、立刻動手實踐", "(B)深入思考、寫筆記、分析可能性
", "(C)小心翼翼、怕錯、慢慢走", "(D) 和別人一起交流、互相支持"]
      },
      {
        q: "4. 面對失敗，你最可能的反應是：",
        options: ["(A) 立刻再挑戰一次", "(B) 自我反省", "(C)感到沮喪、有點退縮、怕再失敗", "(D) 尋求人際支持、共同面對"]
      },
      {
        q: "5. 你最看重自己的哪個特質？",
        options: ["(A) 冒險精神/行動力", "(B) 思考深度/内在探索", "(C) 謹慎/安全感", "(D) 溫暖與支持"]
      },
    ];

    const images = {
      A: "https://placekitten.com/300/300", // 馬型(示意，之後可替換成你的插畫)
      B: "https://placebear.com/300/300", // 狐狸型
      C: "https://placekitten.com/301/301", // 男孩型
      D: "https://placebear.com/301/301"  // 鼴鼠型
    };

    const results = {
      A: "你是【馬型】：你習慣扛責任、給人安全感、可靠，當別人也困難時，你會伸出援手。你不一定是最喧鬧的那一個，但你總是那個背後默默支撐的人。你內心的力量不是喧嘩的，而是安靜卻深遠的。你知道每個人都有自己的步調，因此擬遠一陪伴、等待、理解。你也能在最關鍵的時刻，用一句話、一個眼神、一個行動，讓身旁的人感到被支持。你是那種讓人覺得「因為你在，我就安心」的存在。",
      B: "你是【狐狸型】：沉著、敏銳、謹慎而深思，行動之前你願意先停下來，觀察常被人忽略的線索。你不喜歡衝動做決定，因為對你來說，每一步都值得思考、值得被理解。",
      C: "你是【男孩型】：帶著一種對世界的好奇與渴望，雖然不一定知道要往哪裡去，但依然願意踏出那一步。你相信「做了才會知道」，行動本身就是一種冒險，也是你探索者世界的方式。在新的任務前，你選擇先試試看；即使跌倒了，也會拍拍灰塵再站起來。你內心其實有一種純真與勇氣，讓你能以開放的眼睛看待生命各種可能。你的特質讓你在團隊中像是一股年輕的風，一種帶著希望往前推動的力量。",
      D: "你是【鼴鼠型】：溫柔的心，以及面對安全感的需要。你做事仔細、謹慎、不草率行動，因為你清楚一旦出錯，你會非常自責。你不是不願意前進，只是你希望自己準備好，在實際行動。你對人對事都十分體貼，也容易被小小善意感動。你內心溫暖，只是有時候會被自己的害怕或不安遮住光。你不喜歡和別人起衝突，也會盡力避免讓他失望。你是團隊中會安靜努力的人，即使沒人看見，你也願意默默把事情做到最好。"
    };

    let current = 0;
    let answers = [];

    function updateProgressBar() {
      const percent = ((current) / questions.length) * 100;
      document.getElementById("progressBar").style.width = percent + "%";
    }

    function renderQuestion() {
      updateProgressBar();

      const q = questions[current];
      let html = `<p>${q.q}</p>`;
      q.options.forEach((opt, i) => {
        html += `
          <label>
            <input type="radio" name="q${current}" value="${opt[1]}" 
            ${answers[current] === opt[1] ? "checked" : ""}> ${opt}
          </label><br>
        `;
      });

      document.getElementById("quiz").innerHTML = html;

      document.getElementById("prevBtn").disabled = current === 0;
      document.getElementById("nextBtn").innerText = current === questions.length - 1 ? "提交" : "下一題";
    }

    function nextQuestion() {
      const selected = document.querySelector(`input[name=q${current}]:checked`);
      if (!selected) return alert("請先選擇一個選項！");

      answers[current] = selected.value;

      if (current < questions.length - 1) {
        current++;
        renderQuestion();
      } else {
        finishTest();
      }
    }

    function prevQuestion() {
      if (current > 0) {
        current--;
        renderQuestion();
      }
    }

    function finishTest() {
      const count = { A: 0, B: 0, C: 0, D: 0 };
      answers.forEach(a => count[a]++);

      let final = "A";
      for (let k in count) if (count[k] > count[final]) final = k;

      document.getElementById("quiz").innerHTML = "";
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").style.display = "none";

      document.getElementById("result").innerHTML = `
        <img src="${images[final]}" style="width:180px;border-radius:15px;margin-bottom:15px;display:block;margin:auto;" />
        ` + `<h3>${results[final]}</h3>`;

      document.getElementById("progressBar").style.width = "100%";
    }

    renderQuestion();
  </script>
</body>
</html>
