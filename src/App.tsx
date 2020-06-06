import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './Store';
import { CharactersListView, CHARACTERS_LIST_VIEW } from './List/View';

const RootStack = createStackNavigator();

export function AppContainer() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name={CHARACTERS_LIST_VIEW} component={CharactersListView} />
        <RootStack.Screen name="Details" component={() => null} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const App: () => React.ReactNode = () => (
  <Provider store={store}>
    <>
      <StatusBar barStyle="dark-content" />
      <AppContainer />
    </>
  </Provider>
);

export default App;
