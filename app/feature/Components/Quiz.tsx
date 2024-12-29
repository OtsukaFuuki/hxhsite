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
  ],
  intermediate: [
    { id: 3, question: "クラピカの一族の名前は？", correctAnswer: "クルタ族" },
    { id: 4, question: "ハンター試験のバッジ総数は？", correctAnswer: "404" },
  ],
  advanced: [
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
