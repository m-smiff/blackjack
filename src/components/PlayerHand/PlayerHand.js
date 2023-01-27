import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_DEAL_CARD_COUNT, TARGET_HAND_VALUE } from '../../consts';
import { playerHit, selectPlayerHand, playerStand, selectPlayerHasStood, selectPlayerHasBust, playerHasBlackjack, selectPlayerHandTotals } from '../../store/gamePlaySlice';
import { selectDisplayHandVals, selectPlayerStandOnTwentyOne } from '../../store/optionsSlice';

const PlayerHand = () => {
  const dispatch = useDispatch();
  const displayHandVals = useSelector((state) => selectDisplayHandVals(state));
  const playerStandOnTwentyOne = useSelector((state) => selectPlayerStandOnTwentyOne(state));

  const cards = useSelector((state) => selectPlayerHand(state));
  const possibleTotals = useSelector((state) => selectPlayerHandTotals(state));
  const hasStood = useSelector((state) => selectPlayerHasStood(state));
  const hasBust = useSelector((state) => selectPlayerHasBust(state));
  const hasBlackjack = useSelector((state) => playerHasBlackjack(state));

  // useEffect(() => {
  //   if (playerStandOnTwentyOne && (minVal === TARGET_HAND_VALUE || maxVal === TARGET_HAND_VALUE)) {
  //     dispatch(playerStand());
  //   }
  // }, [dispatch, playerStandOnTwentyOne, minVal, maxVal]);

  const gamePlayActionButtons = () => (
    <>
      {!(hasBust || hasStood) && <button onClick={() => dispatch(playerHit())}>Hit</button>}
      {!(hasBust || hasStood) && <button onClick={() => dispatch(playerStand())}>Stand</button>}
    </>
  );

  const displayCards = () => (
    cards.map(([card, suit]) => (
      ` [${card} of ${suit}] `
    ))
  );

  // const displayValue = () => {
  //   if (minVal === maxVal || (maxVal > TARGET_HAND_VALUE)) return minVal;
  //   if (hasStood || hasBlackjack) return maxVal;
  //   return `${minVal} / ${maxVal}`; 
  // };

  const displayTotals = () => {
    return possibleTotals;
  };

  return (
    <div>
      <h2>Player</h2>
      <h3>{displayCards()}</h3>
      {displayHandVals && <h3>{displayTotals()}</h3>}
      {(cards.length >= INITIAL_DEAL_CARD_COUNT && !(hasBust || hasStood)) && gamePlayActionButtons()}
    </div>
  );
}

export default PlayerHand;
