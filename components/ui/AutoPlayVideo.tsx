"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Click-to-play video.
 *
 * Shows the poster (thumbnail) with a large white Play button overlay.
 * When the user clicks Play (a real user gesture), the video starts
 * playing UNMUTED with sound — no autoplay-policy issues. The browser's
 * native controls take over once playback starts.
 *
 * (Component name kept as `AutoPlayVideo` to avoid touching imports — the
 * behaviour is now click-to-play.)
 */
export function AutoPlayVideo({ src, poster, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    const p = v.play();
    if (p) {
      p.then(() => setStarted(true)).catch((err) => {
        console.warn("[VideoPlayer] play() failed:", err);
        // Belt-and-suspenders fallback to muted play if even the gesture
        // call is rejected (rare — iOS low-power mode, etc.).
        v.muted = true;
        v.play()
          .then(() => setStarted(true))
          .catch(() => {});
      });
    } else {
      setStarted(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="block h-auto w-full"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controls={started}
      />

      {!started && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="group absolute inset-0 flex items-center justify-center"
        >
          {/* Soft dim so the play button reads on any thumbnail */}
          <span className="absolute inset-0 bg-ink-900/15 transition group-hover:bg-ink-900/25" />

          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,89,84,0.35)] transition group-hover:scale-105 group-active:scale-95 md:h-24 md:w-24">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-1 text-primary-500"
            >
              <path
                d="M5 3l16 9-16 9V3z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
