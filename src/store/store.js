import { configureStore } from '@reduxjs/toolkit'
import optionsSlice from './optionsSlice'
import gamePlaySlice from './gamePlaySlice'

export const store = configureStore({
  reducer: {
    options: optionsSlice,
    gamePlay: gamePlaySlice
  },
})
