import {useEffect, useState} from 'react'

export default function useFetch(endPoint: string, errorMessage: string) {
    const [data, setData] = useState('');
    const [error, setError] = useState(false);
    useEffect(() => {
        fetch(endPoint)
        .then((res) => res.json())
        .then((data: any) => {
            if (data.cod != 200) {
                setError(true);
                throw Error(errorMessage);
            }
            setError(false)
            setData(data)
        })
        .catch((err) => {
            setData('');
            console.log(err)
        })
    },[endPoint])
    
    return {data,error}
}