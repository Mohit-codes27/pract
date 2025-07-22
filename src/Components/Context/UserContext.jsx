import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
  
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

 
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem("user");
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}
UserContext.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
