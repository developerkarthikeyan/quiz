import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import questionsData from "./question.json"
function App() {
console.log(questionsData)
const[currentQuestion,setcurrentQuestion]=useState(0);
const[score,setscore]=useState(0);
const[showScore,setShowscore]=useState(false);
const[timer,settimer]=useState(10);

const handleAnswer=(answer)=>{
  if(answer==questionsData[currentQuestion].correct_answer) {
    setscore((prev)=>prev+1);
  }
  if(currentQuestion<questionsData.length-1){
    setcurrentQuestion((prev)=>prev+1);
    settimer(10)

  }
  else{
    setShowscore(true)
  }
}
const restart=()=>{
  setcurrentQuestion(0);
  setscore(0);
  setShowscore(false);
  settimer(10);
}

useEffect(()=>{
  let interval;
  if(timer>0 && !showScore){
    interval=setInterval(()=>{
      settimer((prevtimer)=>prevtimer-1);
    },1000)
  }
  else{
    clearInterval(interval);
    setShowscore(true);
  }
  return ()=>clearInterval(interval);
},[timer,showScore])
return (
    <>
<div className='quiz-app'>
  {showScore?(

<div className='score-section'>
<h2>Your Score :{score}/{questionsData.length}</h2>
<button onClick={restart}>Researt</button>
    </div>
  ):(

    <div className="question-section">
    <h2> Question {currentQuestion+1}</h2>
    <p>{questionsData[currentQuestion].question}</p>
      <div className='options'>
  {questionsData[currentQuestion].options.map((data,index)=>{
   return<button onClick={()=>handleAnswer(data)} key={index}>{data}</button>
  })}
  
      </div>
    <div className='timer'> timeLeft :<span>{timer}s</span></div>  
      </div>
  )}
  </div>

  </>

  );
}

export default App;
