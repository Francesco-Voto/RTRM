import React from 'react';
import {
  SafeAreaView, StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/Store';
import { CharactersList } from './src/List/View';

const App: () => React.ReactNode = () => (
  <Provider store={store}>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CharactersList />
      </SafeAreaView>
    </>
  </Provider>
);

export default App;
