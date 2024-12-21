"use client";
import { useState } from "react";
import Question from "./Questioin";

type QuizProps = {
  onRestart: () => void;
};

const quizData = [
  {
    id: 1,
    question: "ゴンの本名は？",
    correctAnswer: "ゴン・フリークス",
  },
  {
    id: 2,
    question: "キルアの本名は？",
    correctAnswer: "キルア・ゾルディック",
  },
];

export default function Quiz({ onRestart }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (userAnswer: string) => {
    const currentQuiz = quizData[currentIndex];
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuiz.correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
    }
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
      {finished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">クイズ終了！</h2>
          <p className="mt-2">
            あなたのスコア: {score}/{quizData.length}
          </p>
          <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            トップに戻る
          </button>
        </div>
      ) : (
        <Question quiz={quizData[currentIndex]} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
