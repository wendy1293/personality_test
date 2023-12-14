function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    {
        question: "あなたは新しいレストランで食事をすることにしました。メニューから何を選びますか？",
        options: [
            { answer: "自分の好きな料理", score: 1, lieScore: 0 },
            { answer: "食べたことがない新しい料理", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "友人が遅刻しています。どのように対応しますか？",
        options: [
            { answer: "イライラしながら待つ", score: 1, lieScore: 0 },
            { answer: "リラックスして待つ", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "仕事でミスをしてしまいました。どうしますか？",
        options: [
            { answer: "すぐに上司に報告する", score: 1, lieScore: 0 },
            { answer: "自分で解決しようとする", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "週末に予定がないとき、どのように過ごしますか？",
        options: [
            { answer: "家でゆっくりと過ごす", score: 1, lieScore: 0 },
            { answer: "アクティブに外出する", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "あなたはプロジェクトのリーダーに選ばれました。どのようにチームをまとめますか？",
        options: [
            { answer: "メンバーの意見を聞きながら進める", score: 1, lieScore: 0 },
            { answer: "自分の考えを中心に進める", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "友人からの突然の旅行の誘いがありました。どうしますか？",
        options: [
            { answer: "予定がなければすぐにOKする", score: 1, lieScore: 0 },
            { answer: "詳細を聞いてから決める", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "大切なプレゼンテーションの前日、あなたはどのように過ごしますか？",
        options: [
            { answer: "余裕を持って早めに休む", score: 1, lieScore: 0 },
            { answer: "最後まで準備を続ける", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "友人との約束に遅れそうです。どうしますか？",
        options: [
            { answer: "すぐに連絡して謝る", score: 1, lieScore: 0 },
            { answer: "なるべく急いで遅れないようにする", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "あなたにとって理想の休日はどのようなものですか？",
        options: [
            { answer: "家でのんびりと過ごす", score: 1, lieScore: 0 },
            { answer: "外出してアクティブに過ごす", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "新しい趣味を始めるとき、どのように選びますか？",
        options: [
            { answer: "友人のおすすめに従う", score: 1, lieScore: 0 },
            { answer: "自分で興味のあるものを探す", score: 2, lieScore: 0 }
        ]
    },
    {
        question: "あなたは決して怒らない人ですか？",
        options: [
            { answer: "決して怒らない", score: 0, lieScore: 1 },
            { answer: "たまには腹が立つ", score: 0, lieScore: 0 }
        ]
    },
    {
        question: "あなたは決して嘘をつかない人ですか？",
        options: [
            { answer: "一度も嘘をついたことがない", score: 0, lieScore: 1 },
            { answer: "たまに嘘をついてしまう", score: 0, lieScore: 0 }
        ]
    },
    {
        question: "あなたは実際に幽霊と会話したことがありますか？",
        options: [
            { answer: "たぶん会話したと思う", score: 0, lieScore: 1 },
            { answer: "まだ経験していない", score: 0, lieScore: 0 }
        ]
    },
];

// 問題文と回答オプションのシャッフル
shuffleArray(questions);
questions.forEach(question => {
    shuffleArray(question.options);
});

let countDownTimer = 30; //制限時間
let successFlag = false; //最後まで回答したか
let questionCount = 0; //問題数
let totalScore = 0 //トータルのスコア
// 低スコア (10点以下): 慎重で現実的な性格。計画的に物事を進め、リスクを避ける傾向があります。
// 中間スコア (11点から20点): バランスの取れた性格。柔軟性があり、状況に応じて適切な判断を下すことができます。
// 高スコア (21点以上): 冒険的でオープンマインドな性格。新しい経験や変化を楽しむ傾向があります。
let totalLieScore = 0 //ライスケールスコアの合計


//最初は診断するのボタンだけ表示 ※それ以外は非表示
document.getElementById("ansArea").style.display = "none";

function displayQuestion() {
    const question = questions[questionCount];
    document.getElementById("question").innerHTML = question.question;

    question.options.forEach((option, index) => {
        const buttonId = `ansButton${index + 1}`;
        const button = document.getElementById(buttonId);
        button.innerHTML = option.answer;
        button.style.display = 'block';
        button.onclick = () => onAnswerSelected(option.score, option.lieScore || 0);
    });
}

function onAnswerSelected(score, lieScore = 0) {
    totalScore += score;
    totalLieScore += lieScore
    questionCount++;

    if (questionCount >= questions.length) {
        stopTimer();
        showResult(); // すべての質問が完了したら結果を表示
    } else {
        displayQuestion(); // 次の質問を表示
    }
}

// 制限時間の関数を宣言
function countTimer() {
    if (countDownTimer > 0) {
        document.getElementById("countDown").innerHTML = `残り${countDownTimer}秒です`;
        timerId = setTimeout(() => {
            countDownTimer--;
            countTimer();
        }, 1000); // 1秒（1000ミリ秒）後に再度 countTimer を呼び出す
    } else { //タイマーが0になった場合の特定のメッセージを表示
        showResult(true); // 引数にtrueを渡して時間切れを示す
    }
}

let timerId = null; // タイマーIDを保持する変数

function stopTimer() {
    if (timerId !== null) {
        clearTimeout(timerId); // タイマーを停止
        timerId = null;
    }
}


function ansStart() {
    // ※再度挑戦する場合
    // 結果メッセージを消去
    document.getElementById("result").innerHTML = "";

    countDownTimer = 30;//タイマーをリセット
    questionCount = 0;//質問カウントをリセット
    totalScore = 0;//スコアをリセット


    //開始ボタンを非表示
    document.getElementById("ansStartButton").style.display = "none";
    //説明文を非表示
    document.getElementById("heading-text").style.display = "none";
    //問題文と選択肢を表示
    document.getElementById("ansArea").style.display = "block";


    // タイマーを開始する
    countTimer();

    // 最初の質問を表示する
    displayQuestion();
}

function showResult(timeUp = false) {
    let resultMessage = "<h2>診断結果</h2>";

    if (timeUp) {
        // タイマーが0になった場合のメッセージ
        resultMessage += "<h2>ひとつのことを深く考えようとすると、まわりが気にならなくなる傾向があるようです。</h2>";
    } else {
        if (totalScore <= 10) {
            resultMessage += "<h2>慎重で現実的な性格。計画的に物事を進め、リスクを避ける傾向があるようです。</h2>";
        } else if (totalScore <= 20) {
            resultMessage += "<h2>バランスの取れた性格。柔軟性があり、状況に応じて適切な判断を下すことができるはずです。</h2>";
        } else {
            resultMessage += "<h2>冒険的でオープンマインドな性格。新しい経験や変化を楽しむ傾向があるようです。</h2>";
        }
    }
    // ライスケールスコアに基づく追加メッセージ
    if (totalLieScore >= 1) {
        resultMessage += "<h2>また、とっさの判断力があるも、他者へ心を開ききっていない傾向が伺えます。</h2>";
    }

    // 結果メッセージを表示するHTML要素を準備
    document.getElementById("result").innerHTML = resultMessage;
    document.getElementById("ansArea").style.display = "none";//質問エリアを非表示
    document.getElementById("ansStartButton").style.display = "block";//再度挑戦するためのボタンを表示
    document.getElementById("ansStartButton").innerHTML = "もう一度だけ";
}
