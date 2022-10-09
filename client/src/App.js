import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'

function App() {
  

  //setting React State for Equation
  const [equation, setEquation] = useState("");
  //encoding Equation
  const encodedEq = equation.split('/').join('d');


  


//Submit Equation
const submitEquation = () => {

  Axios.post('http://localhost:3001/api/calculate',{mathEquation:encodedEq}).then((response)=>{
    console.log(response.data);
    
    document.querySelector("#disp").value = response.data;
  })
  
  };



//Display Equation
const disEquation = (e) => {

  let val = e
  console.log(val)
  
  document.querySelector("#disp").value += val

  setEquation(document.querySelector("#disp").value)
}




//Clear Display

const clrDisp = () => {
  document.querySelector("#disp").value = ""
  setEquation(document.querySelector("#disp").value) 
}




  return (
    <div className="App">
     <h1>calculator application</h1>
      <div className="form">

   
            <div class="calculator">
      
           {/* calculator display */}
          <input type="text" name="equation" onChange={(e)=>{
            setEquation(e.target.value)
          }}  id="disp"/>
          

        <div class="buttons">
          <div class="operators">
            <button onClick={(e)=>{disEquation(e.target.innerText)}} >+</button>
            <button onClick={(e)=>{disEquation(e.target.innerText)}}>-</button>
            <button onClick={(e)=>{disEquation(e.target.innerText)}}>&times;</button>
            <button onClick={(e)=>{disEquation("/")}}>&divide;</button>
          </div>
          <div class="leftPanel">
            <div class="numbers">
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>7</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>8</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>9</button>
            </div>
            <div class="numbers">
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>4</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>5</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>6</button>
            </div>
            <div class="numbers">
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>1</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>2</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>3</button>
            </div>
            <div class="numbers">
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>0</button>
              <button onClick={(e)=>{disEquation(e.target.innerText)}}>.</button>
              <button id="clear" onClick={clrDisp}>C</button>
            </div>
          </div>

          {/* Result Button */}
          <button class="equal" id="result" onClick={submitEquation}>=</button>
        </div>
      </div>
          
       
      </div>
    </div>
  );
}

export default App;
