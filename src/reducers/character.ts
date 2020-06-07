import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types';

export type CharacterState = {
  character: Character | null;
};

const initialState: CharacterState = {
  character: null,
};

const characterSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    saveCharacter(state, action) {
      return ({
        ...state,
        character: action.payload,
      });
    },
  },
});

export const { saveCharacter } = characterSlice.actions;

export const characterReducer = characterSlice.reducer;
