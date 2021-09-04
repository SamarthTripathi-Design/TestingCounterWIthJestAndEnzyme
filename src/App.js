import { useState } from 'react';
import './App.css';

function App() {

  const [counter, setcounter] = useState(0)
  const [error, seterror] = useState(false)

  const incCount = () => {
    if(error){
      seterror(false)
    }
    setcounter(counter +1)
  }

  const decCount =() =>{
    if (counter > 0)
    {setcounter(counter -1)}
        else{seterror(true)}
    
  }

  return (
    <div data-test="component-app" >
     <h1 data-test="counter-display"> The counter value is <span data-test="count">{counter}</span></h1>
     <div data-test="error-message" className={`error ${error ? '' : 'hidden'}`}>
        The counter cannot go below 0
      </div>
     <button data-test="increment-button" onClick={incCount} >Increment counter</button>
     <button data-test="decrement-button" onClick={decCount} >Decrement counter</button>
    </div>
  );
}

export default App;
