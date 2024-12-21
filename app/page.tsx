"use client";

import { useState } from "react";
import Quiz from "./feature/Components/Quiz";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(true);

  const handleRestart = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 0); // 再レンダリングして初期化
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-0 px-6">
      <h1 className="text-3xl font-bold mb-4">HxHクイズアプリ</h1>
      {showQuiz ? <Quiz onRestart={handleRestart} /> : null}
    </main>
  );
}
