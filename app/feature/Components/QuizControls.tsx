import React from "react";
import Dropdown from "./Dropdown";
import DifficultySelector from "./DifficultySelector";
import ToggleButton from "./toggleButton";

type QuizControlsProps = {
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
  onSelectDifficulty: (value: "easy" | "normal" | "hard") => void;
  numberOfQuestions: string;
  onNumberOfQuestions: (value: string) => void;
  isShuffle: boolean; // 追加: シャッフルの状態
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>; // 追加: シャッフルの切り替え
};

const QuizControls: React.FC<QuizControlsProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectDifficulty,
  onNumberOfQuestions,
  numberOfQuestions,
  isShuffle, // 追加
  setIsShuffle, // 追加
}) => {
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

  const NumberOfQuestions = ["全て", "10問", "20問", "30問", "40問", "50問"];

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md bg-customHunter p-4 rounded-lg ">
      <h2 className="text-xl font-bold text-white">設定を選択してください</h2>
      <div className="bg-customHunter p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full">
        <div className="flex  items-end">
          <div className="flex flex-col  gap-5 items-start">
            <Dropdown
              options={seriesOptions}
              selectedValue={selectedCategory}
              onChange={onSelectCategory}
              text="出題範囲選択"
              label="出題範囲"
            />
            <Dropdown
              options={NumberOfQuestions}
              selectedValue={numberOfQuestions}
              onChange={onNumberOfQuestions}
              text="問題数の設定"
              label="問題数"
            />
          </div>
          <div className="ml-auto">
            {/* トグルボタン */}
            <ToggleButton isShuffle={isShuffle} setIsShuffle={setIsShuffle} />
          </div>
        </div>
      </div>
      <DifficultySelector onSelectDifficulty={onSelectDifficulty} />
    </div>
  );
};

export default QuizControls;
