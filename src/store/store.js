import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import modules from './modules';
import HistorySlice from './HistorySlice';

const store = configureStore({
    reducer:{
        auth:AuthSlice,
        modul:modules,
        history:HistorySlice,
    }
})

export default store;