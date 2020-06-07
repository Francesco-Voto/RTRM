import { charactersReducer, fetchCharacters } from '../ListSlice';

describe('Given a characters reducer', () => {
  it('should handle initial state', () => {
    expect(charactersReducer(undefined, {} as any)).toEqual({
      loading: false,
      failure: null,
      characters: [],
    });
  });

  describe('when a new characters fetch is requested', () => {
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

    describe('if characters list is empty', () => {
      it('should set a loading state', () => {
        expect(charactersReducer({
          loading: false,
          failure: null,
          characters: [],
        }, {
          type: fetchCharacters.pending,
        })).toMatchObject({
          loading: true,
          characters: [],
          failure: null,
        });
      });

      describe('if characters list is filled', () => {
        it('should not set a loading state', () => {
          expect(charactersReducer({
            loading: false,
            failure: null,
            characters: [Rick],
          }, {
            type: fetchCharacters.pending,
          })).toMatchObject({
            loading: false,
            characters: [Rick],
            failure: null,
          });
        });
      });

      it('should show new characters after loading state', () => {
        const loadingState = charactersReducer({
          loading: false,
          failure: null,
          characters: [],
        }, {
          type: fetchCharacters.pending,
        });

        expect(charactersReducer(loadingState, {
          type: fetchCharacters.fulfilled,
          payload: [Rick],
        })).toMatchObject({
          loading: false,
          characters: [Rick],
          failure: null,
        });
      });

      it('should save failure when has been occurred', () => {
        const error = new Error();
        const loadingState = charactersReducer({
          loading: false,
          failure: null,
          characters: [],
        }, {
          type: fetchCharacters.pending,
        });

        expect(charactersReducer(loadingState, {
          type: fetchCharacters.rejected,
          payload: error,
        })).toMatchObject({
          loading: false,
          characters: [],
          failure: error,
        });
      });
    });
  });
});
