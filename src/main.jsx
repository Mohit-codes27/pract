import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Information from './Components/Information/Information.jsx'
import { AuthLayout, SignUp, Setting, PrivacyPage, Contact, Login, SignUp2, ProfilePage, AbroadPage, MentorPage, InternshipFilter, InternshipDetail, JobDetail, JobFilter, CourseDetail, CourseFilter, BookPage, JobPost } from './Components/index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App.jsx must include <Outlet />
    children: [
      {
        path: '', // Root route
        element: <Home/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'information',
        element: <Information/>
      },
      {
        path: 'contact',
        element: <Contact/>
      },
      {
        path: 'privacy',
        element: <PrivacyPage/>
      },
      {
        path: 'abroad',
        element: <AbroadPage/>
      },
      {
        path: 'setting',
        element: <Setting/>
      },
      {
        path: 'book',
        element: <BookPage/>
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      },
      {
        path: 'mentor',
        element: <MentorPage/>
      },
      {
        path: 'internships',
        element: <InternshipFilter/>
      },
      {
        path: 'internship/:id',
        element: <InternshipDetail/>
      },
      {
        path: 'jobs',
        element: <JobFilter/>
      },
      {
        path: 'job-post',
        element: <JobPost/>
      },
      {
        path: 'job/:id',
        element: <JobDetail/>
      },
      {
        path: 'courses',
        element: <CourseFilter/>
      },
      {
        path: 'course/:id',
        element: <CourseDetail/>
      },
      {
        path: 'login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: 'signup2',
        element: (
          <AuthLayout authentication={false}>
            <SignUp2 />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
