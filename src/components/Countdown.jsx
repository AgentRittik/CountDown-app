import { useState,useEffect, useRef} from "react";
import "./Countdown.css";
function Countdown() {
    const [target, setTarget] = useState(null);
    const [diff , setDiff] = useState(0);
    // const [days,setDays] = useState({value:0,animation:false});
    // const [hours,setHours] = useState(0);
    // const [minutes,setMinutes] = useState({value:0,animation:false});
    // const [seconds,setSeconds] = useState(0);
    const id = useRef(0); //we can't use state to clear the interval because it will re-render the component and the interval will be cleared
    function handleSubmit(){
        clearInterval(id.current);
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
        const value =  Math.floor(diff/(1000*60*60*24));
        // if(value !== days.value){
        //     setDays({value: value, animation : true});
        // }
        // else{
        //     if(days.animation == true){
        //         setDays({value : value, animation : false})
        //     }  
        // }
        return value;
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
        const value =  Math.floor(secondsInMs / 1000);
        // if(value !== minutes.value){
        //     setDays({value: value, animation : true});
        // }
        // else{
        //     if(minutes.animation == true){
        //         setDays({value : value, animation : false})
        //     }  
        // }
        return value;
    }
    return (
        <div class = "container">
            <h1 className="heading">Count Down Timer app</h1>
            <div id ="input">
                <input 
                    type="datetime-local" 
                    id="datetime"
                    onChange={(e)=> setTarget(e.target.value)}
                    />
                <button id="submit" onClick={handleSubmit}>Start</button>
            </div>
            {/* <div>{diff}</div> */}
            <div id="display">
                <ul>
                    <li>
                        <span id="days" className="wrapper">
                            <span >{getDays()}</span>
                        </span>
                        Days
                    </li>
                    <li>
                        <span id="hours" className="wrapper">
                            <span>{getHours()}</span>   
                        </span>
                        Hours 
                    </li>
                    <li>
                        <span id="minutes" className="wrapper">
                            <span>{getMinutes()}</span>
                        </span>
                        Minutes
                    </li>
                    <li>
                        <span id="seconds" className="wrapper">
                            <span>{getSeconds()}</span>
                        </span>
                        Seconds
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Countdown;