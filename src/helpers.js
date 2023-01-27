import _ from 'lodash';
import { ACE_HIGH_VAL, ACE_LOW_VAL, PICTURE_CARD_VAL } from "./consts";

class Helpers {
  handIsSoftSeventeen = (vals) => _.min(vals) === 7 && _.max(vals) === 17;

  getHandVal = (hand, aceAsHigh) => {
    let val = 0;
    hand.forEach(([card]) => {
      val += this.getCardVal(card, aceAsHigh);
    });
    return val;
  };

  getCardVal = (cardName, aceAsHigh = false) => {
    if (cardName !== 'A') {
      const val = /\d/.test(cardName) ? parseInt(cardName, 10) : PICTURE_CARD_VAL;
      return [val, val];
    }

    return aceAsHigh ? ACE_HIGH_VAL : ACE_LOW_VAL;
  };
}

export default new Helpers();
