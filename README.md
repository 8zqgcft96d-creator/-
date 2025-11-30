const questions = [
    {
        q: "1. 遇到新挑戰時，你的第一反應是：",
        options: {
            A: { type: "A", text: "馬上跳進去、先試看看" },
            B: { type: "B", text: "先觀察環境、研究方式" },
            C: { type: "C", text: "有點猶豫、怕搞砸" },
            D: { type: "D", text: "幫助他人、在背後支撐" }
        }
    },
    {
        q: "2. 當朋友需要幫忙時，你會：",
        options: {
            A: { type: "A", text: "鼓勵他們「快起來」" },
            B: { type: "B", text: "安靜陪伴、傾聽" },
            C: { type: "C", text: "退縮、不知如何幫忙" },
            D: { type: "D", text: "提供實質支援" }
        }
    },
    {
        q: "3. 思考人生方向時，你會：",
        options: {
            A: { type: "A", text: "設定目標立即行動" },
            B: { type: "B", text: "深入分析、寫筆記" },
            C: { type: "C", text: "小心前進、避免犯錯" },
            D: { type: "D", text: "與他人交流、互相支持" }
        }
    },
    {
        q: "4. 面對挫折時，你會：",
        options: {
            A: { type: "A", text: "快速反彈、再挑戰" },
            B: { type: "B", text: "反思學到的教訓" },
            C: { type: "C", text: "感到沮喪、害怕再錯" },
            D: { type: "D", text: "尋求人際支持" }
        }
    },
    {
        q: "5. 你最看重的個人特質：",
        options: {
            A: { type: "A", text: "冒險精神 / 行動力" },
            B: { type: "B", text: "思考深度 / 探索" },
            C: { type: "C", text: "謹慎 / 安全感" },
            D: { type: "D", text: "溫暖 / 支持他人" }
        }
    }
];

// 分數累積
let score = { A: 0, B: 0, C: 0, D: 0 };
let current = 0;

// DOM
const quizBox = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const resultImg = document.getElementById("result-img");

// 初始化
loadQuestion();

// 顯示題目
function loadQuestion() {
    const q = questions[current];
    questionText.textContent = q.q;

    optionsDiv.innerHTML = "";
    Object.values(q.options).forEach(opt => {
        let btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => selectAnswer(opt.type);
        optionsDiv.appendChild(btn);
    });
}

// 作答
let selected = null;
function selectAnswer(type) {
    selected = type;
}

// 下一題
nextBtn.onclick = () => {
    if (!selected) {
        alert("請先選擇一個選項！");
        return;
    }

    score[selected]++;
    selected = null;
    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

// 顯示結果
function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    // 計算最高類型
    const maxType = Object.keys(score).reduce((a, b) =>
        score[a] > score[b] ? a : b
    );

    const descriptions = {
        A: "你是行動派！喜歡直接挑戰、勇於嘗試。",
        B: "你是思考型！深度分析、穩健前進。",
        C: "你是謹慎型！需要安全感、步步為營。",
        D: "你是支持型！溫暖可靠、重視連結。"
    };

    const images = {
        A: "img/action.png",
        B: "img/think.png",
        C: "img/careful.png",
        D: "img/support.png"
    };

    resultImg.src = images[maxType];
    resultText.textContent = descriptions[maxType];

    drawRadar();
}

// 雷達圖
function drawRadar() {
    new Chart(document.getElementById("radarChart"), {
        type: "radar",
        data: {
            labels: ["行動(A)", "思考(B)", "謹慎(C)", "支持(D)"],
            datasets: [{
                data: [score.A, score.B, score.C, score.D],
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    });
}
