"use client";
import { useRef, useState } from "react";

export default function AudioPlayerSwitch() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentList, setCurrentList] = useState<string[]>([]); // 現在の曲リスト
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の曲のインデックス
  const [currentListName, setCurrentListName] = useState(""); // 現在のリスト名
  const [volume, setVolume] = useState(1); // 音量設定（1 = 最大、0 = 最小）
  const [isReady, setIsReady] = useState(false); // 再生準備が整ったかどうか

  // 曲リストの定義
  const songLists = {
    list1: ["1.mp3", "2.mp3", "3.mp3"],
    list2: ["4.mp3", "5.mp3"],
    list3: ["hunter1.mp3"],
    list4: ["6.mp3"],
  };

  // 曲リストを選択し再生を開始
  const playList = (listKey: keyof typeof songLists) => {
    const selectedList = songLists[listKey];
    setCurrentList(selectedList);
    setCurrentListName(listKey); // リスト名を保存
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

  // 音量変更
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="space-y-4">
      {/* 再生中のリスト名 */}
      <div className="text-left text-sm font-semibold">
        {currentListName
          ? `再生中のリスト: ${currentListName}`
          : "下記の再生リストを選択して下さい"}
      </div>
      {/* リスト再生ボタン */}
      <div className="flex flex-col gap-2">
        <button
          className="px-5 py-1 bg-blue-500 text-white rounded text-left"
          onClick={() => playList("list1")}
        >
          1(旅団3曲)
        </button>
        <button
          className="px-5 py-1 bg-green-500 text-white rounded text-left"
          onClick={() => playList("list2")}
        >
          2(ヒソカ2曲)
        </button>
        <button
          className="px-5 py-1 bg-red-500 text-white rounded text-left"
          onClick={() => playList("list3")}
        >
          3(エンドレス大地踏み締めて)
        </button>
        <button
          className="px-5 py-1 bg-red-500 text-white rounded text-left"
          onClick={() => playList("list4")}
        >
          4(ネテロvsメルエム)
        </button>
      </div>

      {/* 再生・停止ボタン */}
      <div className="flex justify-center gap-4">
        <button
          className={`px-6 py-2 text-white rounded ${
            isReady
              ? "bg-customGreen hover:bg-customGreen-dark"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={togglePlay}
          disabled={!isReady}
        >
          {isPlaying ? "停止" : "再生"}
        </button>
      </div>

      {/* 音量調整スライダー */}
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="volume" className="text-sm text-white">
          音量
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={`w-32 ${isReady ? "" : "bg-gray-200 cursor-not-allowed"}`}
          disabled={!isReady}
          style={{
            background: `linear-gradient(to right, #4caf50 ${
              volume * 100
            }%, #ddd ${volume * 100}%)`,
          }}
        />
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
