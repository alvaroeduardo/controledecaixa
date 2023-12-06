import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import Login from './Pages/Login.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Dashboard from './Pages/Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Dashboard/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ChakraProvider>,
)
