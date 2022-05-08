import React, { useCallback, useEffect } from 'react'
import Key from './Key';
import { AppContext } from '../App';
import { useContext } from 'react';
function Keyboard() {
    const {onDelete,onEnter,onSelectLetter,disabledLetters}=useContext(AppContext);
    const key1=['Q','W','E','R','T','Y','U','I','O','P'];
    const key2=['A','S','D','F','G','H','J','K','L'];
    const key3=['Z','X','C','V','B','N','M'];
    const handleKeyboard=useCallback((event)=>{
        if(event.key==="Enter")onEnter();
        else if(event.key==="Backspace")onDelete();
        else{
            key1.forEach((key)=>{
                if(event.key.toUpperCase()===key)onSelectLetter(key);
            });
            key2.forEach((key)=>{
                if(event.key.toUpperCase()===key)onSelectLetter(key);
            });
            key3.forEach((key)=>{
                if(event.key.toUpperCase()===key)onSelectLetter(key);
            });
        }
    });
    useEffect(()=>{
        document.addEventListener("keydown",handleKeyboard);
        return()=>{
            document.removeEventListener("keydown",handleKeyboard);

        }

    },[handleKeyboard]);
  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
        <div className="line1">
            {key1.map((key)=>{
                return(<div><Key keyVal={key} disabled={disabledLetters.includes(key)}/></div>);
            })}
        </div>
        <div className="line2">
            {key2.map((key)=>{
                return(<div><Key keyVal={key} disabled={disabledLetters.includes(key)}/></div>);
            })}
        </div>
        <div className="line3">
            <Key keyVal={'ENTER'} bigKey/>
            {key3.map((key)=>{
                return(<div><Key keyVal={key} disabled={disabledLetters.includes(key)}/></div>);
            })}
            <Key keyVal={'DELETE'} bigKey/>
        </div>
    </div>
  );
}

export default Keyboard