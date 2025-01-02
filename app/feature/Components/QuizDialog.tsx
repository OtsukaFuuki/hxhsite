type QuizDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  selectedCategory: string;
  numberOfQuestions: string;
  isShuffle: boolean;
  selectedDifficulty: "easy" | "normal" | "hard" | null;
};
const difficultyLabels: Record<"easy" | "normal" | "hard", string> = {
  easy: "初級",
  normal: "中級",
  hard: "上級",
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
        className="bg-white text-black p-6 rounded-lg shadow-lg w-[90%]"
        style={{
          backgroundImage: "url('/images/Quiz/bg1.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom 6% right -44px", // 下方向 20%、右方向 10% に配置
        }}
      >
        <h2 className="text-lg font-bold mb-4">設定の確認</h2>

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
            <li className="ml-2">{isShuffle ? "有効" : "無効"}</li>
            <li className="ml-2">{displayedDifficulty}</li>
          </ul>
        </div>

        <div className="flex justify-end space-x-4">
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
            スタート
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDialog;
