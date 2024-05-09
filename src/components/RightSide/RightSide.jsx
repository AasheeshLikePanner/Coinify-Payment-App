import React, { useEffect, useState } from "react";
import 'react-awesome-button/dist/styles.css';
import SendMoney from "../SendMoney/SendMoney";
import {useSelector, useDispatch} from 'react-redux'
import {openSend, openShowQr,  openScanQr, openLogout, openBalance} from "../../store/modules"
import ShowQrCode from "../ShowQrCode/ShowQrCode";
import ShowBalance from "../ShowBalance/ShowBalance";
import service from "../../appwrite/config";
import authService from '../../appwrite/auth'
import {logout as logoutComp} from '../../store/AuthSlice'
import ScanQr from "../ScanQr/ScanQr";

export default function RightSide(){
    const dispatch = useDispatch();
    const [senderOpen, setShowSenderOpen] = useState(true);
    const [showqrOpen, setShowqrOpen] = useState(false);
    const [scanqrOpen, setShowScanqrOpen] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [username, setUserName] = useState(null)
    const [balance, setBalance] = useState(-1)

    const senderOpened = useSelector((state) => state.modul.send)
    const showQrOpened = useSelector((state) => state.modul.showQr)
    const showBalanceOpened = useSelector((state) => state.modul.balance);
    const userData = useSelector((state) => state.auth.userData);
    const showScannerOpened = useSelector((state) => state.modul.scanQr)

    useEffect(()=>{
        if(userData){
            setUserName(userData.name)
        }
    },[userData])

    useEffect(()=>{
        setShowSenderOpen(senderOpened)
    },[senderOpened])

    useEffect(()=>{
        setShowqrOpen(showQrOpened)
    },[showQrOpened])

    useEffect(()=>{
        setShowScanqrOpen(showScannerOpened)
    },[showScannerOpened])

    useEffect(()=>{
        setShowBalance(showBalanceOpened)
    }, [showBalanceOpened])

    const handleSend = () => {
        setShowSenderOpen(true);
        dispatch(openSend(true))
    }
    const handleShowQr = () => {
        setShowqrOpen(true);
        dispatch(openShowQr(true))
    }
    const handleScanQr = () => {
        setShowScanqrOpen(true);
        dispatch(openScanQr(true))
    }
    const handleBalance = async () => {
        const b = await service.getUser(username)
        setBalance(Number(b.amount))
        dispatch(openBalance(true))
        setShowBalance(true);
    }
    const handlLogout = async () => {
        await authService.logout().then(()=>{
            dispatch(logoutComp())
            dispatch(openLogout(true));
        })
        
    }


    const handleDiv = (event) => {
        event.stopPropagation();
    }


    return(
        <div onClick={handleDiv} className=" h-1/2 w-1/2 bg-white rounded-sm shadow-sm items-center flex-col  flex justify-center">
            <button onClick={handleSend} className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl"> Send Money
            </button>
            <button onClick={handleShowQr} className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl"> Show Qr Code
            </button>
            <button onClick={handleScanQr} className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl"> Scan Qr Code
            </button>
            <button onClick={handleBalance} className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl"> Balance
            </button>
            <button onClick={handlLogout} className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl"> LogOut
            </button>
            {senderOpen &&  <SendMoney/>}
            {showqrOpen && <ShowQrCode qr={'Aasheesh'}/>}
            {showBalance && <ShowBalance balance={balance}/>}
            {scanqrOpen && <ScanQr/>}

        </div>
    )
}