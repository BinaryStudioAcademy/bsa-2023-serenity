import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { IconButton, Text, View } from '#libs/components/components';
import { AppColor, ProfileScreenName } from '#libs/enums/enums';
import { useAppRoute, useNavigation } from '#libs/hooks/hooks';
import { type ProfileNavigationParameterList } from '#libs/types/types';

import { BackButton, Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title?: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
  isVisible?: boolean;
  isProfileVisible?: boolean;
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
  isVisible = true,
  isProfileVisible = false,
}) => {
  const navigation =
    useNavigation<NavigationProp<ProfileNavigationParameterList>>();
  const { name } = useAppRoute();

  const hasValue = Boolean(badgeCount);

  const handleIconPress = (): void => {
    navigation.navigate(ProfileScreenName.PROFILE);
  };

  if (!isVisible) {
    return (
      <View style={styles.transparentHeader}>
        {isArrowVisible && <BackButton />}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.header,
        isArrowVisible && styles.headerCenter,
        isProfileVisible && styles.settings,
      ]}
    >
      {isArrowVisible && <BackButton />}

      <View style={styles.titleBadgeContainer}>
        <Text style={styles.title}>{title ?? name}</Text>
        {hasValue && <Badge count={badgeCount} />}
      </View>
      {isProfileVisible && (
        <View style={styles.settingsContainer}>
          <IconButton
            onPress={handleIconPress}
            color={AppColor.BLUE_300}
            iconName="user"
          />
        </View>
      )}
    </View>
  );
};

export { Header };
