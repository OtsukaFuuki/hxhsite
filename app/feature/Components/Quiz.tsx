import { useState } from "react";

import { quizData } from "../data/quizData";
import { Question } from "./Questioin";

type QuizProps = {
  difficulty: "easy" | "normal" | "hard";
  onRestart: () => void;
};

export const Quiz = ({ difficulty, onRestart }: QuizProps) => {
  const questions = quizData[difficulty]; // 難易度に応じた問題セットを取得
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { question: string; userAnswer: string; correctAnswer: string }[]
  >([]);

  const handleAnswer = (userAnswer: string) => {
    const currentQuiz = questions[currentIndex];

    // 正解チェック
    if (
      userAnswer.trim().toLowerCase() ===
      currentQuiz.correctAnswer.toLowerCase()
    ) {
      setScore(score + 1);
    }

    // 回答を履歴に追加
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuiz.question,
        userAnswer,
        correctAnswer: currentQuiz.correctAnswer,
      },
    ]);

    // 次の問題または終了
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="p-2 border border-gray-300 rounded shadow-lg max-w-lg w-full bg-customHunter">
      {finished ? (
        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">クイズ終了！</h2>
            <p className="text-white text-xs">
              あなたのスコア: {score}/{questions.length}
            </p>
          </div>
          <div className="mt-1 w-full max-h-[200px] overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700">
            <h3 className="text-lg font-semibold text-white">回答結果</h3>
            <ul className="mt-2 space-y-4">
              {answers.map((answer, index) => (
                <li
                  key={index}
                  className="p-2 border border-gray-300 rounded bg-gray-800 text-white "
                >
                  <div className="text-left">
                    <strong>問題 :</strong> {answer.question}
                  </div>
                  <div className="text-left">
                    <strong>あなたの回答 :</strong> {answer.userAnswer}
                  </div>
                  <div className="text-left">
                    <strong>正解 :</strong> {answer.correctAnswer}
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
};
