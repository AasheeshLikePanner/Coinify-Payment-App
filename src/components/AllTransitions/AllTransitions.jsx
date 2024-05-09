import React, { useEffect, useState } from "react";
import Transition from "../Transition/Transition";
import {useSelector} from 'react-redux'


export default function AllTransitions(){
    const [ history, setHistory] = useState([])

    const t = useSelector((state) => state.history.history);

    useEffect(()=>{
        setHistory(t);
    },[t])


    return(
        <div className="border-2 border-black m-10 ml-28 w-1/2 overflow-scroll h-3/4 shadow-sm rounded-lg no-scrollbar">
            {history.length > 0 &&
                history.map((h, index) => (
                    <Transition key={index} send={h.send} amount={h.amount} 
                    username={h.username}></Transition>
                ))
            }
            {/* <Transition></Transition> */}
        </div>
    )
}