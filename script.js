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

    // 雷達圖
    new Chart(document.getElementById("radar"), {
        type: 'radar',
        data: {
            labels: ["馬","男孩","狐狸","鼴鼠"],
            datasets: [{
                label:"你的特質分佈",
                data:[score.馬, score.男孩, score.狐狸, score.鼴鼠],
                borderWidth:2,
                fill:true
            }]
        }
    });

    // 主要類型判定
    let entries = Object.entries(score);
    entries.sort((a,b)=>b[1]-a[1]);
    let top = entries.filter(e=>e[1]===entries[0][1]).map(e=>e[0]);
    document.getElementById("finalType").innerHTML = `<h3>你的類型：${top.join("＋")}</h3>`;

    // 完整解析
    const detail = {
        男孩:`你是【男孩型】：
關於自己，你還在學著怎麼相信。
你的樣子
你有很強的感受力，對世界充滿好奇，也對自己充滿問號。你常常會想：「我到底夠不夠好？」「我能不能被喜歡、被理解？」這種敏感，讓你更容易看見別人的情緒，也更容易忽略自己的需要。
你給人的感覺
在別人眼中，你像一個正在長大的孩子，真誠、直接、很真實。你會為了關係不斷自我檢討，只想讓自己變得更好。很多人因為你願意說出脆弱，而覺得被陪伴。
給你的提醒
你不需要完美才值得被愛。試著多看看自己已經做得不錯的地方，允許「還在路上」的自己存在。當你願意對自己溫柔一點，你就會發現：原來你早就已經是某個人心裡，很重要的那個存在。`,

        鼴鼠:`你是【鼴鼠型】：
你的溫柔，是世界很需要的安慰。
你的樣子
你很重視「舒服感」——食物、氣氛、陪伴、小確幸。你知道人不可能每天都很強，所以你特別會照顧情緒、照顧氣氛。你會為別人準備點心、傳訊息問候、講些好笑的話，讓沉重變得沒那麼可怕。
你給人的感覺
你像一個會做甜點的好朋友，可能不會給一大串理性分析，但總會讓人覺得：「跟你在一起就不那麼難過了。」多人其實靠你的存在，才撐過了一些很黑暗的日子。
給你的提醒
在照顧別人之前，也別忘了問一句：「那我自己呢？」你值得把同樣的溫柔，留一份給自己。偶爾不用那麼逗趣、那麼體貼，也沒關係—就算今天只想躺著，你一樣是很可愛的你。`,

        狐狸:`你是【狐狸型】：
你看得很清楚，只是習慣把心收好。
你的樣子
你敏銳、細心，對人的真心假意、情況的危險程度，有一種直覺式的判斷。你不會輕易把自己交出去，因為你知道受傷有多痛，所以寧可慢一點、再確定一點。
你給人的感覺
一開始，你可能讓人覺得有距離、有點冷，但真正走進你心裡的人都知道：你其實非常忠誠、非常有義氣。你不會亂承諾，一旦說出口，就盡力做到。
給你的提醒
保持界線是好事，但也別把自己關得太緊。不是每個人都會像過去那些人一樣傷你。你可以試著多給世界一點點機會—不是為了別人，而是為了讓自己有機會被好好對待。`,

        馬:`你是【馬型】：
你習慣當那個「載大家走過去」的人。
你的樣子
你很習慣扛責任、撐住場面。很多時候，你自己其實也會累、也會徬，可是你會先問：「大家還好嗎？」你是那種會陪著別人走一段的人，願意當那匹穩穩向前的馬。
你給人的感覺
你讓人有安全感。只要你在，事情好像就能慢慢被處理好。很多人會在不知不覺中依賴你、把難題丟給你，因為你看起來總是知道該怎麼做。
給你的提醒
你不是永遠都要那麼堅強。當你覺得很重的時候，也可以停下來，把一些重量放回去，或者請別人幫忙扛一點。有時候，真正的力量不是一直往前衝，而是敢在需要的時候說：「我也想被照顧。」`
    };

    document.getElementById("analysis").innerHTML =
        top.map(t => `<h3>${t}型解析</h3><p>${detail[t]}</p>`).join("");
}
