import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { charactersReducer as characters } from './List/ListSlice';

export const store = configureStore({
  reducer: {
    characters,
  },
});

export type Store = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk = ThunkAction<void, any, unknown, Action<string>>;
