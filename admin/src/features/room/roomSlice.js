import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const  initialState = {
rooms: [],
isLoading: false,
isSuccess: false,
isError: false,
message: ""
}
// create Rooms
export const createRoom =  createAsyncThunk("rooms/create", async (roomData, thunkApi) => {
    try{
      
        
        const res = await fetch("https://booking-app-main-c9r3-git-main-mahmoudhwas-projects.vercel.app/api/rooms", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(roomData)
        })
        if(!res.ok) {
            const error = await res.json();
            return thunkApi.rejectWithValue(error)
        }
        const data = await res.json();
        console.log(data);
        
        return data

    }catch(error) {
        console.log(error.message);
       return thunkApi.rejectWithValue(error.message)
        
    }
})

// get all rooms
export const getRooms =  createAsyncThunk("rooms/getall", async (_, thunkApi) => {
    try{

        const res = await fetch("https://booking-app-main-c9r3-git-main-mahmoudhwas-projects.vercel.app/api/rooms")
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

// update room
export const updateRoom = createAsyncThunk("rooms/update", async (roomData, thunkApi) => {
      try {
        const { roomId, ...rest } = roomData;
       ;
        const res = await fetch(`https://booking-app-main-c9r3-git-main-mahmoudhwas-projects.vercel.app/api/rooms/${roomId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(rest)
        });
        const data = await res.json();
        if (!res.ok) {
          return thunkApi.rejectWithValue(data);
        }
   
        return data;
      } catch (error) {
        console.log(error.message);
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );
  
//delete room 
export const deleteRoom = createAsyncThunk("rooms/delete",
    async (roomId, thunkApi) => {
      try {
        const res = await fetch(`https://booking-app-main-c9r3-git-main-mahmoudhwas-projects.vercel.app/api/rooms/${roomId}`, {
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

export const roomSlice = createSlice({
    name: "room",
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
         builder.addCase(createRoom.pending, (state) => {
                   state.isLoading = true
               })
               .addCase(createRoom.fulfilled, (state, action) => {
                           state.isLoading = false
                           state.isSuccess = true
                           state.rooms = action.payload
               
               
                       })
                       .addCase(createRoom.rejected, (state, action) => {
                           state.isLoading = false;
                           state.isError = true;
                           state.message = action.payload;
                       })
                       .addCase(getRooms.pending, (state) => {
                        state.isLoading = true
                    })
                       .addCase(getRooms.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.rooms = action.payload
            
            
                    })
                    .addCase(getRooms.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    })
                    .addCase(updateRoom.pending, (state) => {
                        state.isLoading = true
                    })
                       .addCase(updateRoom.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.isSuccess = true
                        state.rooms = action.payload
            
            
                    })
                    .addCase(updateRoom.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                    })
                    .addCase(deleteRoom.pending, (state) => {
                        state.isLoading = true;
                      })
                      .addCase(deleteRoom.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.rooms = state.rooms.filter(
                          (room) => room._id !== action.payload.id
                        );
                      })
                      .addCase(deleteRoom.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.message = action.payload;
                      });
                    
                       
    }
});

export const {reset} = roomSlice.actions;
export default roomSlice.reducer;