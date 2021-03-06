import React, { memo } from 'react';
import {
  Text, StyleSheet, View, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ScrollView, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRefContext } from '@react-navigation/stack';
import { Store } from '../reducers';
import { CharacterState } from './reducers/character';
import { getStatusImage } from '../utils';
import { CHARACTERS_DETAILS_VIEW } from '../consts';

const styles = StyleSheet.create({
  name: {
    color: 'black',
    fontSize: 25,
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
  },
  titleField: {
    color: 'grey',
    fontSize: 20,
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
  },
  valueField: {
    color: 'black',
    fontSize: 22,
    flex: 1,
    marginLeft: 5,
  },
  status: {
    height: 25,
    width: 25,
  },
  nameContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentParent: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

const CharacterDetails = () => {
  const { character } = useSelector<Store, CharacterState>(state => state.selectedCharacter);

  return (
    <GestureHandlerRefContext.Consumer>
      {ref => (
        <NativeViewGestureHandler waitFor={ref}>
          <ScrollView bounces={false} contentContainerStyle={styles.contentContainer}>
            <Image style={styles.image} source={{ uri: character?.image }} />
            <View style={styles.contentParent}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{character?.name}</Text>
                <Image source={getStatusImage(character?.status)} style={styles.status} />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Gender</Text>
                <Text style={styles.valueField}>{character?.gender}</Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Species</Text>
                <Text style={styles.valueField}>{character?.species}</Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Gender</Text>
                <Text style={styles.valueField}>{character?.gender}</Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.titleField}>Origin</Text>
                <Text style={styles.valueField}>{character?.origin.name}</Text>
              </View>
            </View>
          </ScrollView>
        </NativeViewGestureHandler>
      )}
    </GestureHandlerRefContext.Consumer>
  );
};

CharacterDetails.displayName = CHARACTERS_DETAILS_VIEW;

export const CharacterDetailsView = memo(CharacterDetails);
