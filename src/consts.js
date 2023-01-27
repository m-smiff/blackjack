import _ from 'lodash';

export const TARGET_HAND_VALUE = 21;
export const SUITS = Object.freeze(['hearts', 'clubs', 'spades', 'diamonds']);
export const CARDS = Object.freeze(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']);
export const ACE_LOW_VAL = 1;
export const ACE_HIGH_VAL = 11;
export const PICTURE_CARD_VAL = 10;
export const DEALER_HITS_BELOW_VAL = 17;
export const INITIAL_DEAL_CARD_COUNT = 2;
export const CHIP_VALS = Object.freeze([5, 10, 50, 100]);
export const MIN_DECKS = 1;
export const MAX_DECKS = 8;
export const MIN_BET = _.min(CHIP_VALS);
