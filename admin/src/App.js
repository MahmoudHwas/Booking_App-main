import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Header from './componenet/Header/Header'
import './App.scss'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateRoom from './pages/createRoom'
import Rooms from './pages/Rooms/Rooms'
import Room from './pages/Room/Room'
import EditRoom from './pages/EditRoom/EditRoom'
import Booking from './pages/Booking/Booking'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/rooms' element={<Rooms/>} />
          <Route path='/rooms/create' element={<CreateRoom/>} />
          <Route path='/rooms/all/:id' element={<Room/>} />
          <Route path='/edit/rooms/:id' element={<EditRoom/>} />
          <Route path='/bookings/:id' element={<Booking/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
