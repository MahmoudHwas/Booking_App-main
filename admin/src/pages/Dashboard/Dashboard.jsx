import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getBooking } from "../../features/booking/bookingSlice";
import BookingList from "../../componenet/BookingList/BookingList";
const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth)
  const {bookings} = useSelector((state) => state.booking)
    useEffect(() => {
        if(!user) {
            navigate("/login")
        }
        dispatch(getBooking())
    
    }, [user]);
    
  return (
    <div>
    <h1 className="heading center">DashBoard</h1>
    {bookings.length > 0 ? <BookingList data={bookings} /> : null}
    </div>
  )
}

export default Dashboard
