import React from "react";
import {useForm} from 'react-hook-form'
import authService from "../../appwrite/auth";
import service from "../../appwrite/config";
import { toast, ToastContainer } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { login, logout } from "../../store/AuthSlice";
import { openLogout } from "../../store/modules";

export default function SignUp(){

    const{
      register,
      handleSubmit
    } = useForm();

    const dispatch = useDispatch();
  
    const handleTheForm = async (data) =>{
        const t = service.getUser(data.username);
        if(!t){
          toast.error('Please Pick a Unique username', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        else if(Number(data.Mpin) > 9999 || Number(data.Mpin) < 1000){
          toast.error('Please enter the mpin between (1000-9999)', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
        else{
            
              await authService.createAccount(data['email'], data['password'], data['username']);
              const name = data.username.trim()
                            .toLowerCase()
                            .replace(/[^a-zA-Z\d\s]+/g, "-")
                            .replace(/\s/g, "-");
               await service.createUser(String(name), JSON.stringify([]),Number(data.Mpin) );
               const t = await authService.getCurrentUser();
              dispatch(login(t))
              dispatch(openLogout(false));
        }
    }

    return (
      <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(handleTheForm)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register("email")}
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">MPin</label>
            <input
              type="password"
              id="password"
              {...register('Mpin')}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className=" text-black p-3 rounded-md w-80 border-black border-2 m-1 hover:bg-black hover:text-white shadow-sm hover:shadow-xl">SignUp</button>
        </form>
      </div>
    );
}