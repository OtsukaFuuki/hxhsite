// Quizコンポーネント

import { useState } from "react";
import { Question } from "./Questioin";

type QuizProps = {
  questions: {
    id: number;
    question: string;
    correctAnswer: string[];
    category: string;
  }[];
  difficulty: "easy" | "normal" | "hard";
  onRestart: () => void;
  setIsQuizStarted: React.Dispatch<React.SetStateAction<boolean>>; // setIsQuizStarted を受け取る
};

export const Quiz = ({ questions, onRestart }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<
    { question: string; userAnswer: string; correctAnswer: string[] }[]
  >([]);

  const handleAnswer = (userAnswer: string) => {
    const currentQuiz = questions[currentIndex];

    // 正誤判定
    if (
      currentQuiz.correctAnswer.some(
        (answer) =>
          userAnswer.trim().toLowerCase() === answer.trim().toLowerCase()
      )
    ) {
      setScore(score + 1);
    }

    // 既存の回答を更新または追加
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.question === currentQuiz.question
    );
    if (existingAnswerIndex !== -1) {
      // 回答がすでにある場合、更新する
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = {
        question: currentQuiz.question,
        userAnswer,
        correctAnswer: currentQuiz.correctAnswer,
      };
      setAnswers(updatedAnswers);
    } else {
      // 新しい回答の場合
      setAnswers((prev) => [
        ...prev,
        {
          question: currentQuiz.question,
          userAnswer,
          correctAnswer: currentQuiz.correctAnswer,
        },
      ]);
    }

    // 次の問題に進む
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  // 戻るボタンの処理
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="px-2 py-3 border border-gray-300 rounded shadow-lg max-w-lg w-full bg-customHunter">
      {finished ? (
        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">クイズ終了！</h2>
            <p className="text-white text-xs mt-2">
              あなたのスコア: {score}/{questions.length}
            </p>
          </div>
          <div className="mt-3 w-full max-h-[450px] overflow-y-auto bg-gray-900 p-4 rounded border border-gray-700 ">
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
                    <strong>正解 :</strong> {answer.correctAnswer.join(", ")}
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
        <Question
          quiz={questions[currentIndex]}
          currentIndex={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          onRestart={onRestart}
          previousAnswer={
            answers.find(
              (answer) => answer.question === questions[currentIndex].question
            )?.userAnswer || "" // 戻るときに以前の回答を表示
          }
        />
      )}
    </div>
  );
};
