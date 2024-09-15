import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Home,Login,Signup,AddPost,AllPosts,Post,EditPost} from './pages/pages.js'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/login',
        element : (
          <AuthLayout authorized={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthLayout authorized={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path : '/all-posts',
        element : (
          <AuthLayout >
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path : '/add-post',
        element : (
          <AuthLayout >
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path : '/edit-post/:id',
        element : (
          <AuthLayout>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path : '/post/:id',
        element : (
          <AuthLayout>
            <Post/>
          </AuthLayout>
        )
      }
    ]
  }
])

// all app children will have access login status of user
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
