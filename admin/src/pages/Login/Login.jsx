import React, { useState, useEffect } from 'react'
import { loginUser, reset } from '../../features/auth/authSlice';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isSuccess} = useSelector((state) => state.auth)
  const [formData, setformData] = useState({
 
    email: "",
    password: ""
  });
  const {email, password} = formData


  const handleChange = (e) => {
    setformData((prevent) => ({
      ...prevent,
      [e.target.name] : e.target.value
    }))

  }
const handleSubmit = (e) => {
    
      e.preventDefault();
      const dataToSubmit = {
         email, password
      }
      dispatch(loginUser(dataToSubmit) ) 
    
    }
    useEffect(() => {
        if(isSuccess) {
          navigate("/dashboard")
          dispatch(reset())
        }
       
      }, [isSuccess, user, dispatch,navigate]);
    
  return (
    <div className="container">
      <h1 className="heading center">Login</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
  
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email"
             placeholder="enter your email"
             name="email"
              value={email}
               onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password"
             placeholder="enter your password"
             name="password"
              value={password}
               onChange={handleChange} />
          </div>

            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
