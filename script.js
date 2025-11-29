const questions = [
    { text: "1. 當你遇到一個新的挑戰時，你的第一反應是：",
      options: [
        { text: "（A） 馬上跳進去、先試看看", type: "馬" },
        { text: "（B） 先觀察環境、研究方式", type: "男孩" },
        { text: "（C） 有點猶豫、怕搞砸、先做部分準備", type: "狐狸" },
        { text: "（D） 幫助他人，在背後支撐或配合", type: "鼴鼠" }
      ]
    },
    { text: "2. 在朋友情緒低落時，你通常會：",
      options: [
        { text: "（A） 鼓勵他們「快起來、一起去做點什麼」", type: "馬" },
        { text: "（B） 安靜陪伴、傾聽他們説出來", type: "男孩" },
        { text: "（C） 不太確定怎麼幫比較好，會退縮", type: "狐狸" },
        { text: "（D） 主動照顧他們、給支持", type: "鼴鼠" }
      ]
    },
    { text: "3. 在思考人生方向時，你偏好：",
      options: [
        { text: "（A） 設定目標、立刻實踐", type: "馬" },
        { text: "（B） 深入思考、分析可能性", type: "男孩" },
        { text: "（C） 小心翼翼、怕錯、慢慢走", type: "狐狸" },
        { text: "（D） 與他人分享、互相支持", type: "鼴鼠" }
      ]
    },
    { text: "4. 面對失敗，你最可能的反應是：",
      options: [
        { text: "（A） 立刻反彈、再戰一次", type: "馬" },
        { text: "（B） 自我反省、思考教訓", type: "男孩" },
        { text: "（C） 沮喪、退縮、怕再犯錯", type: "狐狸" },
        { text: "（D） 尋求人際支持、一起面對", type: "鼴鼠" }
      ]
    },
    { text: "5. 你最看重的特質是：",
      options: [
        { text: "（A） 冒險精神／行動力", type: "馬" },
        { text: "（B） 思考深度／內在探索", type: "男孩" },
        { text: "（C） 謹慎／安全感", type: "狐狸" },
        { text: "（D） 溫暖／支持他人", type: "鼴鼠" }
      ]
    }
];

let index = 0;
let score = { 馬:0, 男孩:0, 狐狸:0, 鼴鼠:0 };

function loadQ() {
    const q = questions[index];
    document.getElementById("question").innerText = q.text;
    document.getElementById("options").innerHTML = q.options
        .map(o => `<button class="option" onclick="choose('${o.type}')">${o.text}</button>`)
        .join("");
}
loadQ();

function choose(type) {
    score[type]++;
    index++;
    if(index < questions.length) loadQ();
    else finish();
}

function finish() {
    document.getElementById("question-box").style.display = "none";
    document.getElementById("result").style.display = "block";

    const ctx = document.getElementById("radar").getContext("2d");
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ["馬","男孩","狐狸","鼴鼠"],
            datasets: [{
                label:"你的特質分佈",
                data:[score.馬, score.男孩, score.狐狸, score.鼴鼠],
                borderWidth:2,
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor:'rgba(54,162,235,1)'
            }]
        },
        options:{
            scales: { r:{ beginAtZero:true, min:0, max:5 } }
        }
    });

    // 下載圖表
    document.getElementById("downloadBtn").onclick = () => {
        const link = document.createElement('a');
        link.href = radarChart.toBase64Image();
        link.download = '心理測驗結果.png';
        link.click();
    }

    // 類型判定
    let entries = Object.entries(score);
    entries.sort((a,b)=>b[1]-a[1]);
    let top = entries.filter(e=>e[1]===entries[0][1]).map(e=>e[0]);
    document.getElementById("finalType").innerHTML = `<h3>你的類型：${top.join("＋")}</h3>`;

    // 完整解析
    const detail = {
        男孩:`你是【男孩型】：\n關於自己，你還在學著怎麼相信。\n你的樣子...\n(完整解析內容同前)`,

        鼴鼠:`你是【鼴鼠型】：\n你的溫柔，是世界很需要的安慰...\n(完整解析內容同前)`,

        狐狸:`你是【狐狸型】：\n你看得很清楚，只是習慣把心收好...\n(完整解析內容同前)`,

        馬:`你是【馬型】：\n你習慣當那個「載大家走過去」的人...\n(完整解析內容同前)`
    };

    document.getElementById("analysis").innerHTML =
        top.map(t => `<h3>${t}型解析</h3><p>${detail[t]}</p>`).join("");
}
