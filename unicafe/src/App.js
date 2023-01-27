import {useState} from "react";

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  let total = good + neutral + bad;

  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback was given</p>;
  }
  return (
    <div className="results">
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>all : {total}</p>
      <p>Average :{(good + neutral * 0 + bad * -1) / total}</p>
      <p>Positive: {(good / total) * 100} %</p>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <div className="feedback">
        <h1>Give feedback</h1>

        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
