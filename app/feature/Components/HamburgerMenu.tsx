import React from "react";
import AudioPlayerSwitch from "./AudioPlayer";

type HamburgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 text-white transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      style={{ width: "80%" }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✕
      </button>
      <div className="p-6">
        <div>
          <h2 className="text-lg font-bold mb-4">音楽設定</h2>
          <AudioPlayerSwitch />
          {/* 他の音楽関連コンテンツをここに追加 */}
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">設定1</h2>
          <p>このアプリの概要について</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">設定2</h2>
          <p>注意点</p>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
