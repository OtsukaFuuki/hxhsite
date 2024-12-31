import React from "react";
import Dropdown from "./Dropdown";
import DifficultySelector from "./DifficultySelector";

type QuizControlsProps = {
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
  onSelectDifficulty: (value: "easy" | "normal" | "hard") => void;
};

const QuizControls: React.FC<QuizControlsProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectDifficulty,
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

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md bg-customHunter p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white">設定を選択してください</h2>
      <Dropdown
        options={seriesOptions}
        selectedValue={selectedCategory}
        onChange={onSelectCategory}
      />
      <DifficultySelector onSelectDifficulty={onSelectDifficulty} />
    </div>
  );
};

export default QuizControls;
