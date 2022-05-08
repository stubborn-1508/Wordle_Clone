import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver,curAttempt,correctWord}=useContext(AppContext);
  return (
    <div className='game'>
        <h3>{gameOver.guessedWord?"You Guessed correctly!!":"OOPS!! wrong guess"}</h3>
        <h1>Correct:{correctWord}</h1>
        {gameOver.guessedWord&&(<h3>You guessed in {curAttempt.attemptVal} attempts</h3>)}
    </div>
  );
}

export default GameOver;