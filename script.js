const questions = [
    {
        text: "1. 當你遇到一個新的挑戰時，你的第一反應是？",
        options: {
            A: "馬上跳進去、先試看看",
            B: "觀察環境、研究方式",
            C: "有點猶豫、怕搞砸、先準備一下",
            D: "先支援他人、在背後配合"
        }
    },
    {
        text: "2. 當朋友情緒低落時，你會？",
        options: {
            A: "鼓勵他們一起去做點事讓心情起來",
            B: "安靜陪伴、傾聽他們",
            C: "不知道怎麼幫、有點退縮",
            D: "主動照顧他們、提供支持"
        }
    },
    {
        text: "3. 面對人生思考時你會？",
        options: {
            A: "設定目標、立刻開始行動",
            B: "深入思考、寫筆記分析方向",
            C: "慢慢來、小心翼翼怕走錯",
            D: "跟人討論、互相支持一起前進"
        }
    },
    {
        text: "4. 面對挫折時你會？",
        options: {
            A: "立刻反彈、再戰一次",
            B: "反省失敗、找出問題原因",
            C: "感到沮喪退縮、怕再犯錯",
            D: "尋求或提供支持一起面對"
        }
    },
    {
        text: "5. 你最看重的是？",
        options: {
            A: "冒險精神與行動力",
            B: "思考深度、內在探索",
            C: "穩定、安全感",
            D: "溫暖、照顧別人的心"
        }
    }
];

let current = 0;
let answers = [];

function renderQuestion() {
    const q = questions[current];
    const container = document.getElementById("questionContainer");

    let html = `
        <div class="question"><strong>${q.text}</strong></div>
    `;

    for (let key in q.options) {
        html += `
            <label>
                <input type="radio" name="answer" value="${key}">
                ${key}. ${q.options[key]}
            </label>
        `;
    }

    container.innerHTML = html;
}

renderQuestion();

function nextQuestion() {
    const choice = document.querySelector('input[name="answer"]:checked');
    if (!choice) {
        alert("請選擇一個答案！");
        return;
    }

    answers.push(choice.value);

    current++;
    if (current < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("questionContainer").classList.add("hidden");
    document.getElementById("nextBtn").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    let score = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(a => score[a]++);

    const max = Math.max(score.A, score.B, score.C, score.D);
    let types = Object.keys(score).filter(k => score[k] === max);

    const typeMap = {
        A: "馬型",
        B: "男孩型",
        C: "狐狸型",
        D: "鼴鼠型"
    };

    const explanation = {
        "男孩型": `
你深具感受力，敏銳又真誠。  
你的敏感不是弱點，而是一種能感受世界的能力。  
你會懷疑自己是否夠好，但這份懷疑本身，代表你正在努力成為更好的人。  
你的心柔軟、溫暖，也讓人感到被理解。

🌟 建議  
- 你不需要完美才能被愛  
- 嘗試多肯定自己已經做得不錯  
- 允許自己脆弱，這是你的魅力之一`,

        "鼴鼠型": `
你溫柔、善良，是會讓氣氛變舒服的人。  
你不會用大道理壓人，而是用陪伴和小小的用心照亮別人的世界。  
許多人能挺過低潮，是因為有你在。

🌟 建議  
- 也記得照顧自己，不要只把力氣給別人  
- 就算累了想休息，你依然是可愛且值得被愛的`,

        "狐狸型": `
你敏銳、聰明，對世界有深度觀察。  
你看得很清楚，所以不會輕易把心交給別人。  
你害怕受傷，但真正接近你的人都知道：  
你是非常忠誠，非常值得信任的存在。

🌟 建議  
- 保護自己很好，但別把心關太緊  
- 不是每個人都會像從前那些人一樣傷害你  
- 試著給世界一點點機會，也是在給自己機會`,

        "馬型": `
你有強大的承擔力，是會陪著大家往前走的人。  
你會先問「你還好嗎？」而不是「我還好嗎？」  
你給人安全感，也會在混亂中穩住情況。

🌟 建議  
- 你不需要永遠都那麼堅強  
- 有時候停下來、示弱，也是一種勇敢  
- 你值得被依靠，不只是一個讓人依靠的人`
    };

    /* 組裝結果文字 */
    let resultText = "";

    if (types.length === 1) {
        const t = typeMap[types[0]];
        resultText = `你是【${t}】\n\n${explanation[t]}`;
    } else {
        const mix = types.map(t => typeMap[t]).join("＋");
        resultText = `你是【混合型：${mix}】\n\n${mix.split("＋").map(t => explanation[t]).join("\n\n")}`;
    }

    document.getElementById("resultText").innerText = resultText;

    /* 雷達圖 */
    new Chart(document.getElementById("radarChart"), {
        type: "radar",
        data: {
            labels: ["馬(A)", "男孩(B)", "狐狸(C)", "鼴鼠(D)"],
            datasets: [{
                label: "你的特質分佈",
                data: [score.A, score.B, score.C, score.D],
                fill: true
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    });
}
