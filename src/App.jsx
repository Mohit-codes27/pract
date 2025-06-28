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
    const token = localStorage.getItem('token')
    const userData = token ? JSON.parse(localStorage.getItem('user')) : null

    if (userData) {
      setUser(userData)
      dispatch(login({ userData })) // ✅ Ensure object format
    } else {
      setUser(null)
      dispatch(logout())
    }
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    async function fetchUser() {
      try {
        // Try employer session first
        let res = await axios.get('http://localhost:5000/me', { withCredentials: true })
        if (res.data && res.data.fullName) {
          dispatch(login({ userData: { ...res.data, userType: 'employer' } }))
          return
        }
      } catch {
        // If employer session fails, try candidate session
        console.error('Employer session not found, trying employee session...')
      }

      try {
        // Try employee session if employer not found
        let res = await axios.get('http://localhost:5000/employee-profile', { withCredentials: true })
        if (res.data && res.data.fullName) {
          dispatch(login({ userData: { ...res.data, userType: 'employee' } }))
          return
        }
      } catch {
        console.error('Employee session not found')
      }

      dispatch(logout())
    }
    fetchUser()
  }, [dispatch])

  if (loading) return null

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
