type QuestionProps = {
  quiz: {
    id: number;
    question: string;
    correctAnswer: string;
    image?: string; // 画像のパスを追加
  };
  onAnswer: (userAnswer: string) => void;
};

import Image from "next/image";
import { useState } from "react";

export const Question = ({ quiz, onAnswer }: QuestionProps) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(userAnswer);
    setUserAnswer(""); // 入力欄をリセット
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full">
      {/* 問題部分 */}
      <h2 className="text-white text-sm text-left font-semibold mb-4  min-h-[80px] flex items-center justify-center">
        {quiz.question}
      </h2>
      {/* 画像部分 */}
      <div className="mb-4">
        <Image
          src={quiz.image ? quiz.image : "/images/Quiz/noimg.png"} // 型エラー回避
          alt={quiz.question}
          width={500} // 必須：画像の幅
          height={300} // 必須：画像の高さ
          className="w-full h-auto rounded-md"
        />
      </div>
      {/* 回答フォーム */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="答えを入力"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-customGreen text-white rounded hover:bg-customGreen-dark"
        >
          回答する
        </button>
      </form>
    </div>
  );
};
