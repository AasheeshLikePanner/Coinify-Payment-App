import React from "react";
import {useSelector} from 'react-redux'
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';


export default function Transition({send, amount, username}){

    
    return(
        <div className="h-28 border-b-2 border-grey-900 flex items-center justify-center">
            <div className="mr-10 flex justify-center items-center h-12 w-12 rounded-xl border-black border-2 ">
                {send?<NorthEastIcon
                   sx={{ fontSize:30, color:"black"}}  />
                :<SouthWestIcon
                    sx={{ fontSize:30, color:"black"}} 
                />}
            </div>
            <div className="pl-2 w-40 h-10"> 
                {send?
                <h1 className="">Money Send to</h1>
                :<h1>Money Recived from</h1>}
                <h1 className="text-grey-600">{username}</h1>
            </div>
            <h1 className="pl-16 text-xl font-semibold">₹ {amount}</h1>
        </div>
    )
}