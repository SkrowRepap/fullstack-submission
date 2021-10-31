import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayCountry = (props) => {
    return (
        <div>
            <img src={props.flag.png}/>
            <h4 className="h4">{props.name.common}</h4>
            <p> Capital City - {props.capital} </p>
            <p> Population - {props.population.toLocaleString()} </p>
            <p> Languages </p>
            <ul>
                {Object.values(props.languages).map((item,i) => {
                    return (
                    <li key={i}>
                        {item}
                    </li> )
                    }
                )}
            </ul>
        </div>
    )
}

const DisplayResults = ({name}) => {
    return (
        <p> {name} </p>
    )
}

const DisplayWeather = ({capital}) => {
    const KEY = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${KEY}&query=${capital[0]}`)
            .then((response) => {
                const data = response.data
                setWeather(data)
            })
    },[weather])
        

    if (weather) {
        return (
            <div>
            <h4 className="h4">{`Weather in ${weather.location.name}`}</h4>
             <img src={weather.current.weather_icons[0]}/>
             <p> {`Temperature: ${weather.current.temperature}`} </p>
            <p> {`Wind: ${weather.current.wind_speed}mph ${weather.current.wind_dir} `} </p>
            </div>
        )
    } return <p></p>

}
const Button = (props) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(show)
    },[show])
    return (
        <div>
            <div className="result">
            {props.Results}
            <button onClick={() => setShow(!show)}> Show</button>
            </div>
            {show == true ? props.Country : null}
            {show == true ?< DisplayWeather capital={props.capital} /> : null}
            
        </div>
    )
}

function getValueKey(key, data) {
    return Object.values(data).map(value => {
        return value[key];
    })
}

const Result = ({ data, query}) => {

    if (query > 0) {

        if (query > 10) {
            return <p> Too many results!</p> }

        if (query <= 10 && query > 1) {
            return data.map(country => {
                return (
                <div key={country.name.common}>
                <Button 
                    Results= {<DisplayResults name={country.name.common} />}
                    Country = 
                        {<DisplayCountry
                            name={country.name.common}
                            flag={country.flags}
                            capital={country.capital}
                            population={country.population}
                            languages={country.languages}
                        />}
                    capital = {country.capital}
                />
                </div>
                )
            }
            )
        }
        
        if (query === 1) {
            return (
            <DisplayCountry 
                    name={getValueKey('name', data)[0]}
                    flag={getValueKey('flags', data)[0]}
                    capital={getValueKey('capital', data)[0]}
                    population={getValueKey('population', data)[0]}
                    languages={getValueKey('languages', data)[0]}
            /> 
            )
        }
        
    } else {
    
    return <div></div> }
}



export default Result;