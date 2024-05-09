import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import Qrcode from "react-qr-code";

export default function ShowQrCode(Qr){

    return(
        <div className="flex items-center justify-center flex-col h-2/4 w-1/4 bg-white fixed p-3 ">
            <Qrcode
                size={300}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={Qr.qr}
                viewBox={`0 0 256 256`}
                />
        </div>
    )
}