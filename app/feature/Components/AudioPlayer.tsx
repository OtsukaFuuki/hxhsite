// import { useRef, useState } from "react";

// export default function AudioPlayerSwitch() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <div
//         className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer relative ${
//           isPlaying ? "bg-customGreen " : "bg-gray-300"
//         }`}
//         onClick={togglePlay}
//       >
//         {/* ON / OFF Text */}
//         <span
//           className={`absolute left-2 text-white font-bold text-sm ${
//             isPlaying ? "opacity-100" : "opacity-50"
//           }`}
//         >
//           ON
//         </span>
//         <span
//           className={`absolute right-2 text-white font-bold text-sm ${
//             !isPlaying ? "opacity-100" : "opacity-50"
//           }`}
//         >
//           OFF
//         </span>
//         {/* Toggle Button */}
//         <div
//           className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ${
//             isPlaying ? "translate-x-10" : "translate-x-0"
//           }`}
//         />
//       </div>
//       <audio ref={audioRef} src="/sounds/hunter1.mp3" loop />
//     </div>
//   );
// }

import { useRef, useState } from "react";

export default function AudioPlayerSwitch() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentList, setCurrentList] = useState<string[]>([]); // 現在の曲リスト
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の曲のインデックス

  // 曲リストの定義
  const songLists = {
    list1: ["1.mp3", "2.mp3", "3.mp3"],
    list2: ["4.mp3", "5.mp3"],
    list3: ["hunter1.mp3"],
    list4: ["5.mp3"],
  };

  // 曲リストを選択し再生を開始
  const playList = (listKey: keyof typeof songLists) => {
    const selectedList = songLists[listKey];
    setCurrentList(selectedList);
    setCurrentIndex(0); // 最初の曲に設定

    if (audioRef.current) {
      audioRef.current.src = `/sounds/${selectedList[0]}`; // 最初の曲を設定
      audioRef.current.play();
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

  // 再生・一時停止の切り替え
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

      {/* 再生/停止トグル */}
      <div
        className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer relative ${
          isPlaying ? "bg-customGreen " : "bg-gray-300"
        }`}
        onClick={togglePlay}
      >
        <span
          className={`absolute left-2 text-white font-bold text-sm ${
            isPlaying ? "opacity-100" : "opacity-50"
          }`}
        >
          ON
        </span>
        <span
          className={`absolute right-2 text-white font-bold text-sm ${
            !isPlaying ? "opacity-100" : "opacity-50"
          }`}
        >
          OFF
        </span>
        <div
          className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ${
            isPlaying ? "translate-x-10" : "translate-x-0"
          }`}
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
