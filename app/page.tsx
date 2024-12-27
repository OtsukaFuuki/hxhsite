"use client";

import { useState } from "react";
import Image from "next/image";
import Quiz from "./feature/Components/Quiz";
import AudioPlayerWithVolume from "./feature/Components/AudioPlayer";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(true);

  const handleRestart = () => {
    setShowQuiz(false);
    setTimeout(() => setShowQuiz(true), 0); // 再レンダリングして初期化
  };

  return (
    <div className="sm:px-4 px-2">
      <header>
        <h1 className="text-2xl font-bold sm:mb-4 mb-0 sm:p-4 p-1 flex justify-start">
          <Image
            src="/images/header/logo1.png"
            alt="HxH ロゴ"
            width={100}
            height={100}
          />
          <AudioPlayerWithVolume />
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
              width={600} // アスペクト比の元となる幅
              height={400} // アスペクト比の元となる高さ
            />
          </div>

          {/* クイズ部分 */}
          <div className="w-full max-w-[300px] sm:max-w-[500px] bg-customHunter">
            {showQuiz ? <Quiz onRestart={handleRestart} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
