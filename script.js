function calculateResult() {
    const form = document.forms["quizForm"];
    const answers = ["q1", "q2", "q3", "q4", "q5"].map(q => form[q].value);

    if (answers.includes("")) {
        alert("請完成所有題目！");
        return;
    }

    let score = { A: 0, B: 0, C: 0, D: 0 };

    answers.forEach(ans => score[ans]++);

    const maxValue = Math.max(score.A, score.B, score.C, score.D);
    let types = [];

    for (let k in score) {
        if (score[k] === maxValue) types.push(k);
    }

    /* 類型對照 */
    const typeMap = {
        A: "馬型",
        B: "男孩型",
        C: "狐狸型",
        D: "鼴鼠型"
    };

    const explanation = {
        "男孩型": `
你還在學著怎麼相信自己。
你的敏感讓你理解別人的感受，但也容易忽略自己。
記得：你不必完美，也值得被愛。`,

        "鼴鼠型": `
你溫柔、有療癒人心的力量。
你讓別人感到舒服，也常成為大家的依靠。
別忘了：偶爾也該問問自己，「我還好嗎？」`,

        "狐狸型": `
你細膩、敏銳，懂得保護自己。
你不輕易敞開心，但一旦信任就很可靠。
提醒你：世界沒有那麼可怕，可以試著再相信一次。`,

        "馬型": `
你是撐住場面的那個人。
你願意承擔、願意陪伴，給人安全感。
但你也可以停下來，說一句「我也想被照顧」。`
    };

    let resultText = "";

    if (types.length === 1) {
        let t = typeMap[types[0]];
        resultText = `你是【${t}】\n${explanation[t]}`;
    } else {
        let mix = types.map(t => typeMap[t]).join("＋");
        resultText = `你是【混合型：${mix}】\n\n你的特質很豐富，不只單一面向。\n${mix.split("＋").map(t => explanation[t]).join("\n")}`;
    }

    document.getElementById("resultText").innerText = resultText;

    /* 雷達圖 */
    const ctx = document.getElementById('radarChart');
    new Chart(ctx, {
        type: 'radar',
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

    document.getElementById("resultSection").classList.remove("hidden");
}
