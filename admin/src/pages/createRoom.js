import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { createRoom , reset } from  "../features/room/roomSlice";

const CreateRoom = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)
    const {isSuccess} = useSelector(state => state.room)
    const [files, setFiles] = useState("")
    const [formData, setformData] = useState({
        name: "",
        price: "",
        desc: "",
        roomNumbers: "101, 102, 103, 104",
      });
      const {name, price, desc, roomNumbers} = formData
    
    
    
    useEffect(() => {
            if(!user) {
                navigate("/login")
            }
    
    }, [user]);

    useEffect(() => {
     
      if(isSuccess) {
        dispatch(reset())
        navigate("/rooms")
      }
     

}, [isSuccess]);

    const handleChange = (e) => {
      setformData((prevent) => ({
        ...prevent,
        [e.target.name] : e.target.value
      }))
  
    }
     const handleFileChange = (e) => {
      setFiles(e.target.files)
     }
   
     
const handleSubmit = async(e) => {
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

  let list = [];
  list = await Promise.all(
    Object.values(files).map(async (file) => {    
      const url = await uploadImage(file);
      return url;     
    })
  );
  
  const dataToSubmit = {
    name,
    price,
    desc,
    roomNumbers: roomArray,
    img: list
  };
  
  // dispatch createRoom function
  dispatch(createRoom(dataToSubmit));
  // let dataTosubmit = {name, price, desc, roomNumbers, img};
};
  return (
    <div className="container"> 
         <h1 className="heading center">create Room</h1>
          <div className="form-wrapper">
            <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text"
               name="name"
               placeholder="enter your room name"
                value={name}
                 onChange={handleChange}/>
            </div>

            <div className="input-group">
              <label htmlFor="price">Price</label>
              <input type="number"
               name="price"
               placeholder="enter your price"
                value={price}
                 onChange={handleChange}/>
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

            <div className="input-group">
              <label htmlFor="file">Images</label>
              <input type="file"
               name="file" multiple
               onChange={handleFileChange}/>
            </div>
          <button type="submit">Submit</button>
            </form>
          </div>
      
    </div>
  )
}

export default CreateRoom
