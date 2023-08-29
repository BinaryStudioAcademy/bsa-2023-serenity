import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';

import { START_TIME, STEP } from '../../libs/constants.js';
import { type Meditation } from '../../libs/types.js';
import { Controls } from './controls/controls.js';
import { ProgressBar } from './progress-bar/progress-bar.js';

type Properties = {
  src: string;
  trackIndex: number;
  onSetTrackIndex: (index: number) => void;
  onSetCurrentTrack: (track: Meditation) => void;
  tracks: Meditation[];
};

const AudioPlayer: React.FC<Properties> = ({
  src,
  trackIndex,
  tracks,
  onSetCurrentTrack,
  onSetTrackIndex,
}) => {
  const [timeProgress, setTimeProgress] = useState<number>(START_TIME);
  const [duration, setDuration] = useState<number>(START_TIME);

  const audioReference = useRef<HTMLAudioElement | null>(null);
  const progressBarReference = useRef<HTMLInputElement | null>(null);

  const onLoadedMetadata = useCallback((): void => {
    if (audioReference.current) {
      const seconds = audioReference.current.duration;
      setDuration(seconds);

      if (progressBarReference.current) {
        progressBarReference.current.max = seconds.toString();
      }
    }
  }, []);

  const handleTimeProgress = useCallback((currentTime: number): void => {
    setTimeProgress(currentTime);
  }, []);

  const handleNext = useCallback(() => {
    const nextTrackIndex = (trackIndex + STEP) % tracks.length;
    onSetTrackIndex(nextTrackIndex);
    onSetCurrentTrack(tracks[nextTrackIndex] as Meditation);
  }, [onSetCurrentTrack, onSetTrackIndex, trackIndex, tracks]);

  useEffect(() => {
    const currentAudio = audioReference.current;

    if (currentAudio) {
      currentAudio.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('loadedmetadata', onLoadedMetadata);
      }
    };
  }, [onLoadedMetadata]);

  return (
    <>
      <audio
        src={src}
        ref={audioReference}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      >
        <track kind="captions" />
      </audio>
      <ProgressBar
        progressBarReference={progressBarReference}
        audioReference={audioReference}
        timeProgress={timeProgress}
        duration={duration}
      />
      <Controls
        audioReference={audioReference}
        progressBarReference={progressBarReference}
        duration={duration}
        onTimeProgress={handleTimeProgress}
        trackIndex={trackIndex}
        onSetTrackIndex={onSetTrackIndex}
        onSetCurrentTrack={onSetCurrentTrack}
        tracks={tracks}
        onNextTrack={handleNext}
      />
    </>
  );
};

export { AudioPlayer };
