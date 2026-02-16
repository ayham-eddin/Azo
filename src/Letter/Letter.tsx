import { useRef, useState } from "react";
import "./Letter.css";

type LetterProps = {
  className?: string;
};

const Letter = ({}: LetterProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const playSong = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
      console.error("Audio play blocked:", err);
    }
  };

  const stopSong = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };

  const toggleFlap = async () => {
    if (!isOpen) {
      setIsOpen(true);
      await playSong();
      return;
    }

    setIsOpen(false);
    stopSong();
  };

  return (
    <div className="containerLetter">
      {/* IMPORTANT: this is what makes audioRef.current not null */}
      <audio ref={audioRef} src="/song.mp3" preload="auto" />

      <div
        className={`envelope-wrapper ${isOpen ? "flap" : ""}`}
        onClick={toggleFlap}
      >
        <div className="envelope">
          <div className="letter">
            {/* Use imported image (recommended for src/assets in Vite) */}
            <img src="/hero.png" alt="birthday" className="imgBirthday" />
          </div>
        </div>

        <div className="heart"></div>
        <div className="heartText">click me</div>
      </div>
    </div>
  );
};

export { Letter };
