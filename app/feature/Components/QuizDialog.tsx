type QuizDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  selectedCategory: string;
  numberOfQuestions: string;
  isShuffle: boolean;
  selectedDifficulty: 'easy' | 'normal' | 'hard' | null;
};
const difficultyLabels: Record<'easy' | 'normal' | 'hard', string> = {
  easy: '初級',
  normal: '中級',
  hard: '上級',
};

const QuizDialog: React.FC<QuizDialogProps> = ({
  isOpen,
  onClose,
  onStart,
  selectedCategory,
  numberOfQuestions,
  isShuffle,
  selectedDifficulty,
}) => {
  if (!isOpen) return null;

  // 難易度を変換
  const displayedDifficulty =
    selectedDifficulty && difficultyLabels[selectedDifficulty];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 popup-no-margin">
      <div
        className="bg-white text-black p-6 rounded-lg shadow-lg w-[90%] md:w-[30%]"
        style={{
          backgroundImage: "url('/images/Quiz/bg2.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top 140% right -44px', // 下方向 20%、右方向 10% に配置
        }}
      >
        <h2 className="text-base font-bold mb-4">
          選択した設定はあっていますか！？
        </h2>

        <div className="flex items-center mb-8">
          <ul className="flex flex-col items-end space-y-1 font-semibold w-[100px]">
            <li>出題範囲 :</li>
            <li>問題数 :</li>
            <li>シャッフル :</li>
            <li>難易度 :</li>
          </ul>
          <ul className="space-y-1">
            <li className="ml-2">{selectedCategory}</li>
            <li className="ml-2">{numberOfQuestions}</li>
            <li className="ml-2">{isShuffle ? 'ON' : 'OFF'}</li>
            <li className="ml-2">{displayedDifficulty}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs">
            <span className="text-xs">※</span>
            キャラクターの名前を答える際にはフルネームでも名前のみでも正解判定になります。
          </p>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            戻る
          </button>
          <button
            onClick={onStart}
            className="px-4 py-2 bg-customGreen text-white rounded hover:bg-customGreen-dark"
          >
            問題へ進む
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDialog;
