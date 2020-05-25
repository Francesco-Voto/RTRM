import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpClient } from '../api/client';
import { Character } from '../types';

const FETCH_CHARACTERS = 'fetchCharacters';

export function nextCharactersFetcher() {
  let page = 0;
  return async () => {
    page += 1;
    const { data } = await httpClient.get(`/character/?page=${page}`);
    return data;
  };
}

export const fetchCharacters = createAsyncThunk(
  FETCH_CHARACTERS,
  nextCharactersFetcher(),
);

export type ListState = {
  loading: boolean;
  failure: Error | null;
  characters: Character[];
};

const initialState: ListState = {
  loading: false,
  failure: null,
  characters: [],
};

const charactersSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.loading = false;
      state.characters = [...state.characters, ...action.payload.results];
    });
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = state.characters.length === 0;
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.loading = false;
      state.failure = action.payload;
    });
  },
});



export const charactersReducer = charactersSlice.reducer;