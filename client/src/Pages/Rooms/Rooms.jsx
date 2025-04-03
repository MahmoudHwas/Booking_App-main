import { getRooms, reset } from "../../features/room/roomSlice";
import {useDispatch ,useSelector} from "react-redux";
import { useEffect } from "react";
import RoomList from "../../componenets/RoomList/RoomList";


const Rooms = () => {

    const dispatch = useDispatch();
    const {rooms} = useSelector((state) => state.room);
    useEffect(() => {
        dispatch(getRooms())
        dispatch(reset())
    }, [])
    console.log(rooms);
    
  return (
    <div>
    <div className="container">
      <h1 className="heading center">Rooms</h1>
 
      <RoomList data={rooms} />
    </div>
  </div> 
  )
}

export default Rooms
