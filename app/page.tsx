"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import DifficultySelector from "./feature/Components/DifficultySelector";
import Dropdown from "./feature/Components/Dropdown";
import { Quiz } from "./feature/Components/Quiz";
import { quizData } from "./feature/data/quizData";
import HamburgerMenu from "./feature/Components/HamburgerMenu";

const Home = () => {
  const [difficulty, setDifficulty] = useState<
    "easy" | "normal" | "hard" | null
  >(null);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [category, setCategory] = useState("全て");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの開閉状態

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const seriesOptions = [
    "全て",
    "ハンター試験編",
    "ククルーマウンテン編",
    "天空闘技場編",
    "ヨークシンシティ編",
    "G・I編",
    "キメラアントNGL編",
    "キメラアント王誕生編",
    "会長選挙編",
    "アルカ編",
  ];

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
    "background-image38",
    "background-image39",
  ];

  useEffect(() => {
    const randomClass =
      backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];
    setBackgroundClass(randomClass);
  }, []);

  const filteredQuestions = difficulty
    ? quizData[difficulty].filter(
        (question) => category === "全て" || question.category === category
      )
    : [];

  return (
    <div className={`${backgroundClass} fsm:px-4 px-2`}>
      <header className="flex items-center justify-between sm:mb-4 mb-0 sm:p-4 p-1">
        <h1 className="text-2xl font-bold">
          <Image
            src="/images/header/logo1.png"
            alt="HxH ロゴ"
            width={100}
            height={100}
          />
        </h1>
        <button
          onClick={() => location.reload()}
          className="text-sm text-white rounded"
        >
          <Image
            src="/images/load/4.png"
            alt="HxH トップへ戻るボタン"
            width={55}
            height={55}
          />
        </button>
        <div className="ml-2">
          <Dropdown
            options={seriesOptions}
            selectedValue={category}
            onChange={handleCategoryChange}
          />
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`ml-4 hamburger-icon ${
            isMenuOpen ? "open" : ""
          } relative w-8 h-8 flex flex-col justify-between items-center`}
        >
          <span className="w-8 h-1 bg-white transform transition-transform"></span>
          <span className="w-8 h-1 bg-white transform transition-transform"></span>
          <span className="w-8 h-1 bg-white transform transition-transform"></span>
        </button>
      </header>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 sm:space-y-0 w-full">
          <div className="w-full max-w-[200px] sm:max-w-[300px]">
            <Image
              src="/images/main/main_img.webp"
              alt="メイン画像"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
          <div className="w-full max-w-[300px] sm:max-w-[500px] bg-customHunter">
            {!difficulty ? (
              <DifficultySelector onSelectDifficulty={setDifficulty} />
            ) : (
              <Quiz
                questions={filteredQuestions}
                difficulty={difficulty}
                onRestart={() => setDifficulty(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
