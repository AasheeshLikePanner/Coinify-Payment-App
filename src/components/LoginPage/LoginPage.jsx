import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import {useSelector} from 'react-redux'

export default function LoginPage(){

    const [login, setLogin] = useState(true);
    const [singup , setSingUp] = useState(false);
    const [status, setStatus] = useState(false);
    
    const t = useSelector((state) => state.auth.status)

    useEffect(()=>{
        setStatus(true);
    },[t])

    const handleLogin = () => {
        setSingUp(false);
        setLogin(true);
    }

    const handleSingup = () => {
        setLogin(false);
        setSingUp(true);

    }

    return(
        <div className={`fixed shadow-lg bg-white m-10 mt-32 h-3/4 w-2/4 rounded-lg items-center flex-col flex justify-center ${status?'-z-1':'z-1'}`}>
            <div className=" text-black rounded-md w-96 border-black border-2 m-5 ml-20  shadow-sm "> 
                <button onClick={handleLogin} className={`text-black p-3 rounded-md w-44 border-black border-2 m-2 hover:bg-black 
                    hover:text-white shadow-sm hover:shadow-xl ${login?'bg-black text-white':'bg-white text-black'}`}>
                    Login
                </button>
                <button onClick={handleSingup} className={`text-black p-3 rounded-md w-44 border-black border-2 m-1 hover:bg-black 
                    hover:text-white shadow-sm hover:shadow-xl ${singup?'bg-black text-white':'bg-white text-black'}`}>
                    SingUp
                </button>
            </div>
            {login && <Login/>}
            {singup && <SignUp/>}


        </div>
    )
}