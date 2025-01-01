import React from "react";

interface ToggleButtonProps {
  isShuffle: boolean;
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isShuffle,
  setIsShuffle,
}) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="toggle" className="text-white text-xs font-semibold mb-2">
        シャッフル
      </label>
      <div
        className={`relative w-16 h-9 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          isShuffle ? "bg-green-600" : ""
        }`}
        onClick={() => setIsShuffle(!isShuffle)}
      >
        <div
          className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${
            isShuffle ? "translate-x-7" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButton;
