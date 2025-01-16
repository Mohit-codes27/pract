import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp2() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData){
                     dispatch(login(userData));
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-[#eff7fc] sm:items-center sm:pt-0">
                    <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                        <div className="mt-8 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 w-[55vw]">
                            <div className="p-6 mr-2 bg-[#0a66c2] sm:rounded-lg">
                                    <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">
                                        Get in touch:
                                    </h1>
                                    <p className="text-normal text-lg sm:text-xl font-medium text-white mt-2">
                                        Fill in the form to start a conversation
                                    </p>
        
                                    <div className="flex items-center mt-8 text-gray-600">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <div className="text-white ml-4 text-md tracking-wide font-semibold w-40">
                                            New Delhi
                                        </div>
                                    </div>
        
                                    <div className="flex items-center mt-4 text-white">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                            +91 70119 89792
                                        </div>
                                    </div>
        
                                    <div className="flex items-center mt-2 text-white">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="1.5"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                            internswallah@gmail.com
                                        </div>
                                    </div>
                                </div>
        
                                <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit(create)}>
                                    <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to your account as an Employee</h2>
                                    <p className='mt-2 text-center text-base text-black/60'>
                                        Already have any account?&nbsp;
                                        <Link
                                            className=' font-medium text-primary transition-all duration-200 hover:underline'
                                        >
                                            Sign In
                                        </Link>
                                    </p>
                                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                                    <div className="flex flex-col">
                                    <Input
                                            label="Name: "
                                            placeholder="Enter Your Name"
                                            className="w-[350px]"
                                            type="name"
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                    </div>
        
                                    <div className="flex flex-col mt-2">
                                        <Input
                                            label="Email: "
                                            placeholder="Enter Your Email"
                                            className="w-[350px]"
                                            type="email"
                                            {...register("email", {
                                                required: true,
                                                validate: {
                                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email",
                                                }
                                            })}
                                        />
                                        <Input
                                            label="Password: "
                                            type="password"
                                            placeholder="Create Your Password"
                                            className="w-[350px]"
                                            {...register("password", {
                                                required: true,
                                            })}
                                        />
                                    </div>
        
                                    <div className="flex flex-col mt-2">
                                        <Input
                                            label="Phone no.: "
                                            type="number"
                                            placeholder="Enter Your Phone Number"
                                            className="w-[350px]"
                                            {...register("phone", {
                                                required: true,
                                            })}
                                        />
                                    </div>
        
                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >Sign Up</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>)
}

export default SignUp2
