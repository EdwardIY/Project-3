import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {useRef,useEffect,useState} from 'react'

interface SearchProps {
    error: boolean
    
    setError:Function
    isSearching: Function
    setSearchMethod: Function
    setSearchedLocation: Function
    setCoords: Function
}

export default function Search({error,isSearching, setSearchMethod, setSearchedLocation, setCoords }: SearchProps) {
    
    const inputValue = useRef<any>()
    const [myCoords, setMyCoords] = useState<number[]>([])
    
    if (!myCoords.length) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat: number = position.coords.latitude;
            let long: number = position.coords.longitude;
            setMyCoords([lat,long])            

        })
    }

    function handleMylocation() {

            loader()
            setSearchMethod('my position')
            if (!error) inputValue.current.value = '';
            setCoords(myCoords)


        // if (myCoords.length) {
        //       navigator.geolocation.getCurrentPosition((position) => {
        //     let lat: number = position.coords.latitude;
        //     let long: number = position.coords.longitude;
        //     setMyCoords([lat,long])            
        //     loader()
        //     setSearchMethod('my position')
        //     if (!error) inputValue.current.value = '';
        //     setCoords([lat,long])

        // })
        // } else {
        //     loader()
        //     setSearchMethod('my position')
        //     if (!error) inputValue.current.value = '';
        //     setCoords(myCoords)
        // }
        // navigator.geolocation.getCurrentPosition((position) => {
        //     let lat: number = position.coords.latitude;
        //     let long: number = position.coords.longitude;
        //     setMyCoords([lat,long])

        //     // isSearching(true)
            
        //     loader()
        //     setSearchMethod('my position')
        //     if (!error) inputValue.current.value = '';
        //     setCoords([lat,long])

        // })
    }
    
    function handleSearchedLocation(e: any) {
        e.preventDefault()

        // isSearching(true)
       
        setSearchedLocation(inputValue.current.value)
        setSearchMethod('searched')
        if (!error) inputValue.current.value = '' 
        loader()
    }

    function loader() {
        isSearching(true);
        setTimeout(()=> isSearching(false),2000)
    }

    useEffect(() => {
        if (error) {
            isSearching(false)
            inputValue.current.value = 'Location not found...';
            inputValue.current.style.opacity = '.5';

            setTimeout(() => {                
                inputValue.current.value= '';
                inputValue.current.style.opacity = '1';
            }, 1000)
            setSearchMethod('my position')
            setCoords(myCoords)
            // setError(false)
            
            
      }  
    },[error])
    return <>
        <form onSubmit={(e)=> handleSearchedLocation(e) } className="search">
            <input ref={inputValue} className="input" type="text" placeholder="Enter City in the US" />
                <button>
                    <FontAwesomeIcon role={'button'}  className="btn icon" icon={faMagnifyingGlass} />
                </button>
        </form>
      <div onClick={()=> handleMylocation()} className="myLocation btn">My Location</div>
    </>
}