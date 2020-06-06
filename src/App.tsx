import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './reducers';
import { CharactersListView } from './List/View';
import { CharacterDetailsView } from './Details/View';
import { CHARACTERS_LIST_VIEW, CHARACTERS_DETAILS_VIEW } from './consts';

const RootStack = createStackNavigator();

export function AppContainer() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name={CHARACTERS_LIST_VIEW} component={CharactersListView} />
        <RootStack.Screen name={CHARACTERS_DETAILS_VIEW} component={CharacterDetailsView} />
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
