import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoom, reset } from "../../features/room/roomSlice";
import { useDispatch, useSelector } from "react-redux";
const EditRoom = () => {
  const BASE_URL = process.env.REACT_APP_API_URL || "https://booking-app-main-c9r3.vercel.app";

    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isSuccess} = useSelector((state) => state.room)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        desc: "",
        roomNumbers: ""
    })

    const {name, price, desc, roomNumbers} = formData;

    useEffect(() => {
        const getRoom = async () => {
                try{
                    const res = await fetch(`${BASE_URL}/api/rooms/${id}`);
                    const data = await res.json();
                    const  {roomNumbers, ...rest} = data
                    const roomNumb = roomNumbers.map((item) => item.number);

                    const roomString = roomNumb.join(",");
                    setFormData({
                        ...rest,
                        roomNumbers: roomString
                    })
                    
                } catch(error) {
                    console.log(error);
                    
                }
        }
        getRoom()
    }, [])

    useEffect(() => {
        if(isSuccess) {
          dispatch(reset())
          navigate("/rooms")
        }
   
    }, [isSuccess])
    
   const handleChange = (e) => {
    setFormData((prev =>({
        ...prev,
        [e.target.name]: e.target.value
    })))
   }

const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name || !price || !roomNumbers) {
        return;
      }
      const roomArray = roomNumbers.split(",").map((item) => {
        return {
          number: parseInt(item),
          unavailableDates: [],
        };
      });

      const dataToSubmit = {
        name,
        price,
        desc,
        roomNumbers: roomArray,
        roomId: id,
      };
   
      
dispatch(updateRoom(dataToSubmit))      
}

  return (
    <div className="container">
     <h1 className="heading center">EditRoom</h1> 
     <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">name</label>
                <input type="text" name="name" onChange={handleChange} value={name} />
            </div>

            <div className="input-group">
                <label htmlFor="price">price</label>
                <input type="number" name="price" onChange={handleChange} value={price} />
            </div>

            <div className="input-group">
              <label htmlFor="desc">Description</label>
               <textarea name="desc"
                onChange={handleChange} 
                value={desc}></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="roomNumbers">Room Numbers</label>
             <textarea name="roomNumbers"
              onChange={handleChange}
               placeholder="enter room numbers seperated by commas eg: 102, 103, 104, 105"
                value={roomNumbers}></textarea>
            </div>

           <button type="submit">Submit</button>

        </form>
     </div>
    </div>
  )
}

export default EditRoom
