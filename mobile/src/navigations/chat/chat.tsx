import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ChatScreenName } from '#libs/enums/navigation/chat-screen-name.enum';
import { type ChatNavigationParameterList } from '#libs/types/navigation/chat-navigation-parameter-list.type';
import { Chat } from '#screens/chat/chat';
import { ChatList } from '#screens/chat-list/chat-list';

const NativeStack = createNativeStackNavigator<ChatNavigationParameterList>();

const ChatNavigation: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={ChatScreenName.CHAT_LIST}
        component={ChatList}
      />
      <NativeStack.Screen name={ChatScreenName.CHAT} component={Chat} />
    </NativeStack.Navigator>
  );
};

export { ChatNavigation };
