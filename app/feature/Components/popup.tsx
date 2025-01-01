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
        style={{
          backgroundImage: "url('/images/des/1.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          maxHeight: "95vh",
          overflow: "hidden", // コンテンツが溢れないようにする
        }}
      >
        {/* 背景にオーバーレイを追加する場合 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        <div className="relative text-white z-10">
          <h2 className="text-xl font-bold mb-4">アプリの説明</h2>
          <div className="max-h-[70vh] overflow-y-auto space-y-6 text-sm leading-6">
            <section>
              <h3 className="text-lg font-semibold">画面について</h3>
              <ul className="list-disc pl-3 space-y-1 mt-2">
                <li style={{ listStyle: "none" }}>1. スタート画面</li>
                <li style={{ listStyle: "none" }}>2. 選択画面</li>
                <li style={{ listStyle: "none" }}>3. クイズ画面</li>
              </ul>

              <h3 className="text-lg font-semibold mt-2">各種機能について</h3>

              <ul className="list-disc pl-7 space-y-1">
                <li className="mt-2">
                  タイトルロゴをクリックするとスタート画面へ遷移します。
                </li>
                <li>
                  ゴンのアイコンをクリックすると背景がランダムで切り替わります。
                </li>
                <li>
                  キルアのアイコンをクリックするとメニューバーが開きます。
                </li>
                <li>
                  ヒソカのアイコンをクリックすることでこのポップアップが表示されます。
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold">遊び方</h3>
              <h4 className="font-semibold mt-2 pl-2">1. 背景と音楽の設定</h4>
              <ul className="list-decimal pl-10 space-y-1">
                <li>ゴンをクリックし、お好きな背景を選択してください。</li>
                <li>
                  キルアをクリックし、メニューバーの中で好きな音楽を選択してください。
                </li>
              </ul>
              <h4 className="font-semibold pl-2">2. クイズの設定</h4>
              <ul className="list-decimal pl-10 space-y-1 mt-1">
                <li>
                  出題範囲のドロップダウンリストから進捗に応じた範囲を選択します。
                </li>
                <li>問題数を選択します。</li>
                <li>
                  シャッフル機能をONにすると問題がランダムで出題されます。
                </li>
                <li>難易度を選択するとクイズが開始します。</li>
              </ul>
              <h4 className="font-semibold pl-2 mt-1">3. クイズ画面</h4>
              <ul className="list-decimal pl-10 space-y-1 mt-1">
                <li>
                  問題に合う答えを入力し、「回答する」ボタンで次へ進みます。
                </li>
                <li>「前へ」ボタンで前の問題に戻り、回答を修正できます。</li>
                <li>左上の「TOPへ」ボタンで選択画面に戻ります。</li>
                <li>全問題が終了すると結果画面が表示されます。</li>
              </ul>
            </section>
          </div>
          <div className="text-right">
            <button
              onClick={onClose}
              className="mt-5 bg-customGreen text-white py-2 px-4 rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
