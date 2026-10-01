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

    // Try autoplay
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Expected browser autoplay policy block
        setIsPlaying(false);
      });

    // Unlock audio on first user gesture
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
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
        className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-md border border-[#211d1a24] shadow-sm flex items-center justify-center text-[#211d1a] transition-transform duration-150 active:scale-90 hover:border-[#b8552f]/40"
      >
        {isActuallyAudible ? (
          <Volume2 className="w-4 h-4 text-[#b8552f]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#8a8172]" />
        )}
      </button>
    </div>
  );
};
