import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

function Letter({letterPosn,attemptVal}) {
    const {board,correctWord,curAttempt,disabledLetters,setDisabledLetters}=useContext(AppContext);
    const letter=board[attemptVal][letterPosn];
    const correct=correctWord.toUpperCase()[letterPosn]===letter;
    const almost=!correct&&letter!==""&&correctWord.toUpperCase().includes(letter);
    const letterState=curAttempt.attemptVal>attemptVal&&(correct?"correct":(almost?"almost":"error"));
    useEffect(()=>{
      if(letter!==""){
        setDisabledLetters((prev)=>[...prev,letter]);
      }
    },[curAttempt.attemptVal]);
    return (
    <div className='letter' id={letterState}>{letter}</div>
  );
}

export default Letter;