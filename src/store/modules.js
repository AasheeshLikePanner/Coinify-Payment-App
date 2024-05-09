import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    send:false,
    showQr:false,
    scanQr:false,
    logout:true,
    balance:false
}

const modules = createSlice({
    name:'modul',
    initialState,
    reducers:{
        openSend: (state, action) => {
            state.send = action.payload;
        },
        openShowQr: (state, action) => {
            state.showQr = action.payload;
        },
        openScanQr: (state, action) => {
            state.scanQr = action.payload;
        },
        openLogout: (state, action) => {
            state.logout = action.payload;
        },
        openBalance: (state, action) => {
            state.balance = action.payload;
        },
        
    }
})

export const {openSend, openShowQr,  openScanQr, openLogout, openBalance} = modules.actions;

export default modules.reducer;