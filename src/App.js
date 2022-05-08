import "./App.css";
import { Board } from "./Components/Board";
import { boardDefault, generateWordSet } from "./Words";
import Keyboard from "./Components/Keyboard";
import { createContext, useEffect, useState } from "react";
import GameOver from "./Components/GameOver";
export const AppContext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  const [curAttempt, setCurAttempt] = useState({
    attemptVal: 0,
    letterPosn: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");
  const [usedWords,setUsedWords]=useState([]);

  useEffect(() => {
    generateWordSet().then((words) => {
      setCorrectWord(words.todaysWord);
      setWordSet(words.wordSet);
      console.log(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (curAttempt.letterPosn > 4) return;
    const newBoard = { ...board };
    newBoard[curAttempt.attemptVal][curAttempt.letterPosn] = keyVal;
    setBoard(newBoard);
    setCurAttempt({ ...curAttempt, letterPosn: curAttempt.letterPosn + 1 });
  };
  
  const onEnter = () => {
    let curWord = "";
    for (let i = 0; i < 5; i++) {
      curWord += board[curAttempt.attemptVal][i];
    }
    
    if (wordSet.has(curWord.toLowerCase())) {
      setCurAttempt({ attemptVal: curAttempt.attemptVal + 1, letterPosn: 0 });
    } else {
      const newBoard={...board};
      for(let i=0;i<5;i++){
        newBoard[curAttempt.attemptVal][i]="";
      }
      setBoard(newBoard);
      setCurAttempt({attemptVal:curAttempt.attemptVal,letterPosn:0});
      alert("word not found in collection!!");
      return;
    }
    if(usedWords.includes(curWord)){
      const newBoard={...board};
      for(let i=0;i<5;i++){
        newBoard[curAttempt.attemptVal][i]="";
      }
      setBoard(newBoard);
      setCurAttempt({attemptVal:curAttempt.attemptVal,letterPosn:0});
      alert("word already used!!")
      return;
    }
    else {
      setUsedWords([...usedWords,curWord]);
    }
    if (curAttempt.letterPosn === 5) {
      setCurAttempt({ attemptVal: curAttempt.attemptVal + 1, letterPosn: 0 });
    } else return;
    if (curWord === correctWord.toUpperCase()) {
      
      setGameOver({ gameOver: true, guessedWord: true });
      return;
      
    }
    if (curAttempt.attemptVal === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      
    }
    
  };
  const onDelete = () => {
    if (curAttempt.letterPosn === 0) return;
    else {
      const newBoard = { ...board };
      newBoard[curAttempt.attemptVal][curAttempt.letterPosn - 1] = "";
      setBoard(newBoard);
      setCurAttempt({
        attemptVal: curAttempt.attemptVal,
        letterPosn: curAttempt.letterPosn - 1,
      });
    }
  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          curAttempt,
          setCurAttempt,
          onSelectLetter,
          onEnter,
          onDelete,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="wrapper">
          <Board />
        </div>
        <div className="wrapper">
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
