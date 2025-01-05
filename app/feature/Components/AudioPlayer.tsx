'use client';

import { useRef, useState } from 'react';

export default function AudioPlayerSwitch() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentList, setCurrentList] = useState<string[]>([]); // 現在の曲リスト
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の曲のインデックス
  const [currentListName, setCurrentListName] = useState(''); // 現在のリスト名
  const [selectedList, setSelectedList] = useState(''); // 選択されたリスト名
  const [isReady, setIsReady] = useState(false); // 再生準備が整ったかどうか

  // 曲リストの定義
  const songLists = {
    list1: ['1.mp3', '2.mp3', '3.mp3'],
    list2: ['4.mp3', '5.mp3'],
    list3: ['hunter1.mp3'],
    list4: ['6.mp3'],
    list5: ['7.mp3'],
  };

  // 曲リストを選択し再生を開始
  const playList = (listKey: keyof typeof songLists) => {
    const selectedList = songLists[listKey];
    setCurrentList(selectedList);
    setCurrentListName(listKey); // リスト名を保存
    setSelectedList(listKey); // 選択されたリスト名を保存
    setCurrentIndex(0); // 最初の曲に設定

    if (audioRef.current) {
      audioRef.current.src = `/sounds/${selectedList[0]}`; // 最初の曲を設定
      audioRef.current.play();
      setIsReady(true); // 曲が再生される準備ができたことを示す
      setIsPlaying(true);
    }
  };

  // 次の曲を再生
  const playNext = () => {
    if (currentList.length > 0) {
      const nextIndex = (currentIndex + 1) % currentList.length; // インデックスを更新（ループ）
      setCurrentIndex(nextIndex);

      if (audioRef.current) {
        audioRef.current.src = `/sounds/${currentList[nextIndex]}`;
        audioRef.current.play();
      }
    }
  };

  // 再生・停止の切り替え
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-4">
      {/* 再生中のリスト名 */}
      <div className="text-left text-sm font-semibold">
        {currentListName
          ? `再生中のリスト: ${currentListName}`
          : '再生中のリスト: 何も選択されていません'}
      </div>

      {/* リスト再生ボタン */}
      <div className="flex flex-col gap-2">
        {Object.entries(songLists).map(([listKey], index) => (
          <button
            key={index}
            className={`px-5 py-3 rounded text-left text-sm ${
              selectedList === listKey
                ? 'buttonGradation text-white' // 選択時のスタイル
                : 'bg-gray-200 text-gray-600' // 非選択時のスタイル
            }`}
            onClick={() => playList(listKey as keyof typeof songLists)}
          >
            {`PlayList${index + 1} ${
              listKey === 'list1'
                ? '(旅団3曲)'
                : listKey === 'list2'
                  ? '(ヒソカ2曲)'
                  : listKey === 'list3'
                    ? '(エンドレス大地踏み締めて)'
                    : listKey === 'list4'
                      ? '(ネテロvsメルエム)'
                      : '(変わり種)'
            }`}
          </button>
        ))}
      </div>

      {/* 再生・停止ボタン */}
      <div className="flex gap-4">
        <button
          className={`px-6 py-2 text-white rounded ${
            isReady
              ? 'buttonGradation hover:buttonGradation'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={togglePlay}
          disabled={!isReady}
        >
          {isPlaying ? '停止' : '再生'}
        </button>
      </div>

      {/* オーディオ */}
      <audio
        ref={audioRef}
        onEnded={playNext} // 曲終了時に次の曲を再生
        loop={false} // 自動ループは無効
      />
    </div>
  );
}
