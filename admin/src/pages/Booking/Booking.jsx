import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./booking.styles.scss";
import { deleteBooking, reset,confirmBooking } from '../../features/booking/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    const {isSuccess, isLoading, isError, message} = useSelector(state => state.booking)
    const BASE_URL = process.env.REACT_APP_API_URL || "https://booking-app-main-c9r3.vercel.app";


    useEffect(() => {
      if (isSuccess) {
        dispatch(reset());
        
      }
    }, [isSuccess, isLoading, message, isError]);
  
    useEffect(() => {

        const getBooking = async()=> {
            try{
                const res = await fetch(`${BASE_URL}/api/bookings/${id}`);
                const data = await res.json();
                setBooking(data)
              
            } catch (error) {
                console.log(error.message);
                
            }
        }

        getBooking()

    }, [])

   
    const handleDelete = () => {
      dispatch(deleteBooking(id))
      navigate("/dashboard");
    }
    const handleConfirm = () => {
      navigate("/dashboard");
      dispatch(confirmBooking(id));
    };
  return (
    <div id='booking'>
      <h1 className="heading center">Booking</h1>
      {booking && (
        <div className='content-wrapper'>
         <div className="text-wrapper">
            <h1 className="heading">{booking.name}</h1>
            <p className="email"> {booking.roomId?.name} </p>
            <p className="email"> {booking.email} </p>
            <p className="email"> checkin: {booking.checkInDate} </p>
            <p className="email"> checkout: {booking.checkOutDate} </p>
         </div>
         <div className="cta-wrapper">
         <button onClick={handleConfirm}>confirm</button>
         <button className='danger' onClick={handleDelete}>Delete</button>

         </div>
        </div>) }
    </div>
  )
}

export default Booking
