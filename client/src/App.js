import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import Rooms from "./Pages/Rooms/Rooms"
import Room from "./Pages/Room/Room"
import "./App.scss"
import Header from "./componenets/Header/Header"
import Booking from "./Pages/Booking/Booking"
import Success from "./Pages/Success/Success"
import Home from "./Pages/Home/Home"
const App = () => {
  return (
    <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Rooms" element={<Rooms />}></Route>
            <Route path="/Rooms/all/:id" element={<Room />}></Route>
            <Route path="/bookings/:id" element={<Booking />}></Route>
            <Route path="/success" element={<Success />}></Route>
          </Routes>
        </Router>
    </div>
  )
}

export default App


