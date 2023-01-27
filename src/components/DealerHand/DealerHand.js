import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TARGET_HAND_VALUE } from '../../consts';
import { dealerHit, selectDealerHand, selectDealerHandTotals, selectDealerHasBust, selectDealerUpCardVal, selectPlayerHasBust, selectPlayerHasStood } from '../../store/gamePlaySlice';
import { selectDisplayHandVals } from '../../store/optionsSlice';

const DealerHand = () => {
  const dispatch = useDispatch();
  const displayHandVals = useSelector((state) => selectDisplayHandVals(state));
  const hand = useSelector((state) => selectDealerHand(state));
  const upCardValue = useSelector((state) => selectDealerUpCardVal(state));
  const possibleTotals = useSelector((state) => selectDealerHandTotals(state));
  const dealerHasBust = useSelector((state) => selectDealerHasBust(state));
  const playerHasBust = useSelector((state) => selectPlayerHasBust(state));
  const playerHasStood = useSelector((state) => selectPlayerHasStood(state));
  const concealHole = !(playerHasBust || playerHasStood);

  useEffect(() => {
    if (playerHasStood && !dealerHasBust) dispatch(dealerHit());
  }, [dispatch, playerHasStood, possibleTotals, dealerHasBust]);

  const displayCards = () => (
    hand.map(([card, suit], i) => (
      (concealHole && i === 0) ? ` [XXXXXXXX] ` : ` [${card} of ${suit}] `
    ))
  );

  const displayTotals = () => {
    if (concealHole) return upCardValue;
    return possibleTotals;
  };


  return (
    <div>
      <h2>Dealer</h2>
      <h3>{displayCards()}</h3>
      {displayHandVals && <h3>{displayTotals()}</h3>}
    </div>
  );
}

export default DealerHand;
