

export default function fetchWeather(endPoint: string, setResult: Function,setError:Function) {
        return fetch(endPoint)
                .then((res) => res.json())
                .then((data: any) => {
                    if (data.cod != 200) {
                        setError(true);
                        throw Error('Location not found');
                    }
                    setError(false)
                    return data;
                })
                .catch((err) => {
                    setResult('');
                    console.log(err)
                })
}