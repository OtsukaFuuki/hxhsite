// components/Popup.tsx
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 px-2  transition-opacity duration-500 popup-no-margin  ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-all duration-500 transform ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-90 opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage: "url('/images/des/1.jpeg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden', // コンテンツが溢れないようにする
        }}
      >
        {/* 背景にオーバーレイを追加する場合 */}
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>

        <div className="relative text-white z-10">
          <h2 className="text-xl font-bold mb-4">アプリの説明</h2>
          <div className="max-h-[400px] overflow-y-auto space-y-6 text-sm leading-6">
            <section>
              <h3 className="text-lg font-semibold">画面について</h3>
              <ul className="list-disc pl-3 space-y-1 mt-2 text-xs md:text-base">
                <li style={{ listStyle: 'none' }}>1. スタート画面</li>
                <li style={{ listStyle: 'none' }}>2. 選択画面</li>
                <li style={{ listStyle: 'none' }}>3. クイズ画面</li>
              </ul>

              <h3 className="text-lg font-semibold mt-2">各種機能について</h3>

              <ul className="space-y-1 text-xs">
                <li className="mt-2 flex items-center">
                  <Image
                    src="/images/header/logo1.png"
                    alt="HxH ロゴ"
                    width={40}
                    height={0}
                  />
                  <span>をタップするとスタート画面へ遷移します。</span>
                </li>
                <li className="flex items-center">
                  <Image
                    src="/images/load/4.png"
                    alt="背景を変更するボタン"
                    width={40}
                    height={0}
                  />
                  <span>をタップすると背景がランダムで変わります。</span>
                </li>
                <li className="flex items-center">
                  <Image
                    src="/images/nav/1.png"
                    alt="navBarを案内するキルア"
                    width={40}
                    height={0}
                  />
                  <span>をタップするとメニューバーが開きます。</span>
                </li>
                <li className="flex items-center">
                  <Image
                    src="/images/header/1.png"
                    alt="popupヒソカ"
                    width={40}
                    height={40}
                  />
                  をタップするとアプリの説明を確認できます。
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold">遊び方</h3>
              <h4 className="font-semibold pl-2">1. クイズの設定</h4>
              <ul className="list-decimal pl-10 space-y-1 mt-1 text-xs sm:text-base">
                <li>
                  <span className="font-semibold">出題範囲</span>
                  を選択することでご自身の漫画やアニメの進捗具合に応じてクイズを楽しむことができます。
                </li>
                <li>
                  <span className="font-semibold">問題数</span>
                  を選択することで何問出題するかを設定できます。
                </li>
                <li>
                  <span className="font-semibold">シャッフル機能</span>
                  をONにするか否か決めて下さい。ONにすると問題がランダムで出題されます。2回目以降お遊びいただく際にお楽しみいただけます。
                </li>
                <li>
                  <span className="font-semibold">難易度</span>
                  を選択します。選択した後にクイズがスタートします。
                </li>
                <li>最後に設定した内容の確認メッセージが表示されます。</li>
              </ul>
              <h4 className="font-semibold pl-2 mt-1">3. クイズ画面</h4>
              <ul className="list-decimal pl-10 space-y-1 mt-1 text-xs sm:text-base">
                <li>問題が表示されます。答えを入力して下さい。</li>
                <li>
                  「回答する」ボタンを押下すると次の問題に進みます。空欄のままでもボタンは押下できます。
                </li>
                <li>
                  「前へ」ボタンを押下すると前の問題に戻ります。入力した内容が表示されるので修正が可能です。
                </li>
                <li>
                  左上の「TOPへ」ボタンを押下すると選択画面に戻ります。
                  <br />
                  ※クイズを中断した場合は内容は保存されません。
                </li>
                <li>
                  現在の問題数確認したい場合は画面右上の数字をご確認下さい。
                </li>
                <li>
                  全問題が終了すると結果画面が表示されます。「トップに戻る」ボタンを押下すると選択画面に戻ります。
                </li>
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
