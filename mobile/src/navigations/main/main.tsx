import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import { AppColor, MainScreenName } from '#libs/enums/enums';
import { type TabNavigationParameterList } from '#libs/types/types';
import { ChatList } from '#screens/chat-list/chat-list';
import { Home } from '#screens/home/home';

import { styles } from './styles';

const BottomTab = createBottomTabNavigator<TabNavigationParameterList>();

const tabNavigatorOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  tabBarActiveTintColor: AppColor.BLUE_300,
  tabBarInactiveTintColor: AppColor.GRAY_400,
  tabBarShowLabel: false,
  tabBarStyle: styles.tabBar,
};

const Main: React.FC = () => {
  return (
    <BottomTab.Navigator screenOptions={tabNavigatorOptions}>
      <BottomTab.Screen
        name={MainScreenName.HOME}
        component={Home}
        options={{ tabBarIcon: HomeIcon }}
      />
      <BottomTab.Screen
        name={MainScreenName.CHAT}
        component={ChatList}
        options={{ tabBarIcon: ChatIcon }}
      />
    </BottomTab.Navigator>
  );
};

export { Main };
