import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, PassInput } from "./index";
import Image from "./Home/images/InternLogo.png";
import "./Header/styles.css";

function Login2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const login = async (data) => {
        setError("");

        try {
            const response = await fetch("http://localhost:5000/employee-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // for setting cookies
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Dispatch Redux action to update user state
            dispatch(authLogin({ userData: { ...result.user, userType: "employee" } }));

            // Navigate to homepage
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-[#eff7fc] sm:items-center sm:pt-0">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <img
                    src={Image}
                    alt="Logo"
                    className="w-40 h-40 object-contain hover-rotate"
                />
            </div>

            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Section */}
                        <div className="p-6 mr-2 bg-[#0a66c2] sm:rounded-lg">
                            <h1 className="text-3xl sm:text-4xl text-white font-extrabold tracking-tight">Get In Touch:</h1>
                            <p className="text-lg sm:text-xl font-medium text-white mt-2">
                                Fill In The Form To Start A Conversation
                            </p>
                            <div className="flex items-center mt-8 text-white">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">New Delhi</div>
                            </div>
                            <div className="flex items-center mt-4 text-white">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">+91 70119 89792</div>
                            </div>
                            <div className="flex items-center mt-2 text-white">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">internswallah@gmail.com</div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <form onSubmit={handleSubmit(login)} className="p-6 flex flex-col justify-center">
                            <h2 className="text-center text-2xl font-bold leading-tight">Sign In To Your Employee Account</h2>
                            <p className="mt-2 text-center text-base text-black/60">
                                Don’t have an account?{" "}
                                <Link to="/employee-signup" className="font-medium text-primary hover:underline">
                                    Sign Up
                                </Link>
                            </p>

                            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                            {/* Email */}
                            <div className="flex flex-col">
                                <Input
                                    label="Email"
                                    placeholder="Enter Your Email"
                                    className="w-[350px]"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <PassInput
                                    label="Password"
                                    placeholder="Enter Your Password"
                                    className="w-[350px]"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Sign In"}
                            </Button>

                            {/* Forgot Password */}
                            <div className="mt-2">
                                <Link to="/forgot-password" className="text-primary text-sm hover:underline hover:text-blue-500">
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login2;
