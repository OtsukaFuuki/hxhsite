import { useRef, useState } from "react";

export default function AudioPlayerSwitch() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="flex items-center space-x-4">
      <div
        className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer relative ${
          isPlaying ? "bg-customGreen " : "bg-gray-300"
        }`}
        onClick={togglePlay}
      >
        {/* ON / OFF Text */}
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
        {/* Toggle Button */}
        <div
          className={`bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ${
            isPlaying ? "translate-x-10" : "translate-x-0"
          }`}
        />
      </div>
      <audio ref={audioRef} src="/sounds/hunter1.mp3" loop />
    </div>
  );
}
