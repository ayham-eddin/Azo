import { useRef, useState, useMemo, useEffect } from "react";
import "./Letter.css";

type LetterProps = {
  className?: string;
};

const Letter = ({}: LetterProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl = "./";

  // Put your images inside /public, then list them here:
  // public/hero1.png, public/hero2.png, public/hero3.png ...
  const images = useMemo<string[]>(
    () => [
      `${baseUrl}hero.png`,
      `${baseUrl}hero2.png`,
      `${baseUrl}hero3.png`,
      `${baseUrl}hero4.png`,
      `${baseUrl}hero5.png`,
      `${baseUrl}hero6.png`,
      `${baseUrl}hero7.png`,
      `${baseUrl}hero8.png`,
      `${baseUrl}hero9.png`,
      `${baseUrl}hero10.png`,
      // add more...
    ],
    [baseUrl],
  );

  const currentImage = images[currentIndex] ?? images[0];

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
    setCurrentIndex(0);
  };

  // Slideshow: only runs while open
  useEffect(() => {
    if (!isOpen) return;
    if (images.length <= 1) return;

    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, [isOpen, images.length]);

  // (Optional) preload images for smoother switching
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return (
    <div className="containerLetter">
      <audio ref={audioRef} src="./song.mp3" preload="auto" />

      <div
        className={`envelope-wrapper ${isOpen ? "flap" : ""}`}
        onClick={toggleFlap}
      >
        <div className="envelope">
          <div className="letter">
            {/* Only show the photo, no text */}
            <img src={currentImage} alt="hero photo" className="imgBirthday" />
          </div>
        </div>

        <div className="heart"></div>
        <div className="heartText">click me</div>
      </div>
    </div>
  );
};

export { Letter };
