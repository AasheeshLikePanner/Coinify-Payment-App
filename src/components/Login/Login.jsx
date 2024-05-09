import React from "react";
import {useForm} from 'react-hook-form'
import authService from "../../appwrite/auth";
import {useDispatch} from 'react-redux'
import { login } from "../../store/AuthSlice";
import { toast } from 'react-toastify';
import { openLogout } from "../../store/modules";


export default function Login(){

    const{
      register,
      handleSubmit
    } = useForm();

    const dispatch = useDispatch();

    const handleLogin = async (data) => {
      const t = await authService.login(data.email, data.password);
      if(!t){
        toast.error('Enter The Correct information', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return;
      }
      else{
        dispatch(openLogout(false))
        const res = await authService.getCurrentUser();
        dispatch(login(res))
      }
      
      
    } 

    return(
        <div className="max-w-sm mt-20 ml-10 p-6 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button type="submit" className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl">Login</button>
      </form>
    </div>
    )
}