import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { type FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '#libs/packages/store/store';
import { Root as RootNavigation } from '#navigations/navigations';

import { ToastComponent } from '../components';
import { styles } from './styles';

const App: FC = () => {
  return (
    <StoreProvider store={store.instance}>
      <GestureHandlerRootView style={styles.root}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
        <ToastComponent />
      </GestureHandlerRootView>
    </StoreProvider>
  );
};

export { App };
