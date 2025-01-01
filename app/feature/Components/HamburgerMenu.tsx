import React from "react";
import AudioPlayerSwitch from "./AudioPlayer";

type HamburgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed z-50 top-0 right-0 h-screen bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      style={{ width: "85%" }}
    >
      <button
        onClick={onClose}
        className="w-10 h-10 absolute top-2 right-4 text-white text-2xl"
      >
        ✕
      </button>
      <div className="p-6 overflow-y-auto h-full">
        <div>
          <h2 className="text-lg font-bold mb-4">音楽設定</h2>
          <AudioPlayerSwitch />
          <p className="text-xs mt-4">
            ※通信環境により再生されない場合があるが気長に待っててね！
          </p>
          {/* 他の音楽関連コンテンツをここに追加 */}
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">設定1</h2>
          <p>このアプリの概要について</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">設定2</h2>
          <p className="font-bold">注意点</p>
          <p className="text-xs mt-1">
            ・画像の表示が遅いので2秒くらい待って！
          </p>
          <p className="text-xs mt-1">・バグあったら教えて！</p>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
