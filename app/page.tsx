/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Quiz from "./feature/Components/Quiz";

import AudioPlayerWithVolume from "./feature/Components/AudioPlayer";
import DifficultySelector from "./feature/Components/DifficultySelector";

export default function Home() {
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced" | null
  >(null);
  const [backgroundClass, setBackgroundClass] = useState("");

  const backgroundClasses = [
    "background-image2",
    "background-image3",
    "background-image4",
    "background-image5",
  ];

  useEffect(() => {
    const randomClass =
      backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];
    setBackgroundClass(randomClass);
  }, []);

  const handleRestart = () => {
    setDifficulty(null); // 難易度選択画面に戻る
  };

  return (
    <div className={`${backgroundClass} fsm:px-4 px-2`}>
      <header>
        <h1 className="text-2xl font-bold sm:mb-4 mb-0 sm:p-4 p-1 flex justify-start">
          <Image
            src="/images/header/logo1.png"
            alt="HxH ロゴ"
            width={100}
            height={100}
            style={{ marginRight: "8px" }}
          />
          <AudioPlayerWithVolume />
          <button
            onClick={() => location.reload()}
            className="ml-2 px-4 py-2 text-sm bg-customGreen text-white rounded hover:bg-customGreen-dark"
          >
            Topへ
          </button>
        </h1>
      </header>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-6 sm:space-y-0 w-full">
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
              <Quiz difficulty={difficulty} onRestart={handleRestart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
