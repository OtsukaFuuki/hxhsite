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
  {
    id: 3,
    question: "クラピカの一族の名前は？",
    correctAnswer: "クルタ族",
  },
  {
    id: 4,
    question: "ハンター試験で受験者に配られたバッジの総数は？",
    correctAnswer: "400",
  },
  {
    id: 5,
    question: "ネテロ会長が使う必殺技の名前は？",
    correctAnswer: "百式観音",
  },
  {
    id: 6,
    question: "幻影旅団の団長の名前は？",
    correctAnswer: "クロロ・ルシルフル",
  },
  {
    id: 7,
    question: "レオリオの夢は何になること？",
    correctAnswer: "医者",
  },
  {
    id: 8,
    question: "グリードアイランドのゲームマスターの名前は？",
    correctAnswer: "ドゥーン",
  },
  {
    id: 9,
    question: "ジン・フリークスのハンターとしての主な専門は？",
    correctAnswer: "遺跡ハンター",
  },
  {
    id: 10,
    question: "アルカが持つ特殊な能力の名前は？",
    correctAnswer: "おねだり",
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
