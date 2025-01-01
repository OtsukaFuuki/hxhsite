// components/Popup.tsx
import React, { useEffect, useState } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  // 開く/閉じる時にアニメーションを適用するためのタイミング制御
  useEffect(() => {
    if (isOpen) {
      setShowPopup(true); // 開くタイミングでshowPopupをtrueに
    } else {
      // 閉じる時にアニメーションを加えてから非表示に
      setTimeout(() => {
        setShowPopup(false);
      }, 500); // アニメーションが終了するまで待つ
    }
  }, [isOpen]);

  if (!showPopup) return null; // showPopupがfalseの時は表示しない

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 px-2 h-screen transition-opacity duration-500 popup-no-margin  ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-all duration-500 transform ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10"
        }`}
        style={{ top: "-5%" }} // コンテンツ部分のみ上に移動
      >
        <h2 className="text-2xl font-semibold mb-4">アプリの説明</h2>
        <div className="max-h-96 overflow-y-auto">
          <p className="p-1">
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
            このアプリは、あなたの知識をテストするためのクイズアプリです。
            さまざまなカテゴリや難易度を選択して、チャレンジを開始してください！
          </p>
        </div>
        <div className="text-right">
          <button
            onClick={onClose}
            className="mt-4 bg-customGreen text-white py-2 px-4 rounded"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
