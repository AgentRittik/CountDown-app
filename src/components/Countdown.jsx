import { useState,useEffect, useRef} from "react";
import "./Countdown.css";
function Countdown() {
    const [target, setTarget] = useState(null);
    const [diff , setDiff] = useState(0);
    const id = useRef(0); //we can't use state to clear the interval because it will re-render the component and the interval will be cleared
    function handleSubmit(){
        id.current = setInterval(()=>{
            setDiff(new Date(target) - new Date());
        },1000);
    }
    useEffect(()=>{
        if(diff < 0){
            clearInterval(id.current);
            setDiff(0);
            // alert("Time is up");

        }
    }, [diff]);

    const getDays = () => {
        // console.log(diff);
        return Math.floor(diff/(1000*60*60*24));
    }
    const getHours = () => {
        const hoursInMs = diff % (1000 * 60 * 60 * 24);
        return Math.floor(hoursInMs / (1000 * 60 * 60));
    }
    const getMinutes = () => {
        const minutesInMs = diff % (1000 * 60 * 60);
        return Math.floor(minutesInMs / (1000 * 60));
    }
    const getSeconds = () => {
        const secondsInMs = diff % (1000 * 60);
        return Math.floor(secondsInMs / 1000);
    }
    return (
        <>
            <h1>Count down Timer app</h1>
            <div id ="input">
                <input 
                    type="datetime-local" 
                    id="datetime"
                    onChange={(e)=> setTarget(e.target.value)}
                    />
                <button id="submit" onClick={handleSubmit}>Start</button>
            </div>
            <div>{diff}</div>
            <div id="display">
                <ul>
                    <li><span id="days">{getDays()}</span>Days</li>
                    <li><span id="hours">{getHours()}</span>Hours</li>
                    <li><span id="minutes">{getMinutes()}</span>Minutes</li>
                    <li><span id="seconds">{getSeconds()}</span>Seconds</li>
                </ul>
            </div>
        </>
    )
}

export default Countdown;