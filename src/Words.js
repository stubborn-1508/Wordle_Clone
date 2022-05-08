import wordBank from "./Wordle-bank.txt"
export const boardDefault=[
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
  ];

  export const generateWordSet=async()=>{
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
    .then((response)=>response.text())
    .then((result)=>{
      const wordArr= result.split("\r\n");
      wordSet=new Set(wordArr);
      todaysWord=wordArr[Math.floor(Math.random()*wordArr.length)];
    });
    
    return({wordSet,todaysWord});
  };