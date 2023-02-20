import {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    return () => {
      name &&
        axios
          .get(`https://restcountries.com/v3.1/name/${name}`)
          .then((res) => setCountries(res.data));
    };
  }, [name]);

  return (
    <div className="App">
      find countries
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {countries.length === 1 &&
        countries.map((c) => {
          return (
            <div key={c.area}>
              <h2>{c.name.common}</h2>

              <p>Capital: {c.capital[0]}</p>
              <p>Area: {c.area}</p>

              <strong>languages:</strong>

              <ul>
                {Object.keys(c.languages).map((key) => (
                  <p>{c.languages[key]}</p>
                ))}
              </ul>

              <br />

              <img src={c.flags.png} alt="flag" width={100} />
            </div>
          );
        })}
      {countries.length > 10 ? (
        <p>Too many countries to display</p>
      ) : (
        countries.length > 1 &&
        countries.map((c) => <p key={c.area}>{c.name.common}</p>)
      )}
    </div>
  );
}

export default App;
