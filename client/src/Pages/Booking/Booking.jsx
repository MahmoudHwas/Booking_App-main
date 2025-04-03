import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { createBooking, reset } from '../../features/booking/bookingSlice';
const Booking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id: roomId} = useParams();


    const {isSuccess} = useSelector((state) => state.booking)
    const [room, setRoom] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        checkInDate: "",
        checkOutDate: "",
    });

    const {name, email, checkInDate, checkOutDate} = formData;
 
  
 
    
    useEffect(  () => {
        const getRoom = async () => {
            try{
                const res = await fetch(`/api/rooms/${roomId}`);
                const data = await res.json();
                if(!res.ok) {
                    return console.log("there was a problem getting room");
                    
                }
                setRoom(data)
            } catch (error) {
                console.log(error.message);
                
            }
        };
        getRoom();
    }, [])

    useEffect(() => {
        if(isSuccess) {
           
            navigate("/success")
            dispatch(reset());
        }
    }, [isSuccess])

      const handleChange = (e)=> {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }
        const handleSubmit = (e) => {
            e.preventDefault();
            const dataToSubmit = {
                roomId,
                name,
                email,
                checkInDate,
                checkOutDate
            }
            dispatch(createBooking(dataToSubmit))
            
            
        }
  return (
    <div>
      <h1 className="heading center">Booking</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                     name='name'
                      value={name}
                       placeholder='enter your full name'
                        onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                     name='email'
                      value={email}
                       placeholder='enter your Email'
                        onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="checkInDate">Check In Date</label>
                    <input type="date"
                     name='checkInDate'
                     value={checkInDate} 
                     onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="checkOutDate">Check Out Date</label>
                    <input type="date"
                     name='checkOutDate'
                     value={checkOutDate} 
                     onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Booking
