import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import service from "../../appwrite/config";
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { openSend } from "../../store/modules";
import { addInHistory } from "../../store/HistorySlice";

export default function SendMoney(){

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);


    const handleTheForm = async (data) => {
        const getuser = await service.getUser(user.name);
        if(data.Mpin != getuser.password){
            toast.error('Mpin is incorrect', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(openSend(false))
            return;
        }

        const reciverUser = await service.getUser(data.username);
        if(!reciverUser){
            toast.error('User Not Found', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(openSend(false))
            return;
        }
        const amount = getuser.amount;
        if(Number(data.amount) > amount){
            toast.error('Amount is insufficent in your account', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(openSend(false))
            return;
        }

        // Updating sender
        let history = JSON.parse(getuser.history); 
        const i = {
            'username':data.username,
            'amount':data.amount,
            'send':true
        }
        if(history == null){
          let list = [];
          list.push(i);
          history = list;
        }
        else{
          history.push(i);
        }
        await service.updateUser(user.name, JSON.stringify(history),Number(getuser.amount) - Number(data.amount));
        dispatch(addInHistory(history))
        // Updating reciver
        let rehistory = JSON.parse(reciverUser.history);
        const h2 = {
          'username':user.name,
          'amount':data.amount,
          'send':false
        }
        if(rehistory == null){
          let list = [];
          list.push(h2);
          rehistory = list;
        }
        else{
          rehistory.push(h2);
        }
        await service.updateUser(data.username, JSON.stringify(rehistory), Number(reciverUser.amount) + Number(data.amount));
        dispatch(openSend(false))
    }

    return(
        <div className="flex items-center justify-center flex-col h-2/4 w-1/4 bg-white fixed p-3 ">
            <h2 className="w m-1/2 border-2 border-black p-3 rounded-sm text-2xl font-semibold text-center mb-4">Send Money</h2>
        <form onSubmit={handleSubmit(handleTheForm)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className=" mt-1 p-2 w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              id="number"
              {...register("amount")}
              className="mt-1 p-2 block w-full border-black rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>    
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mpin</label>
            <input
              id="password"
              {...register('Mpin')}
              className=" mt-1 p-2 block w-full border-black outline-2 outline-black rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className=" text-black p-3 rounded-md w-80 border-black border-2  hover:bg-black hover:text-white shadow-sm hover:shadow-xl ml- mt-5"> Send
            </button>
        </form>
        </div>
    )

}