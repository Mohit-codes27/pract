import { Outlet } from 'react-router-dom'
import { Header, Footer } from './Components'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { UserDataContext } from './Components/Context/UserContext'
import axios from 'axios'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
  async function fetchUser() {
    try {
      let res = await axios.get('http://localhost:5000/me', { withCredentials: true });
      if (res.data && res.data.fullName) {
        const userData = { ...res.data, userType: 'employer' };
        dispatch(login({ userData }));
        setUser(userData); // ✅ fix here
        setLoading(false);
        return;
      }
    } catch {}

    try {
      let res = await axios.get('http://localhost:5000/employee-profile', { withCredentials: true });
      if (res.data && res.data.fullName) {
        const userData = { ...res.data, userType: 'employee' };
        dispatch(login({ userData }));
        setUser(userData); // ✅ fix here
        setLoading(false);
        return;
      }
    } catch {}

    dispatch(logout());
    setUser(null); // ✅ also ensure this
    setLoading(false);
  }

  fetchUser();
}, [dispatch]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-medium text-gray-700">
          Loading, please wait...
        </h2>
      </div>
    )
  }

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen flex flex-wrap content-between">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </UserDataContext.Provider>
  )
}

export default App
