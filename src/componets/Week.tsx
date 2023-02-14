import { useEffect, useState } from 'react';
import {fetchWeather} from '../App';

interface WeekProps {
    searchMethod: string
    searchedLocation: string
    coords: number[]
    searching:boolean

    setError: Function
    error: boolean
}


export default function Week({ searchMethod, searchedLocation,searching,setError,error, coords}: WeekProps) {
    const myLocation_Endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;
    const searchedLocation_Endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedLocation}&appid=a0eb8cd91bacf228a84f3e6370b0b4a3&units=imperial`;

    const [data, setData] = useState<any>('')
    const [week, setWeek] = useState<any>('')

  
    useEffect(() => {
        if (searching) {
            if (searchMethod === 'my position' && coords[0] + coords[1] !== 0) {
                fetchWeather(myLocation_Endpoint,setData,setError)
            }
            else if (searchMethod === 'searched') {
                fetchWeather(searchedLocation_Endpoint,setData,setError)
            }
        }  
           
    }, [searching]);
  
    useEffect(() => {
        if (data && !error) {
            const list = data.list.filter((timeStamp: { dt: number }) => {
                const time = new Date(timeStamp.dt * 1000).toLocaleTimeString();
                const today = new Date().toDateString().slice(0, 4); 

                           
                switch (time) {
                    case '8:00:00 AM':
                        return verify()
                    case '11:00:00 AM':
                        return verify()
                    case '5:00:00 PM':
                        return verify()

                }
                function verify() {
                    return !new Date(timeStamp.dt * 1000).toDateString().includes(today) ? 
                        true : false
                }     
            })
            console.log(list)

           let days: any[] = [];
          // Group list of timestamps into groups of 3 (morn / mid / after
            for (let i = 0; i < list.length; i += 3)  days.push([...list].splice(i, 3));

            days.forEach((x) => {
                x.forEach((x:any) => {
                })
                

            })


  
           
            setWeek(days)
            // if(searchMethod == 'searched') setCoords([data.city.coord.lat,data.city.coord.lon])
            // setCoords((prevCords: number[]) => {
            //     prevCords[0] = data.city.coord.lat;
            //     prevCords[1] = data.city.coord.lon;
            //     return prevCords
            //  })
        }
    }, [data]);

        
    return <>
        {week && !error ? <section className="week"> 
    
            {
                week.map((day: any, i: number) => {

                if (i === 0) return <div key={day[0].dt} className="Tomorrow">
                        <img src={`http://openweathermap.org/img/wn/${day[1].weather[0].icon}@2x.png`} alt="" />
                        <div className="info">
                            <span>{new Date(day[0].dt * 1000).toDateString().slice(0, 3)}</span>
                            <span><b>Morning</b> : {day[0].main.temp} °F</span>
                            <span><b>Noon</b> : {day[1].main.temp} °F</span>
                            <span><b>Afternoon</b> : {day[2].main.temp} °F</span>
                        </div>
                    </div>
                
            else return <div key={day[0].dt} className="day">
                            <span>{new Date(day[0].dt * 1000).toDateString().slice(0,3)}</span>
                            <img src={`http://openweathermap.org/img/wn/${day[1] ? day[1].weather[0].icon : day[0].weather[0].icon }@2x.png`} style={{height:'75px', width:'75px'}}  alt=""/>
                            <span><b>Morning</b>  {day[0] ? ': '+day[0].main.temp + ' °F' : '. . .'}</span>
                            <span><b>Noon</b>  {day[1] ? ': '+day[1].main.temp + ' °F' : '. . .'}</span>
                            <span><b>Afternoon</b>  {day[2] ? ': '+day[2].main.temp + ' °F' : '. . .'}</span>
                        </div> 
        })
            }
            
   </section>: <div></div>}
    </>
    
}

