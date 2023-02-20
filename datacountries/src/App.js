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
      {countries.length < 10 ? (
        countries.map((c) => <p key={c.area}>{c.name.common}</p>)
      ) : (
        <p>Too many countries to display</p>
      )}
    </div>
  );
}

export default App;
