import { useState, useEffect } from 'react';
import { fetchTime } from '../App';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

 

interface TimeProps {
    searchMethod: string;
    coords: number[];
    backgroundDetails:string[]

    setBackgroundDetails: Function
}
     

export default function Time({ searchMethod, coords,backgroundDetails,setBackgroundDetails }: TimeProps) {
    const [timeDetails, setTimeDetails] = useState<[string?, string?]>();
    const endPoint = `https://api.ipgeolocation.io/timezone?apiKey=957a47b3088a40a8a20879acaf412420&lat=${coords[0]}&long=${coords[1]}`

    let clock: any;

    
    useEffect(() => {
        // console.log('ran')
        if (searchMethod === 'my position') clock = setInterval(() => formatTime(), 1000);
  
        else if (searchMethod === 'searched' && coords[0] + coords[1] !== 0) {
            console.log(backgroundDetails,coords)
            const getTimeZone = async () => {
                let data: any = await fetchTime(endPoint);
                clock = setInterval(()=> formatTime(data),1000)
            }

             getTimeZone()     
        }
        return ()=> clearInterval(clock)
    }, [coords])


    function formatTime(unformatted?:any) { 
        let date, timeString;
        if (!unformatted) {
            date = new Date();
            timeString = date.toLocaleTimeString()
        }
        else {
            date = new Date(unformatted.date_time_ymd.slice(0, -5))
            timeString = new Date().toLocaleTimeString('en-US', { timeZone: unformatted.timezone })  
        }

        const clock = timeString.split(":")[0] + ":" + timeString.split(":")[1] + timeString.slice(-3);
        const fullDate = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()]

        setTimeDetails([clock, fullDate])
        if (backgroundDetails.length == 1) {
            setBackgroundDetails(backgroundDetails.concat([clock]))
        } 
}

    return <>
        <h1 className="time">{timeDetails && timeDetails[0]}</h1>
        <div className="dayMonth">{timeDetails && timeDetails[1]}</div>
    </>
}