// Questionコンポーネント
import { useState, useEffect } from 'react';
import Image from 'next/image';

type QuestionProps = {
  quiz: {
    id: number;
    question: string;
    correctAnswer: string[];
    image?: string;
  };
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (userAnswer: string) => void;
  onBack: () => void;
  previousAnswer: string; // 戻るボタンで以前の回答を受け取る
  onRestart: () => void;
};

export const Question = ({
  quiz,
  currentIndex,
  totalQuestions,
  onAnswer,
  onBack,
  onRestart,
  previousAnswer,
}: QuestionProps) => {
  const [userAnswer, setUserAnswer] = useState(previousAnswer);

  useEffect(() => {
    // previousAnswerが変わった時にuserAnswerを更新する
    setUserAnswer(previousAnswer);
  }, [previousAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(userAnswer); // 回答を親コンポーネントに渡す
    setUserAnswer(''); // 回答後に入力欄をリセット
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full">
      <div className="flex items-center justify-between text-right text-white mr-1 mb-4">
        <button
          type="button"
          onClick={onRestart} // セレクト画面に戻す
          className="px-4 py-2 text-white bg-none"
        >
          TOPへ
        </button>
        <p>
          {currentIndex}/{totalQuestions}
        </p>
      </div>

      <h2 className="text-white text-sm text-left font-semibold mb-4 min-h-[70px] flex items-center">
        {quiz.question}
      </h2>

      <div className="mb-4 m-w-[291px] h-[250px] relative">
        <Image
          src={quiz.image ? quiz.image : '/images/Quiz/noimg.png'}
          alt={quiz.question}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="答えを入力"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="w-[30%] px-4 py-2 text-white bg-none"
          >
            ＜ 前へ
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-customGreen text-white rounded hover:bg-customGreen-dark"
          >
            回答する
          </button>
        </div>
      </form>
    </div>
  );
};
