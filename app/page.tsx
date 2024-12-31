"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HamburgerMenu from "./feature/Components/HamburgerMenu";
import QuizControls from "./feature/Components/QuizControls";
import { Quiz } from "./feature/Components/Quiz";
import { quizData } from "./feature/data/quizData";

const Home = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false); // クイズ開始状態
  const [difficulty, setDifficulty] = useState<
    "easy" | "normal" | "hard" | null
  >(null);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [category, setCategory] = useState("全て");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const backgroundClasses = [
    "background-image2",
    "background-image4",
    "background-image5",
    "background-image7",
    "background-image8",
    "background-image13",
    "background-image14",
    "background-image15",
    "background-image29",
    "background-image34",
    "background-image36",
    "background-image39",
  ];

  // スタート時の背景を設定
  useEffect(() => {
    if (isQuizStarted) {
      changeBackground(); // クイズが始まったらランダム背景
    } else {
      setBackgroundClass("background-image0"); // スタート画面用の固定背景
    }
  }, [isQuizStarted]); // isQuizStarted の変更を監視

  // 背景をランダムに変更する関数
  const changeBackground = () => {
    if (isQuizStarted) {
      // クイズが開始されている場合のみ背景を変更
      const randomClass =
        backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];
      setBackgroundClass(randomClass);
    }
  };

  const filteredQuestions = difficulty
    ? quizData[difficulty].filter(
        (question) => category === "全て" || question.category === category
      )
    : [];

  return (
    <div className={`${backgroundClass} fsm:px-4 px-2`}>
      <header className="flex items-center sm:mb-4 mb-0 sm:p-4 p-1">
        <h1 className="text-2xl font-bold">
          <button onClick={() => location.reload()}>
            <Image
              src="/images/header/logo1.png"
              alt="HxH ロゴ"
              width={100}
              height={100}
            />
          </button>
        </h1>
        <button
          onClick={changeBackground} // 背景をランダムに変更
          disabled={!isQuizStarted} // 機能的には無効化
          className="text-sm text-white rounded" // 見た目を維持
          style={{
            pointerEvents: isQuizStarted ? "auto" : "none", // クリックイベントを無効化
          }}
        >
          <Image
            src="/images/load/4.png"
            alt="背景を変更するボタン"
            width={55}
            height={55}
          />
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`ml-auto hamburger-icon ${
            isMenuOpen ? "open" : ""
          } relative flex flex-col justify-between items-center`}
        >
          <div className="flex items-center">
            <Image
              src="/images/nav/1.png"
              alt="navBarを案内するキルア"
              width={70}
              height={80}
            />
            <p className="text-xs text-white mb-5 font-semibold">クリック！</p>
          </div>
        </button>
      </header>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* スタート画面 */}
      {!isQuizStarted ? (
        <div className="flex flex-col items-center justify-center mt-40">
          {/* <h2 className="text-3xl font-bold mb-6 text-white">
            クイズを始めましょう！
          </h2> */}
          <button
            onClick={() => setIsQuizStarted(true)} // クイズ開始
            className="bg-yellow-500 text-white w-32 h-32 rounded-full hover:bg-customGreen-dark flex items-center justify-center text-lg font-bold"
          >
            Start
          </button>
        </div>
      ) : (
        // 修正後のクイズ画面
        <div className="flex flex-col items-center justify-center w-full mt-20">
          {!difficulty ? (
            <QuizControls
              selectedCategory={category}
              onSelectCategory={setCategory}
              onSelectDifficulty={setDifficulty}
            />
          ) : (
            <Quiz
              questions={filteredQuestions}
              difficulty={difficulty}
              onRestart={() => setDifficulty(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
