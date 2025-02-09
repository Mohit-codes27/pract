import React, { useState, useEffect, useRef } from "react"; 
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { LogoutBtn } from '../index';
import './styles.css';

export default function Header() {
    const [dropdown, setDropdown] = useState("");
    const [userName, setUserName] = useState(""); // To store the user's name
    const internshipsRef = useRef(null);
    const jobsRef = useRef(null);
    const coursesRef = useRef(null);
    const getStartedRef = useRef(null);
    const authStatus = useSelector((state) => state.auth.status);

    const toggleDropdown = (dropdownName) => {
        setDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
    };

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    setUserName(userData.name); // Update the user's name
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        if (authStatus) {
            fetchUserName(); // Fetch the user's name if logged in
        }
    }, [authStatus]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdown !== "" && // Only proceed if a dropdown is open
                !(
                    (internshipsRef.current && internshipsRef.current.contains(event.target)) ||
                    (jobsRef.current && jobsRef.current.contains(event.target)) ||
                    (coursesRef.current && coursesRef.current.contains(event.target)) ||
                    (getStartedRef.current && getStartedRef.current.contains(event.target))
                )
            ) {
                setDropdown("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);


    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-[#eff7fc] border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200"></div>
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("internships")}
                                className="bg-transparent text-[#0a66c2] font-medium rounded-lg px-2 py-2 hover:bg-blue-500 hover:text-white"
                            >
                                Internships
                                <span className="ml-2 text-[#0a66c2]">
                                    {dropdown === "internships" ? "▲" : "▼"}
                                </span>
                            </button>
                            {dropdown === "internships" && (
                                <div ref={internshipsRef} className="absolute left-0 flex flex-col bg-white border shadow-lg mt-3.5 w-64 rounded-xl">
                                    <Link to="/internships" className="px-4 py-2 rounded-lg hover:bg-gray-100 border-b-2">Work from Home</Link>
                                    <Link to="/internships" className="px-4 py-2 rounded-lg hover:bg-gray-100 border-b-2 border-t-2">Internship in Bangalore</Link>
                                    <Link to="/internships" className="px-4 py-2 rounded-lg hover:bg-gray-100 border-t-2">Internship in Delhi</Link>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("jobs")}
                                className="text-[#0a66c2] bg-transparent font-medium rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white"
                            >
                                Jobs
                                <span className="text-[#0a66c2] ml-2">
                                    {dropdown === "jobs" ? "▲" : "▼"}
                                </span>
                            </button>
                            {dropdown === "jobs" && (
                                <div ref={jobsRef} className="absolute left-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-64">
                                    <Link to="/jobs" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2">Full-time Jobs</Link>
                                    <Link to="/jobs" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2 border-t-2">Part-time Jobs</Link>
                                    <Link to="/jobs" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-t-2">Remote Jobs</Link>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown("courses")}
                                className="text-[#0a66c2] bg-transparent font-medium rounded-lg px-2 py-2 hover:bg-blue-500 hover:text-white"
                            >
                                Courses
                                <span className="text-[#0a66c2] ml-2">
                                    {dropdown === "courses" ? "▲" : "▼"}
                                </span>
                            </button>
                            {dropdown === "courses" && (
                                <div ref={coursesRef} className="absolute left-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-64">
                                    <Link to="/courses" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2">Web Development</Link>
                                    <Link to="/courses" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-b-2 border-t-2">Data Science</Link>
                                    <Link to="/courses" className="px-4 py-2 hover:bg-gray-100 rounded-lg border-t-2">Digital Marketing</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    {!authStatus && (
                        <div className="flex items-center lg:order-2 w-[15vw]">
                            <Link
                                to="/login"
                                className="text-[#0a66c2] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Log in
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown("getStarted")}
                                    className="text-[#eff7fc] badges bg-[#0a66c2] hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Get started
                                </button>
                                {dropdown === "getStarted" && (
                                    <div ref={getStartedRef} className="absolute right-0 flex flex-col bg-white border shadow-lg mt-3.5 w-52 rounded-xl">
                                        <Link
                                            to="/signup"
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-b-2"
                                        >
                                            Employer Sign Up
                                        </Link>
                                        <Link
                                            to="/signup2"
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-4 py-2 hover:bg-gray-100 flex justify-center rounded-lg border-t-2"
                                        >
                                            Employee Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {authStatus && (
                        <div className="flex items-center lg:order-2 w-[15vw] justify-center">
                        <span className="mr-4 text-[#0a66c2] font-medium">
                            {userName ? `Hi, ${userName}` : "Hi!"}
                        </span>
                        <LogoutBtn />
                    </div>

                    )
                        }
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 mr-48"
                        id="mobile-menu-2 "
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? "text-blue-500"
                                            : "text-gray-700"
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? "text-blue-500"
                                            : "text-gray-700"
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/information"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? "text-blue-500"
                                            : "text-gray-700"
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0`
                                    }
                                >
                                    Information
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}