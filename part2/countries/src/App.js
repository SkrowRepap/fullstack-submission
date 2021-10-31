
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './App.css';
import Result from './components/Result';

function App() {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [countryCount, setCountryCount] = useState(0)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchName}`)
      .then((response) => {
        const data = response.data
        setCountries(data)
      })
  }, [searchName])

  useEffect(() => {
    setCountryCount(countries.length)
  }, [countries])

  const searchChange = (e) => {
    setSearchName(e.target.value)
  }

  return (
    <div className="App">
      <h1> Search Country </h1>

      <input value={searchName} onChange={searchChange} />

      <h2> Results</h2>
      {countryCount != 0 ? 
      <Result 
        data={countries}
        query={countryCount}
      /> : <p>Loading...</p>

      }
    

      
 
    </div>
  );
}

export default App;
