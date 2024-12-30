import { useState } from "react";
import Question from "./Questioin";

type QuizProps = {
  difficulty: "beginner" | "intermediate" | "advanced";
  onRestart: () => void;
};

const quizData = {
  beginner: [
    { id: 1, question: "ゴンの本名は？", correctAnswer: "ゴン＝フリークス" },
    {
      id: 2,
      question: "キルアの本名は？",
      correctAnswer: "キルア＝ゾルディック",
    },
    { id: 3, question: "クラピカの一族の名前は？", correctAnswer: "クルタ族" },
    { id: 4, question: "ハンター試験のバッジ総数は？", correctAnswer: "404" },
    {
      id: 5,
      question: "キルアの家の山の名前は？",
      correctAnswer: "ククルーマウンテン",
    },
    {
      id: 6,
      question: "幻影旅団の団長は？",
      correctAnswer: "クロロ・ルシルフル",
    },
    {
      id: 36,
      question: "HUNTER×HUNTERの作者といえば？",
      correctAnswer: "冨樫義博",
    },
    {
      id: 37,
      question: "ハンター試験は年に何回行われるか？",
      correctAnswer: "1回",
    },
    {
      id: 38,
      question:
        "ハンター協会の最高責任者でもある、審査委員会の第12代会長といえば？",
      correctAnswer: "ネテロ",
    },
    {
      id: 39,
      question: "ゾルディック家は何人家族か？(数字のみで答えよ)",
      correctAnswer: "10",
    },
  ],
  intermediate: [
    {
      id: 40,
      question:
        "ゴンは天空闘技場の最初の戦い(1階)の結果、何階からスタートすることになったか？(数字のみで答えよ)",
      correctAnswer: "50",
    },
    {
      id: 41,
      question: "ジンとミトの関係といえば？",
      correctAnswer: "いとこ",
    },
    {
      id: 42,
      question:
        "ビスケがG・Iに参加した理由は何を手に入れるためか？(間に・を入れて答えよ)",
      correctAnswer: "ブルー・プラネット",
    },
    {
      id: 43,
      question:
        "装着しているとすべての呪いを跳ね返すことができランクD-80のカードといえば？",
      correctAnswer: "聖騎士の首飾り",
    },
    {
      id: 7,
      question: "女王に忠実だった師団長コルトの人間の時(前世)の名前は？",
      correctAnswer: "クルト",
    },
    {
      id: 8,
      question:
        "イカルゴの死体に寄生し、我が身のように操る能力といえば？カタカナで答えよ",
      correctAnswer: "リビングデッドドールズ",
    },
    {
      id: 9,
      question:
        "「軍儀」は何×何マスのボードゲームか？マスの総数を答えよ(数字のみ)",
      correctAnswer: "81",
    },
    {
      id: 10,
      question:
        "ポックルと共にNGLに入りキメラ＝アントに射殺・捕食された第287期ハンター試験受験者といえば？",
      correctAnswer: "ポンズ",
    },
    {
      id: 11,
      question:
        "プフの自分の体を分裂させることで分身を創り出す能力といえば？カタカナで答えよ",
      correctAnswer: "ベルゼブブ",
    },
    {
      id: 12,
      question: "NGL自治国のNGLはそれぞれ何を意味しているか？",
      correctAnswer: "ネオグリーンライフ",
    },
  ],
  advanced: [
    {
      id: 13,
      question: "侵入者は噛み殺せ」と命令されているゾルディック家の番犬は？",
      correctAnswer: "ミケ",
    },
    {
      id: 14,
      question: "キルアには友情的な感情がある、執事見習いの少女の名前は？",
      correctAnswer: "カナリア",
    },
    {
      id: 15,
      question: "シルバは息子のキルアのことを何と呼んでいるか？",
      correctAnswer: "キル",
    },
    {
      id: 16,
      question: "クラピカの宿敵の幻影旅団の通り名といえば？",
      correctAnswer: "蜘蛛（クモ）",
    },
    {
      id: 17,
      question:
        "キルアは昔、天空闘技場で稼いだお金(2億ジェニー)は何で消えたと語ったか？",
      correctAnswer: "全部お菓子代",
    },
    {
      id: 18,
      question: "200階クラスの戦闘準備期間は何日か？",
      correctAnswer: "90日",
    },
    {
      id: 19,
      question:
        "フロアマスターに一番近い存在と言われていたヒソカに敗北した分身(ダブル)の使い手は？",
      correctAnswer: "カストロ",
    },
    {
      id: 20,
      question: "キルアは何系の念の能力者か？",
      correctAnswer: "変化系",
    },
    {
      id: 21,
      question:
        "ゴン,キルア,ズシがウイングから指導を受ける際にいつも何と返事するか？漢字(カタカナ)二文字で。",
      correctAnswer: "押忍(オス)",
    },
    {
      id: 22,
      question: "天空闘技場でゴンはヒソカに何対何で敗北したか？",
      correctAnswer: "11対4",
    },
    {
      id: 23,
      question: "ゴンは父親のテープをどのタイミングで止めたか？",
      correctAnswer: "ゴンの母親に関する情報",
    },
    {
      id: 24,
      question: "十老頭の自慢の10人で構成されている実行部隊といえば？",
      correctAnswer: "陰獣",
    },
    {
      id: 25,
      question:
        "ゴンたちの資金調達を手伝う内に仲良くなった元は贋作家といえば？",
      correctAnswer: "ゼパイル",
    },
    {
      id: 26,
      question:
        "政治的空白地でもある、なにを捨てても許される場所といえば何街？",
      correctAnswer: "流星街",
    },
    {
      id: 27,
      question: "初登場時のゴンの年齢は(数字のみ)？",
      correctAnswer: "11",
    },
    {
      id: 28,
      question: "ハンター試験の際のゴンの受験番号といえば(数字のみ)？",
      correctAnswer: "405",
    },
    {
      id: 29,
      question:
        "一次試験では何kmを通過した時点で初めて脱落者が出たか(数字のみ)？",
      correctAnswer: "80",
    },
    {
      id: 30,
      question:
        "四次試験でクラピカのターゲット(3点分)となった受験者は？(カナ3文字で答えよ)",
      correctAnswer: "トンパ",
    },
    {
      id: 31,
      question:
        "ウボォーギンのオーラを込めて放つストレートパンチの技名といえば？(漢字四文字で答えよ)",
      correctAnswer: "超破壊拳",
    },
    {
      id: 32,
      question:
        "恋人のスクワラを亡くしたネオンの侍女といえば？(カナ3文字で答えよ)",
      correctAnswer: "エリザ",
    },
    {
      id: 33,
      question:
        "キスすることで相手を奴隷にできる幻影旅団の襲撃で命を落としたネオン護衛団の一員といえば？(カナ4文字で答えよ)",
      correctAnswer: "ヴェーゼ",
    },
    {
      id: 34,
      question: "クラピカに念能力と制約と誓約を教えたのは？(カナ4文字で答えよ)",
      correctAnswer: "イズナビ",
    },
    {
      id: 35,
      question:
        "念能力をクロロに盗まれた陰獣のメンバーといえば？(平仮名で答えよ)",
      correctAnswer: "梟(ふくろう)",
    },
  ],
};

export default function Quiz({ difficulty, onRestart }: QuizProps) {
  const questions = quizData[difficulty]; // 難易度に応じた問題セットを取得
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (userAnswer: string) => {
    const currentQuiz = questions[currentIndex];
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuiz.correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full bg-customHunter">
      {finished ? (
        <div className="text-center min-h-[228px] flex flex-col items-center justify-center border border-gray-300 rounded">
          <h2 className="text-2xl font-bold text-white">クイズ終了！</h2>
          <p className="mt-2 text-white">
            あなたのスコア: {score}/{questions.length}
          </p>
          <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-customGreen text-white rounded hover:bg-customGreen-dark"
          >
            トップに戻る
          </button>
        </div>
      ) : (
        <Question quiz={questions[currentIndex]} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
