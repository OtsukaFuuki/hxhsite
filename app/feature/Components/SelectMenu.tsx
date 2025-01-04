import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ToggleButton from './toggleButton';
import Popup from './popup';
import Image from 'next/image';
import QuizDialog from './QuizDialog';

type QuizControlsProps = {
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
  onSelectDifficulty: (value: 'easy' | 'normal' | 'hard') => void;
  numberOfQuestions: string;
  onNumberOfQuestions: (value: string) => void;
  isShuffle: boolean; // 追加: シャッフルの状態
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>; // 追加: シャッフルの切り替え
  onStartQuiz: () => void; // スタート時の処理
};

const QuizControls: React.FC<QuizControlsProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectDifficulty,
  onNumberOfQuestions,
  numberOfQuestions,
  isShuffle, // 追加
  setIsShuffle, // 追加
  onStartQuiz,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ポップアップの表示状態
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'easy' | 'normal' | 'hard' | null
  >(null);

  const seriesOptions = [
    '全て',
    'ハンター試験編',
    'ククルーマウンテン編',
    '天空闘技場編',
    'ヨークシンシティ編',
    'G・I編',
    'キメラアントNGL編',
    'キメラアント王誕生編',
    '会長選挙編',
    'アルカ編',
  ];

  const NumberOfQuestions = ['全て', '10問', '20問', '30問', '40問', '50問'];

  const handleDifficultySelect = (difficulty: 'easy' | 'normal' | 'hard') => {
    setSelectedDifficulty(difficulty);
    setIsDialogOpen(true); // ダイアログを表示
  };

  const handleStartQuiz = () => {
    if (selectedDifficulty) {
      onSelectDifficulty(selectedDifficulty);
      setIsDialogOpen(false); // ダイアログを閉じる
      onStartQuiz(); // クイズを開始
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md sm:max-w-2xl md:max-w-3xl bg-customHunter p-4 md:p-8 md:pb-12 rounded-lg">
      <h2 className="text-xl font-bold text-white">
        カテゴリや難易度を設定
        <p className="text-xs mt-1">(詳しくは下のヒソカをクリック！)</p>
      </h2>
      <div className="bg-customHunter rounded shadow-lg max-w-lg md:max-w-2xl w-full flex-col flex md:flex-row md:bg-customHunter md:border-gray-300 md:border md:p-4 md:shadow-none">
        <div className="flex items-end md:items-start bg-customHunter p-4 border border-gray-300 rounded shadow-lg md:flex-col  md:bg-none md:border-none md:shadow-none">
          <div className="flex flex-col gap-5 items-start">
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

          <div className="flex flex-col md:flex-row gap-5 items-center ml-auto md:ml-0 md:mt-8 ">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="text-white rounded"
            >
              <p className="relative top-[-1px] text-xs text-white font-semibold">
                \\ 説明するよ //
              </p>
              <Image
                src="/images/header/1.png"
                alt="popupヒソカ"
                width={70}
                height={70}
              />
            </button>

            {/* トグルボタン */}
            <ToggleButton isShuffle={isShuffle} setIsShuffle={setIsShuffle} />
          </div>
        </div>
        <div className="bg-customHunter p-4 border border-gray-300 rounded shadow-lg mt-4 md:mt-0 md:ml-4 md:bg-none md:border-none md:shadow-none md:flex-1 md:pt-0">
          <h1 className="flex justify-center text-lg font-bold text-white">
            難易度を選択してください
          </h1>
          <div className="flex flex-col w-full gap-5 mt-3">
            <button
              onClick={() => handleDifficultySelect('easy')}
              className="px-4 py-2 bg-lime-500 text-white hover:bg-lime-600 shadow-lg"
            >
              初級
            </button>
            <button
              onClick={() => handleDifficultySelect('normal')}
              className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
            >
              中級
            </button>
            <button
              onClick={() => handleDifficultySelect('hard')}
              className="px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 shadow-lg"
            >
              上級
            </button>
            <button
              disabled
              className="flex flex-col items-center justify-center px-4 py-2 bg-gradient-to-r from-red-900 via-purple-800 to-black text-white hover:from-black hover:via-purple-900 hover:to-red-900 shadow-lg"
            >
              <p>???級</p>
              <p className="text-xs text-white">~ coming soon ~</p>
            </button>
          </div>
        </div>
      </div>

      {/* 統合された DifficultySelector */}
      {/* <div className="flex flex-col items-center bg-customHunter p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full min-h-[80px]:">
       
      </div> */}

      {/* ポップアップ表示 */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <QuizDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStart={handleStartQuiz}
        selectedCategory={selectedCategory}
        numberOfQuestions={numberOfQuestions}
        isShuffle={isShuffle}
        selectedDifficulty={selectedDifficulty}
      />
    </div>
  );
};

export default QuizControls;
