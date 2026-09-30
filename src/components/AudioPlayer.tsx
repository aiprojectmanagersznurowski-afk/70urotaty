import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { siteConfig } from '../config/site';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(siteConfig.media.audio.src);
    audio.loop = true;
    audio.volume = siteConfig.media.audio.defaultVolume;
    audioRef.current = audio;

    // Handle user interaction to unlock audio
    const handleFirstInteraction = () => {
      if (hasInteracted) return;
      setHasInteracted(true);

      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay might still be blocked, wait for user click on button
            setIsPlaying(false);
          });
      }

      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => {
          console.warn('Audio play request failed:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      <div className="group relative flex items-center">
        {/* Floating Player pill */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Wycisz muzykę' : 'Włącz muzykę w tle'}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'bg-[#254436]/90 border-[#C5A059]/40 text-[#FAF8F5] tuscan-gold-glow hover:bg-[#254436]'
              : 'bg-[#FAF8F5]/90 border-[#1E1C1A]/15 text-[#1E1C1A]/80 hover:bg-[#FAF8F5]'
          }`}
        >
          {isPlaying && !isMuted ? (
            <div className="flex items-center gap-1 h-3.5 w-4 justify-center">
              <span className="w-0.5 bg-[#C5A059] h-3.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#C5A059] h-2.5 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 bg-[#C5A059] h-3 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <Music className="w-4 h-4 text-[#C5A059]" />
          )}

          <span className="text-xs font-medium tracking-wide">
            {isPlaying && !isMuted ? 'Muzyka gra' : 'Muzyka'}
          </span>

          <span
            onClick={toggleMute}
            className="p-0.5 rounded hover:bg-white/10 transition-colors"
            title={isMuted ? 'Wyłącz wyciszenie' : 'Wycisz'}
          >
            {isPlaying && !isMuted ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            )}
          </span>
        </button>

        {/* Hover / Tooltip info */}
        <div className="pointer-events-none absolute right-0 bottom-full mb-2 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[#1E1C1A] text-[#FAF8F5] text-[11px] rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-md border border-[#C5A059]/30">
            {isPlaying && !isMuted ? 'Kliknij, aby zatrzymać' : 'Toskański klimat w tle'}
          </div>
        </div>
      </div>
    </div>
  );
};
