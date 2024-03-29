import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Bills from './pages/Bills'
import CartPage from './pages/CartPage'
import Homepage from './pages/Homepage'
import Customers from './pages/Customers'
import Items from './pages/Items'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/items'
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path='/bills'
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route
            path='/customers'
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

export function ProtectedRoute({ children }) {
  if (localStorage.getItem('pos-user')) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}
