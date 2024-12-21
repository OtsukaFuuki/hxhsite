type QuestionProps = {
  quiz: {
    id: number;
    question: string;
    correctAnswer: string;
  };
  onAnswer: (userAnswer: string) => void;
};

import { useState } from "react";

export default function Question({ quiz, onAnswer }: QuestionProps) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(userAnswer);
    setUserAnswer(""); // 入力欄をリセット
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="答えを入力"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          回答する
        </button>
      </form>
    </div>
  );
}
