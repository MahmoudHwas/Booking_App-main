import { Link } from "react-router-dom";
import "./bookingList.styles.scss"

const BookingList = ({ data }) => {
 
  
    
  // Function to handle actions (e.g., edit, delete)
  const handleAction = (id, action) => {
    console.log(`${action} user with ID ${id}`);
  };


  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Confirmed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
               
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.roomId?.name}</td>
                <td>{item.confirmed ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/bookings/${item._id}`}> View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;