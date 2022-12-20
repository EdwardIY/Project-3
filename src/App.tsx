 


  
  // add 

import React, { useState, useEffect } from 'react';
import Background from './componets/Background';
import Loader from './componets/Loader';
import Search from './componets/Search';
import Today from './componets/Today';
import Week from './componets/Week';
import Time from './componets/Time';





export default function App() {
  const [searchMethod, setSearchMethd] = useState<string>('my position');
  const [searchedLocation, setSearchedLocation] = useState<string>('');
  const [coords, setCoords] = useState<number[]>([0,0])

  const [searching, isSearching] = useState<boolean>(false)
  const [error, setError] = useState(false)
  const [background, setBackground] = useState<string>('/assets/Night/snow.jpg');
  const [backgroundDetails, setBackgroundDetails] = useState<string[]>([])




  return <>
    
    {searching && <Loader />} 
    
    <Background
      background={background}
      setBackground={setBackground}
      backgroundDetails={backgroundDetails} />
    <Search
          error={error}
      
          setError={setError}
          isSearching={isSearching}
          setSearchedLocation={setSearchedLocation}
          setSearchMethod={setSearchMethd}
          setCoords={setCoords}
        />
    
     <section className='todayContainer'>
      <Time
        searchMethod={searchMethod}
        coords={coords}
        backgroundDetails={backgroundDetails}

        setBackgroundDetails = {setBackgroundDetails}
    
         />
      <Today
        searchMethod = {searchMethod}
        searchedLocation={searchedLocation}
        coords={coords}
        searching={searching}
        backgroundDetails={backgroundDetails}

        
        setCoords={setCoords}
        setError={setError}
        error={error}
        setBackgroundDetails={setBackgroundDetails} />
    </section> 
      
     <Week
        searchMethod = {searchMethod}
        searchedLocation={searchedLocation}
        coords={coords}
        searching={searching}
        error={error}

        setError={setError}
    />
    
  </>
}


export function fetchTime(endPoint: string) {
  return fetch(endPoint)
          .then((res) => res.json())
    .then((data) => {
            console.log(data)
            return data
             })
             .catch((err) => {
               console.log(err)
               
          })
}

export function fetchWeather(endPoint: string, setData: Function,setError:Function,isSearching?:Function) {
  fetch(endPoint)
          .then((res) => res.json())
    .then((data: any) => {
      console.log(data)
            if (data.cod != 200) {
                console.log('error true')
              setError(true);
                throw Error('Weather not found');
              }
            else {
                setError(false)
              setData(data)
              // isSearching && isSearching(false)
            }
          })
          .catch((err) => {
            setData('');
            // isSearching && isSearching(false)
              console.log(err)
          })
}

