/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import AudioPlayerWithVolume from "./feature/Components/AudioPlayer";
import DifficultySelector from "./feature/Components/DifficultySelector";
import Dropdown from "./feature/Components/Dropdown";
import { Quiz } from "./feature/Components/Quiz";
import { quizData } from "./feature/data/quizData";

const Home = () => {
  const [difficulty, setDifficulty] = useState<
    "easy" | "normal" | "hard" | null
  >(null);
  const [backgroundClass, setBackgroundClass] = useState("");
  const [category, setCategory] = useState("全て");
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
    // "暗黒大陸編",
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

  // Home コンポーネント内の filteredQuestions にカテゴリフィルタリングを追加
  const filteredQuestions = difficulty
    ? quizData[difficulty].filter(
        (question) => category === "全て" || question.category === category
      )
    : [];

  return (
    <div className={`${backgroundClass} fsm:px-4 px-2`}>
      <header className="flex items-center  sm:mb-4 mb-0 sm:p-4 p-1">
        <h1 className="text-2xl font-bold  ">
          <Image
            src="/images/header/logo1.png"
            alt="HxH ロゴ"
            width={100}
            height={100}
          />
        </h1>
        <button
          onClick={() => location.reload()}
          className="text-sm  text-white rounded"
        >
          <Image
            src="/images/load/4.png"
            alt="HxH トップへ戻るボタン"
            width={55}
            height={55}
          />
        </button>
        <AudioPlayerWithVolume />
        <div className="ml-2">
          <Dropdown
            options={seriesOptions}
            selectedValue={category}
            onChange={handleCategoryChange}
          />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6  sm:space-y-0 w-full">
          {/* メイン画像 */}
          <div className="w-full max-w-[200px] sm:max-w-[300px]">
            <Image
              src="/images/main/main_img.webp"
              alt="メイン画像"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
          {/* コンテンツ部分 */}
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
