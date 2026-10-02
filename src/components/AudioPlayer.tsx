import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { MUSIC } from '../config';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC.src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;
    audioRef.current = audio;

    // Próba autoplay z dźwiękiem (działa np. na desktopie, jeśli przeglądarka pozwala)
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Zablokowane przez politykę przeglądarki (typowe na mobile) -
        // uruchamiamy od razu wyciszone, bo to przeglądarki zawsze dopuszczają,
        // a dźwięk odblokujemy automatycznie przy pierwszej interakcji użytkownika.
        if (audioRef.current) {
          audioRef.current.muted = true;
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      });

    // Odblokuj dźwięk przy pierwszej interakcji użytkownika (dotyk, scroll, klik, klawisz)
    const unlockAudio = () => {
      const current = audioRef.current;
      if (current) {
        current.muted = false;
        setIsMuted(false);
        if (current.paused) {
          current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else {
          setIsPlaying(true);
        }
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
    window.addEventListener('scroll', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

    return () => {
      cleanupListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          if (audioRef.current) audioRef.current.muted = false;
        })
        .catch(() => {});
    } else {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const isActuallyAudible = isPlaying && !isMuted;

  return (
    <div className="fixed bottom-4 right-4 z-50 safe-pb">
      <button
        onClick={handleToggle}
        aria-label={isActuallyAudible ? 'Wycisz muzykę' : 'Włącz muzykę'}
        title={isActuallyAudible ? 'Wycisz muzykę' : 'Włącz muzykę w tle'}
        className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-[var(--color-line)] shadow-sm flex items-center justify-center text-[var(--color-ink)] transition-transform duration-150 active:scale-90 hover:border-[var(--color-terracotta)]/40 cursor-pointer"
      >
        {isActuallyAudible ? (
          <Volume2 className="w-4 h-4 text-[var(--color-terracotta)]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[var(--color-muted)]" />
        )}
      </button>
    </div>
  );
};
