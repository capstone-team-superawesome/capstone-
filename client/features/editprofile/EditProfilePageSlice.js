// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
//   try {
//     const { data } = await axios.get(`api/users/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const editUser = createAsyncThunk(
//   "editUser",
//   async ({ id, updateEmail, updatePassword, profileImage, updateBio }) => {
//     try {
//       //waiting for api backend
//       const { data } = await axios.put(`/api/users/${id}`, {
//         email: updateEmail,
//         password: updatePassword,
//         profilePicture: profileImage,
//         bio: updateBio,
//       });
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// const editProfilePageSlice = createSlice({
//   name: "editProfilePage",
//   initialState: {},
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(editUser.fulfilled, (state, action) => {
//         return action.payload;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         return action.payload;
//       });
//   },
// });

// export default editProfilePageSlice.reducer;
