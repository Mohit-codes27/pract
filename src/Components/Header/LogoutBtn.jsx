import React, {useRef, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'
import axios from "axios";
import { logout } from '../../store/authSlice'
import { Link } from 'react-router-dom';


function LogoutBtn() {
  const dispatch = useDispatch()
  const profileRef = useRef(null)
  const [dropdown, setDropdown] = useState("");
  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:5000/logout", { withCredentials: true });
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  const toggleDropdown = (dropdownName) => {
    setDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown !== "" && // Only proceed if a dropdown is open
        ! (profileRef.current && profileRef.current.contains(event.target))
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
    <>
      <div className="relative">
      <img src="https://ohsobserver.com/wp-content/uploads/2022/12/Guest-user.png" alt="" onClick={() => toggleDropdown("profile")} className='cursor-pointer w-10 h-10 rounded-full' />
        
        {dropdown === "profile" && (
          <div ref={profileRef} className="absolute left-0 flex flex-col rounded-xl bg-white border shadow-lg mt-3.5 w-44 -ml-20">
            <Link to="/profile" className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-b">Your Application</Link>
            <Link to="#" className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-b border-t-2">Performance Tracker</Link>
            <Link to="/privacy" className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2">Privacy</Link>
            <Link to="/contact" className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2">Contact Us</Link>
            <Link to="/setting" className="px-3 py-1.5 hover:bg-gray-100 rounded-lg border-t-2">Settings</Link>
            <Link to="/" onClick={logoutHandler} className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-gray-100 rounded-lg border-t-2">Sign Out</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default LogoutBtn