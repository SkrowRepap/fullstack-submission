import './App.css';
import React, { useState }  from 'react';


const Display = ({text}) => <h1> {text} </h1>

const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn">
        {props.text}
    </button>
  )
}

const Statistics = ({counter}) => {
  if (counter.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const getAverage = (counter.good - counter.bad) / counter.total;
  const getPositive = (counter.good / counter.total) * 100;

  return (
    <table className="tbl-center">
      <tbody>
      <StatisticLine text="Good: " value={counter.good} />
      <StatisticLine text="Neutral: " value={counter.neutral} />
      <StatisticLine text="Bad: " value={counter.bad} />
      <StatisticLine text="Total: " value={counter.total} />
      <StatisticLine text="Average: " value={getAverage} />
      <StatisticLine text="Positive %: " value={getPositive} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const counter = {
    good: good,
    bad: bad,
    neutral: neutral,
    total: good + bad + neutral,
  }

  return (
    <div className="App">
      <Display 
        text = "Give Feedback" 
      />

      <Button 
        onClick = {() => setGood(good + 1)}
        text = "Good"
      />

      <Button
        onClick={() => setBad(bad + 1)}
        text="Bad"
      />

      <Button
        onClick={() => setNeutral(neutral + 1)}
        text="Neutral"
      />

      <Display 
        text="Statistics" 
      />

      <Statistics
        counter = {counter}
      />
    



    </div>
  );
}

export default App;
    