import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'

export default function ShowBalance({balance}){


    return(
        <div className="flex items-center justify-center flex-col h-2/4 w-1/4 bg-white fixed p-3 ">
            <h1 className="text-xl">Available Balance</h1>
            <h1 className="text-5xl m-5 font-semibold">₹ 
            <span className="text-7xl">{balance} </span></h1>
        </div>
    )
}