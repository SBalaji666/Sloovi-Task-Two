// import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
// import { BASE_URL } from '../../constants/constants';
// import axios from 'axios';

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// });

// export const postUsers = createAsyncThunk(
//   'users/postUsers',
//   async intialPost => {
//     const response = await axios.post(BASE_URL, intialPost);
//     return response.data;
//   }
// );

// export const updateUser = createAsyncThunk(
//   'users/updateUser',
//   async initialPost => {
//     const { id } = initialPost;
//     const response = await axios.put(`${BASE_URL}/${id}`, initialPost);
//     return response.data;
//   }
// );

// export const deleteUser = createAsyncThunk(
//   'users/deleteUser',
//   async initialPost => {
//     const { id } = initialPost;
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     return initialPost;
//   }
// );

// const initialState = {
//   tasks: [],
// };
// const date = new Date();

// const getDate = () => {
//   const year = date.getFullYear();
//   const month = `${date.getMonth() + 1}`.padStart(2, 0);
//   const day = `${date.getDate()}`.padStart(2, 0);

//   return `${year}-${month}-${day}`;
// };

// const getTime = () => {
//   const hours = `${date.getHours()}`.padStart(2, 0);
//   const minutes = `${date.getMinutes()}`.padStart(2, 0);

//   return `${hours}:${minutes}`;
// };

// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {},

//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       const users = action.payload.map(user => {
//         user.task_date = user.task_date ?? getDate();
//         user.task_time = user.task_time ?? getTime();

//         return user;
//       });

//       state.tasks = state.tasks.concat(users);
//     });

//     builder.addCase(postUsers.fulfilled, (state, action) => {
//       state.tasks.push(action.payload);
//     });

//     builder.addCase(updateUser.fulfilled, (state, action) => {
//       const index = state.tasks.findIndex(
//         task => task.id === action.payload.id
//       );
//       state.tasks[index] = action.payload;
//     });

//     builder.addCase(deleteUser.fulfilled, (state, action) => {
//       const { id } = action.payload;
//       const tasks = state.tasks.filter(task => task.id !== id);
//       state.tasks = tasks;
//     });
//   },
// });

// export default tasksSlice.reducer;
