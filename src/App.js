import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { deal, incrementRoundCount, loadShoe, selectRoundCount, selectRoundIsOver } from './store/gamePlaySlice';
import { useEffect } from 'react';
import PlayerHand from './components/PlayerHand/PlayerHand';
import DealerHand from './components/DealerHand/DealerHand';
import { selectDeckCount } from './store/optionsSlice';

function App() {
  const dispatch = useDispatch();
  const deckCount = useSelector((state) => selectDeckCount(state));
  const roundCount = useSelector((state) => selectRoundCount(state));
  const roundIsOver = useSelector((state) => selectRoundIsOver(state));

  useEffect(() => {
    dispatch(loadShoe(deckCount));
  }, [dispatch, deckCount, roundCount]);

  useEffect(() => {
    if (roundIsOver) {
      dispatch(incrementRoundCount());
      dispatch(loadShoe(deckCount));
    }
  }, [dispatch, roundIsOver]);

  return (
    <div>
      <h1>Ploppy Blackjack</h1>
      {<button onClick={() => dispatch(deal())}>Deal</button>}
      {<DealerHand />}
      {<PlayerHand />}
    </div>
  );
}

export default App;
