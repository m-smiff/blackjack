import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash';
import { ACE_HIGH_VAL, ACE_LOW_VAL, CARDS, INITIAL_DEAL_CARD_COUNT, PICTURE_CARD_VAL, SUITS, TARGET_HAND_VALUE } from '../consts';

const initialState = {
  roundCount: 0,
  shoe: [],
  playerHand: [],
  playerHasStood: false,
  dealerHand: [],
  dealerHasStood: false
};

export const gamePlaySlice = createSlice({
  name: 'gamePlay',
  initialState,
  reducers: {
    loadShoe: (state, action) => {
      // Shoe stored as a 2D array with each array element representing a deck.
      // Payload expected is the number of decks to be used.
      state.shoe = new Array(action.payload).fill([]);
      for (let i = 0; i < action.payload; i++) {
        SUITS.forEach((suit) => {
          // Each deck to contain 4 objects, one for each suit.
          // Each suit object to contain a 'suit' string and 'availableCards' array,
          // which contains the 13 card names, e.g. ['A', '1', '2'...]
          state.shoe[i] = [...state.shoe[i], { suit, availableCards: CARDS }];
        });
      };
    },
    deal: (state) => {
      const { dealerHand, playerHand, shoe } = state;
      playerHand.length = 0;
      state.playerHasStood = false;
      dealerHand.length = 0;
      state.dealerHasStood = false;
      while (playerHand.length < INITIAL_DEAL_CARD_COUNT && dealerHand.length < INITIAL_DEAL_CARD_COUNT) {
        dealCard(shoe, playerHand);
        dealCard(shoe, dealerHand);
      };
    },
    incrementRoundCount: (state) => {
      state.roundCount++;
    },
    playerHit: (state) => {
      const { playerHand, shoe } = state;
      dealCard(shoe, playerHand);
    },
    dealerHit: (state) => {
      const { dealerHand, shoe } = state;
      dealCard(shoe, dealerHand);
    },
    dealerStand: (state) => {
      state.dealerHasStood = true;
    },
    playerStand: (state) => {
      state.playerHasStood = true;
    }
  },
});

const dealCard = (shoe, receivingHand) => {
  const randomDeck = _.sample(shoe);
  const randomSuit = _.sample(randomDeck);
  const randomCard = _.sample(randomSuit.availableCards);
  // Cards to be stored as a 2D array, with each array element storing the card name and suit,
  // e.g. [['A', 'spades'], ['10', 'spades']]
  receivingHand.push([randomCard, randomSuit.suit]);
  _.pull(randomSuit.availableCards, randomCard); // Remove dealt card from shoe
  if (randomSuit.availableCards.length === 0) {
    _.remove(randomDeck, (deck) => deck.suit === randomSuit.suit); // Clean up empty arrays (rare)
  }
};

export const { deal, incrementRoundCount, dealerHit, dealerStand, playerHit, playerStand, loadShoe } = gamePlaySlice.actions


export const selectPlayerHand = ({ gamePlay }) => gamePlay.playerHand;
export const selectDealerHand = ({ gamePlay }) => gamePlay.dealerHand;
export const selectPlayerHandTotals = (state) => getPossibleHandTotals(selectPlayerHand(state));
export const selectDealerHandTotals = (state) => getPossibleHandTotals(selectDealerHand(state));
export const selectDealerUpCardVal = (state) => (
  selectDealerHand(state)[1] ? getCardVal(selectDealerHand(state)[1][0], true) : 0
);
export const selectPlayerHasBust = (state) => (
  getPossibleHandTotals(selectPlayerHand(state)).every((total) => total > TARGET_HAND_VALUE)
);
export const selectPlayerHasStood = ({ gamePlay }) => gamePlay.playerHasStood;
export const playerHasBlackjack = (state) => (
  isBlackJack(selectPlayerHand(state), getPossibleHandTotals(selectPlayerHand(state)))
);
export const selectDealerHasBust = (state) => (
  getPossibleHandTotals(selectDealerHand(state)).every((total) => total > TARGET_HAND_VALUE)
);
export const selectDealerHasStood = ({ gamePlay }) => gamePlay.playerHasStood;
export const dealerHasBlackjack = (state) => (
  isBlackJack(selectDealerHand(state), getPossibleHandTotals(selectDealerHand(state)))
);

// A hard hand is a hand without an ace, or where the ace must count as 1 to avoid busting.
// A soft hand is a hand that includes an ace valued as 11, as opposed to 1.
const getPossibleHandTotals = (hand) => {
  const possibleTotals = []
  if (hand.length > 0) {
    // non-ace
    let nonAce = 0;
    hand.forEach(([card]) => { if (card !== 'A') nonAce += getCardVal(card); });
    possibleTotals.push(nonAce);
  } else {
    possibleTotals.push(0);
  }
  return _.sortedUniq(possibleTotals);
};

const getCardVal = (cardName, aceAsHigh = false) => {
  if (cardName !== 'A') {
    return /\d/.test(cardName) ? parseInt(cardName, 10) : PICTURE_CARD_VAL;
  }
  return aceAsHigh ? ACE_HIGH_VAL : ACE_LOW_VAL;
};

const isBlackJack = (hand, possibleTotals) => (
  hand.length === INITIAL_DEAL_CARD_COUNT && possibleTotals[0] === TARGET_HAND_VALUE ? true : false
);

export const selectRoundCount = ({ gamePlay }) => gamePlay.roundCount;
export const selectRoundIsOver = (state) => (
  selectPlayerHasBust(state)
    || (selectPlayerHasStood(state) && (selectDealerHasStood(state) || selectDealerHasBust(state)))
);

export default gamePlaySlice.reducer;
