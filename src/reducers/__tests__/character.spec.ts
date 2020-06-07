import { characterReducer, saveCharacter } from '../character';

const Rick = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive' as 'Alive',
  species: 'Human',
  type: '',
  gender: 'male' as 'male',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [],
  url: '',
  created: new Date('1958-06-03'),
};

const Morty = {
  id: 2,
  name: 'Morty',
  status: 'Alive' as 'Alive',
  species: 'Human',
  type: '',
  gender: 'male' as 'male',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [],
  url: '',
  created: new Date('2000-06-03'),
};

describe('characterReducer reducer', () => {
  it('should handle initial state', () => {
    expect(characterReducer(undefined, {} as any)).toEqual({ character: null });
  });

  it('should handle a the save of a selected character when empty character', () => {
    expect(
      characterReducer({ character: null }, {
        type: saveCharacter.type,
        payload: Rick,
      }),
    ).toMatchObject({ character: Rick });
  });

  it('should handle a the save of a selected character when character already exist ', () => {
    expect(
      characterReducer({ character: Rick }, {
        type: saveCharacter.type,
        payload: Morty,
      }),
    ).toMatchObject({ character: Morty });
  });
});
