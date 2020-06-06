import React, { useEffect, useCallback, useState } from 'react';
import {
  Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View, Image, NativeModules,
} from 'react-native';
import { useSelector } from 'react-redux';
import { fetchCharacters, ListState } from './ListSlice';
import { Store, useAppDispatch } from '../Store';
import { Character } from '../types';
import { getStatusImage } from '../utils';

const { StatusBarManager } = NativeModules;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    color: 'black',
    fontSize: 25,
    flex: 1,
  },
  cardStatus: {
    height: 25,
    width: 25,
  },
  cardTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: 8,
    width: '100%',
    height: 150,
  },
  separator: {
    height: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

const CharacterRow = ({ item }: { item: Character }) => (
  <TouchableOpacity style={styles.card}>
    <Image style={styles.cardImage} source={{ uri: item.image }} resizeMode="cover" />
    <View style={styles.cardTitleContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image source={getStatusImage(item.status)} style={styles.cardStatus} />
    </View>
  </TouchableOpacity>
);

const Separator = () => (
  <View style={styles.separator} />
);

const usePaddingTop = () => {
  const [paddingTop, setPaddingTop] = useState(0);

  useEffect(() => {
    StatusBarManager.getHeight(({ height }: { height: number}) => {
      setPaddingTop(height + 50);
    });
  }, []);

  return paddingTop;
};

export const CharactersList = () => {
  const [end, setEnd] = useState(true);

  const paddingTop = usePaddingTop();

  const { loading, failure, characters } = useSelector<Store, ListState>(state => state.characters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (end) {
      dispatch(fetchCharacters());
      setEnd(false);
    }
  }, [end]);

  const onEndReached = () => {
    setEnd(true);
  };

  const keyExtractor = useCallback(item => `${item.id}`, []);

  const renderItem = useCallback(CharacterRow, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (failure) {
    return <Text>{failure}</Text>;
  }

  return (
    <FlatList
      data={characters}
      contentContainerStyle={[styles.contentContainer, { paddingTop }]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
    />
  );
};

export const CHARACTERS_LIST_VIEW = 'CharactersList';

CharactersList.displayName = CHARACTERS_LIST_VIEW;
