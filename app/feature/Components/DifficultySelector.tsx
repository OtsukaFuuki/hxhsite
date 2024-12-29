type DifficultySelectorProps = {
  onSelectDifficulty: (
    difficulty: "beginner" | "intermediate" | "advanced"
  ) => void;
};

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelectDifficulty,
}) => (
  <div className="flex flex-col items-center bg-customHunter p-4 border border-gray-300 rounded shadow-lg max-w-lg w-full min-h-[80px]:">
    <h1 className="text-xl font-bold text-white">難易度を選択してください</h1>
    <div className="flex flex-col w-full gap-5 mt-3">
      <button
        onClick={() => onSelectDifficulty("beginner")}
        className="px-4 py-2 bg-lime-500 text-white hover:bg-lime-600 shadow-lg"
      >
        初級
      </button>
      <button
        onClick={() => onSelectDifficulty("intermediate")}
        className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
      >
        中級
      </button>
      <button
        onClick={() => onSelectDifficulty("advanced")}
        className="px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 shadow-lg"
      >
        上級
      </button>
    </div>
  </div>
);

export default DifficultySelector;
