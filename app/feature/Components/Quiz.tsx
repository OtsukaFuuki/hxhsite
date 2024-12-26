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
    correctAnswer: "ゴン＝フリークス",
  },
  {
    id: 2,
    question: "キルアの本名は？",
    correctAnswer: "キルア＝ゾルディック",
  },
  {
    id: 3,
    question: "クラピカの一族の名前は？",
    correctAnswer: "クルタ族",
  },
  {
    id: 4,
    question:
      "ゴンとキルアが参加したハンター試験で受験者に配られたバッジの総数は？",
    correctAnswer: "404",
  },
  {
    id: 5,
    question: "キルアの家族が住む屋敷のある山の名前は？",
    correctAnswer: "ククルーマウンテン",
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
    question:
      "ゴンの父親であるジン＝フリークスが所属しているハンターのグループは？",
    correctAnswer: "十二支ん",
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
    <div className="p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full bg-customHunter">
      {finished ? (
        <div className="text-center min-h-[228px] flex flex-col items-center justify-center border border-gray-300 rounded">
          <h2 className="text-2xl font-bold">クイズ終了！</h2>
          <p className="mt-2">
            あなたのスコア: {score}/{quizData.length}
          </p>
          <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-customGreen text-white rounded hover:bg-customGreen-dark"
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
