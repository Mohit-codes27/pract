import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from './Context/UserContext';
import axios from 'axios';
import PropTypes from "prop-types";

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const { user, setUser } = React.useContext(UserContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      setUser(response.data.user);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/login');
    })
    }, [token, navigate, setUser]);

    

    if(isLoading){
      return (
        <div>
          Loading...
        </div>
      )
    }

  return (
    <div>
      {children}
    </div>
  )
}
UserProtectedWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProtectedWrapper
