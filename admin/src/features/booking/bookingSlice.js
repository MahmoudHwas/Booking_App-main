import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const  initialState = {
  bookings:[],
booking:null,
isLoading: false,
isSuccess: false,
isError: false,
message: ""
}
// create Booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const res = await fetch(`https://booking-app-main-henna.vercel.app/api/bookings`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


// get all rooms
export const getBooking =  createAsyncThunk("booking/getbookings", async (_, thunkApi) => {
    try{

        const res = await fetch("https://booking-app-main-henna.vercel.app/api/bookings")
        if(!res.ok) {
            const error = await res.json();
            return thunkApi.rejectWithValue(error)
        }
        
        const data = await res.json();
        
        return data

    }catch(error) {
        console.log(error.message);
       return thunkApi.rejectWithValue(error.message)
        
    }
});


  
//delete room 
export const deleteBooking = createAsyncThunk("booking/delete",
    async (id, thunkApi) => {
      try {
        const res = await fetch(`https://booking-app-main-henna.vercel.app/api/bookings/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          return thunkApi.rejectWithValue(data);
        }
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  export const confirmBooking = createAsyncThunk(
    "bookings/confirm",
    async (bookingId, thunkApi) => {
      try {
        const res = await fetch(`https://booking-app-main-henna.vercel.app/api/bookings/${bookingId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ confirmed: true }),
        });
        console.log(res);
        
        const data = await res.json();
        if (!res.ok) {
          return thunkApi.rejectWithValue(data);
        }
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
          
       },
    },
    extraReducers: (builder) => {
         builder.addCase(createBooking.pending, (state) => {
                   state.isLoading = true
               })
               .addCase(createBooking.fulfilled, (state, action) => {
                           state.isLoading = false
                           state.isSuccess = true
                           state.booking = action.payload
               
               
                       })
                       .addCase(createBooking.rejected, (state, action) => {
                           state.isLoading = false;
                           state.isError = true;
                           state.message = action.payload;
                       })
                       .addCase(getBooking.pending, (state) => {
                        state.isLoading = true
                    })
                       .addCase(getBooking.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.bookings = action.payload
            
            
                    })
                    .addCase(getBooking.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    })
                    .addCase(deleteBooking.pending, (state) => {
                        state.isLoading = true
                    })
                       .addCase(deleteBooking.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.bookings = state.bookings.filter(
                          (booking) => booking._id.toString() !== action.payload.id)
            
            
                    })
                    .addCase(deleteBooking.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    })
                    .addCase(confirmBooking.pending, (state, action) => {
                      state.isLoading = true;
                    })
                    .addCase(confirmBooking.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.isSuccess = true;
                      state.bookings = action.payload;
                    })
                    .addCase(confirmBooking.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.message = action.payload;
                    });
                  
                    
                       
    }
});

export const {reset} = bookingSlice.actions;
export default bookingSlice.reducer;