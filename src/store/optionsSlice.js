import { createSlice } from '@reduxjs/toolkit'
import { MIN_DECKS } from '../consts';

const initialState = {
  displayHandVals: true,
  playerStandOnTwentyOne: true,
  dealerHitsSoftSeventeen: false,
  deckCount: MIN_DECKS,
  allowSurrender: false
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleDisplayHandVals: (state) => {
      state.options.displayHandVals = !state.options.displayHandVals;
    },
    togglePlayerStandOnTwentyOne: (state) => {
      state.options.playerStandOnTwentyOne = !state.options.playerStandOnTwentyOne;
    },
    toggleDealerHitsSoftSeventeen: (state) => {
      state.options.dealerHitsSoftSeventeen = !state.options.dealerHitsSoftSeventeen;
    },
    setDeckCount: (state, action) => {
      state.options.deckCount = action.payload;
    },
    toggleAllowSurrender: (state) => {
      state.options.allowSurrender = !state.options.allowSurrender;
    },
  }
});

export const { setDeckCount, toggleDealerHitsSoftSeventeen, toggleAllowSurrender, togglePlayerStandOnTwentyOne } = optionsSlice.actions

export const selectDisplayHandVals = ({ options }) => options.displayHandVals;
export const selectDeckCount = ({ options }) => options.deckCount;
export const selectDealerHitsSoftSeventeen = ({ options }) => options.dealerHitsSoftSeventeen;
export const selectPlayerStandOnTwentyOne = ({ options }) => options.playerStandOnTwentyOne;
export const selectAllowSurrender = ({ options }) => options.allowSurrender;

export default optionsSlice.reducer;
