import React,{ useState, useEffect } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  console.log('count:',count);
  return (
    <div className="App">
      <h1>Letter Count: {count}</h1>
      <input onChange={(e) => setCount(e.target.value.length)} />
    </div>
  );
}

export default App;
