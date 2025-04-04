import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./room.styles.scss"
import Carousel from "../../componenets/Carousel/Carousel"
import { reset } from "../../features/booking/bookingSlice"
import { useDispatch } from "react-redux"
const Room = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const BASE_URL = process.env.REACT_APP_API_URL || "https://booking-app-main-c9r3.vercel.app";

  const [room, setRoom] = useState(null);

  
  useEffect(() => {
    const getRoom = async () => {
    
      try{
        const res = await fetch(`${BASE_URL}/api/rooms/${id}`)
        if(res.ok) {
          const data = await res.json();
          setRoom(data);  
        }
      } catch(error) {
          console.log(error);   
      }
    }
    getRoom()
  }, [])

   useEffect(() => {
    dispatch(reset())
   }, [])
   

  
  return (
    <div id="room">
      <div className="container">
      {room ?
       <div>
          <div className="img-wrapper">
              <Carousel data={room.img}  />
        
          </div>
         <div className="text-wrapper">
         <h1 className="heading center">{room.name}</h1>
          <p>{room.desc}</p>
          <h2> ${room.price.toFixed(2)}</h2>
          <div className="cta-wrapper">
        <Link to={`/bookings/${room._id}`}>Book Now</Link>
       </div>
         </div>
        
      </div>
      
       : null}
       
      </div>
    
    </div>
  )
}

export default Room
