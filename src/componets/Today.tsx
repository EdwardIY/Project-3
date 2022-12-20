import {useState, useEffect} from 'react'
import { fetchWeather } from '../App';




interface TodayProps {
    searchMethod: string
    searchedLocation: string
    coords: number[]
    searching: boolean
    backgroundDetails: string[]


    setCoords: Function
    setError: Function
    error:boolean
    setBackgroundDetails: Function
}

interface ApiResponse {
    cod: number
    name:string
    main: {
        feels_like: number
        humidity: number
        temp:number
    },
    weather: [ {description: string, icon:string}],
    wind: {
        speed:number
    }
}


export default function Today({ searchMethod,searchedLocation,coords,setCoords,setError,error,searching,setBackgroundDetails,backgroundDetails}:TodayProps) {
    const myLocation_Endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;
    const searchedLocation_Endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;

    const [today, setToday] = useState<any>("");

    useEffect(() => {
        if (searching) {
            if (searchMethod === 'my position' && coords[0] + coords[1] !== 0) {
                console.log('ran my position')
                fetchWeather(myLocation_Endpoint,setToday,setError)
            } 
            else if (searchMethod === 'searched') {
                console.log('ran searched')
                fetchWeather(searchedLocation_Endpoint,setToday,setError)
            }
        }
       
            
    }, [searching])
  
    useEffect(() => {
        if (today) {
            let description = today.weather[0].description;
            setBackgroundDetails([description])
        }
        else if(error) {
            setBackgroundDetails(['fog'])
        }
    }, [today]);

    useEffect(() => {
        if (backgroundDetails.length == 1 && today) {
            console.log(backgroundDetails)
            setCoords([today.coord.lat,today.coord.lon])
        } 
    },[backgroundDetails])
        
    return <div className="todayDetailsContainer">
            <div className="detail">
            <span>Location: </span>
            <span>{ error ? 'UNKOWN': today && !error ? today.name.toUpperCase() : ". . ." }</span>
            </div>
            <div className="detail">
                <span>Description:</span>
                <span>{ today && !error ? today.weather[0].description.toUpperCase(): ". . ." }</span>
            </div>
            <div className="detail">
                <span>Temperature:</span>
                <span>{ today && !error ? today.main.temp + ' °F': ". . ." }</span>
            </div>
            <div className="detail">
                <span>Feels like:</span>
                <span>{ today && !error ? today.main.feels_like + ' °F': ". . ." }</span>
            </div>
            <div className="detail">
                <span>Humidity:</span>
                <span>{ today && !error ? today.main.humidity + '%': ". . ." }</span>
            </div>
            <div className="detail">
                <span>Wind Speed:</span>
                <span>{ today && !error ? today.wind.speed + ' Mph': ". . ." }</span>
            </div>
    </div>
 
}