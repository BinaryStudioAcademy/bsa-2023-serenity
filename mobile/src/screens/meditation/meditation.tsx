import React from 'react';

import imagePlaceholder from '#assets/img/card-image-placeholder.png';
import meditationBackground from '#assets/img/meditation-background.png';
import { Image, Player, Text, View } from '#libs/components/components';
import { useAppRoute, useAppSelector } from '#libs/hooks/hooks';

import { TITLE_LINE_COUNT } from './libs/constants/constants';
import { styles } from './styles';

type RouteParameters = {
  duration: number;
};

const Meditation: React.FC = () => {
  const { selectedMeditationEntry } = useAppSelector(({ meditation }) => {
    return {
      selectedMeditationEntry: meditation.selectedMeditationEntry,
    };
  });

  const route = useAppRoute();
  const { duration }: RouteParameters = route.params as RouteParameters;

  return (
    <View style={styles.wrapper}>
      <Image source={meditationBackground} style={styles.background} />
      <View style={styles.contentWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={imagePlaceholder} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={TITLE_LINE_COUNT}>
          {selectedMeditationEntry.title}
        </Text>
        <Text style={styles.purpose}>Meditation</Text>

        <Player duration={duration} />
      </View>
    </View>
  );
};

export { Meditation };
