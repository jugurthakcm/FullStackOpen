import {useState} from "react";

// Statistic Line
const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>

      <td>{props.value}</td>
    </>
  );
};

// Button
const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

// Statistics component
const Statistics = (props) => {
  const {good, neutral, bad} = props;

  let total = good + neutral + bad;
  let average = Math.round(((good + neutral * 0 + bad * -1) / total) * 10) / 10;
  let positive = Math.round((good / total) * 100 * 10) / 10 + " %";

  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback was given</p>;
  }
  return (
    <div className="results">
      <table>
        <tbody>
          <tr>
            <StatisticLine text="Good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="Neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="Bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="All" value={total} />
          </tr>
          <tr>
            <StatisticLine text="Average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="Positive" value={positive} />
          </tr>
        </tbody>
      </table>
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

        <Button handleClick={() => setGood(good + 1)} text={"Good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
      </div>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
