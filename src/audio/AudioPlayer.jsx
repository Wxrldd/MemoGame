import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

export default function AudioPlayer() {
  const [sound, setSound] = React.useState();

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./musique.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      setSound(sound);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return null;
}
