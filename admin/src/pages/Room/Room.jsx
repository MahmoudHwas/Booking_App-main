import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset, deleteRoom } from "../../features/room/roomSlice"
import "./room.styles.scss"
import Carousel from "../../componenet/Carousel/Carousel"
const Room = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {id} = useParams()

   const { isSuccess} = useSelector((state) => state.room)
const {user} = useSelector((state)=> state.auth);


  const [room, setRoom] = useState(null);

  useEffect(() => {
    if(isSuccess) {
      navigate("/rooms")
      dispatch(reset())
    }
  }, [isSuccess])
  
  useEffect(() => {
    const getRoom = async () => {
    
      try{
        const res = await fetch(`/api/rooms/${id}`)
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

    const handleDelete = async() => {
      dispatch(deleteRoom(id))
    }

  
  return (
    <div id="room">
      <div className="container">
      {room ?
       <div>
          <div className="img-wrapper">
              <Carousel data={room.img}/>
        
          </div>
         <div className="text-wrapper">
         <h1 className="heading center">{room.name}</h1>
          <p>{room.desc}</p>
          <h2> ${room.price.toFixed(2)}</h2>
            <div className="cta-wrapper">
            <Link to={`/edit/rooms/${room._id}`} >Edit Room</Link>
            {user.data.isAdmin ? <button onClick={handleDelete}>Delete</button> : null}
            </div>
          
         </div>
      </div>
       : null}
      </div>
    
    </div>
  )
}

export default Room
