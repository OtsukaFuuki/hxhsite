/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HamburgerMenu from "./feature/Components/HamburgerMenu";
import QuizControls from "./feature/Components/QuizControls";
import { Quiz } from "./feature/Components/Quiz";
import { quizData } from "./feature/data/quizData";
import { shuffleArray } from "./feature/utils/arrayUtils";

const Home = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<
    "easy" | "normal" | "hard" | null
  >(null);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [category, setCategory] = useState("全て");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState("全て");
  const [isShuffle, setIsShuffle] = useState(false); // 追加: シャッフル状態

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

  useEffect(() => {
    if (isQuizStarted) {
      changeBackground();
    } else {
      setBackgroundClass("background-image0");
    }
  }, [isQuizStarted]);

  const changeBackground = () => {
    if (isQuizStarted) {
      const randomClass =
        backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];
      setBackgroundClass(randomClass);
    }
  };

  // 問題を絞り込む
  const filteredQuestions = difficulty
    ? quizData[difficulty]
        .filter(
          (question) => category === "全て" || question.category === category
        )
        .slice(
          0,
          numberOfQuestions === "全て"
            ? quizData[difficulty].length
            : parseInt(numberOfQuestions)
        )
    : [];

  // シャッフル適用
  const displayedQuestions = isShuffle
    ? shuffleArray(filteredQuestions)
    : filteredQuestions;

  return (
    <div className={`${backgroundClass} fsm:px-4 px-2`}>
      <header className="flex items-center sm:mb-4 mb-2 sm:p-4 p-1">
        <h1 className="text-2xl font-bold pt-2">
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
          onClick={changeBackground}
          disabled={!isQuizStarted}
          className="text-sm text-white rounded"
          style={{
            pointerEvents: isQuizStarted ? "auto" : "none",
          }}
        >
          <Image
            src="/images/load/4.png"
            alt="背景を変更するボタン"
            width={55}
            height={40}
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
              width={60}
              height={60}
            />
            <p className="text-xs text-white mb-5 font-semibold animate-bounce">
              クリック！
            </p>
          </div>
        </button>
      </header>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {!isQuizStarted ? (
        <div className="flex flex-col items-center justify-center mt-40">
          <button
            onClick={() => setIsQuizStarted(true)}
            className="bg-yellow-500 text-white w-32 h-32 rounded-full hover:bg-customGreen-dark flex items-center justify-center text-lg font-bold"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          {!difficulty ? (
            <QuizControls
              selectedCategory={category}
              onSelectCategory={setCategory}
              onSelectDifficulty={setDifficulty}
              numberOfQuestions={numberOfQuestions}
              onNumberOfQuestions={setNumberOfQuestions}
              isShuffle={isShuffle} // シャッフル状態を渡す
              setIsShuffle={setIsShuffle} // 状態更新関数を渡す
            />
          ) : (
            <Quiz
              questions={displayedQuestions} // 表示する質問にシャッフル適用
              difficulty={difficulty}
              onRestart={() => setDifficulty(null)}
              setIsQuizStarted={setIsQuizStarted}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
