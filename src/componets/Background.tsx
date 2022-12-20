import {useEffect} from 'react'
interface ChangeBackgroundProps {
    background: string
    setBackground: Function
    backgroundDetails: string[]
}

export default function Background({background,setBackground,backgroundDetails}:ChangeBackgroundProps) {
    // if(window.innerWidth <= 425){
    //     return;
    // }
    useEffect(() => {
        if (backgroundDetails.length == 2) {
            // console.log(backgroundDetails)
            updateBackground()
        }
    }, [backgroundDetails])
    
    

    
    const images = ['url(/assets/Night/clear.jpg)', 'url(/assets/Night/cloud.jpg)',
        'url(/assets/Night/rain.jpg)', 'url(/assets/Night/snow.jpg)', 'url(/assets/Day/clear.jpg)',
        'url(/assets/Day/cloud.jpg)', 'url(/assets/Day/rain.jpg)', 'url(/assets/Day/snow.jpg)',
        'url(/assets/Afternoon/clear.jpg)', 'url(/assets/Afternoon/cloud.jpg)',
        'url(/assets/Afternoon/rain.jpg)', 'url(/assets/Afternoon/snow.jpg)',
    ]

    function updateBackground() {
        let currentWeather = backgroundDetails[0];
        let timeOfDay: ('Night' | 'Day' | 'Afternoon');

        let TimeDetail1 = backgroundDetails[1].split(":")[0];
        let TimeDetail2 = backgroundDetails[1].split(" ")[1];
        if (TimeDetail2 === 'AM') {
            if (+TimeDetail1 >= 6) timeOfDay = 'Day';
            else timeOfDay = 'Night';
        }
        else {
            if (+TimeDetail1 === 12 || +TimeDetail1 < 4) timeOfDay = 'Day';
            else if (+TimeDetail1 === 4 || +TimeDetail1 === 5) timeOfDay = 'Afternoon';
            else timeOfDay = 'Night'
        }

        let newBg = images.filter((img) => {
            let imgWeather = img.split('/')[3].split('.')[0]
            return currentWeather.includes(imgWeather)
        }).filter((img) => img.includes(timeOfDay))

        
        if (newBg.length) setBackground(newBg[0].split("(")[1].slice(0,-1))
        else setBackground('/assets/Atmosphere/fog.jpg')
    }

    return <section style={{ backgroundImage: `url(${background})` }} className="Bg-Img"></section>

    
}