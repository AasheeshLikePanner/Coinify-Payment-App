import { useEffect, useState } from 'react'
import './App.css'
import { Login, SignUp, LoginPage, AllTransitions, RightSide } from './components'
import {useSelector, useDispatch} from 'react-redux'
import {openSend, openShowQr,  openScanQr, openLogout, openBalance} from "./store/modules"
import "react-toastify/dist/ReactToastify.css";
import authService from './appwrite/auth'
import {login as loginComp} from './store/AuthSlice'
import { addInHistory } from './store/HistorySlice'
import service from './appwrite/config'

function App() {
  const [loginpage , setLoginPage] = useState(false)
  const dispatch = useDispatch()
  const [user, setUser] = useState(false);


  const t = useSelector((state) => state.modul.send)
  const status = useSelector((state) => state.auth.status);
  const loginIn = useSelector((state) => state.modul.logout);

  useEffect(()=>{
    setLoginPage(!loginIn)
  },[loginIn])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authService.getCurrentUser();
        if(!res){
          setLoginPage(true);
          dispatch(openLogout(true))
          
        }
        else{
            setUser(res);
            dispatch(loginComp(res))
            dispatch(openLogout(false))
            const t = await service.getUser(res.name)
            dispatch(addInHistory(JSON.parse(t.history)))
            setLoginPage(false);
          }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();

  }, []);

  useEffect(()=>{
    setLoginPage(!status)
  },[status])

  useEffect(()=> { 
    if(user == true){
      setLoginPage(false)
    }
  }, [user])

  const handleRightSideClick = (e) => {
    e.stopPropagation();
    dispatch(openSend(false))
    dispatch(openShowQr(false))
    dispatch(openScanQr(false))
    dispatch(openLogout(false))
    dispatch(openBalance(false))
  }


  return (
    <div className=' h-screen w-screen bg-white flex flex-row '>
      {loginpage == true? <div className={`fixed item-center flex justify-center w-full h-full ${loginpage?'z-1':'z-0' }`}>
                    <LoginPage/>
                  </div> 
      : null}
      <div className='h-full w-2/3 rounded-sm shadow-sm flex items-center justify-center flex-col'>
        <h1 className='text-6xl text-black ml-24 mt-20 border-2 border-black p-7 rounded-sm inline  '>Transition History</h1>
        <AllTransitions></AllTransitions>
      </div>
      <div onClick={handleRightSideClick} className='flex justify-center items-center h-full w-full bg-[#f7f6fa]'>
        <RightSide/>
      </div>
      
    </div>
  )
}

export default App
