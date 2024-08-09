import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    showData:false,
    city:'',
    searchText: '',
    price:{
      higher:'',
      lower:'',
    },
    property:'',
    likes:[],
    likeClick :false,
  },
  reducers: {
    setShowData: (state, action) => {
      state.showData = action.payload; 
    },
    setSearchTerm: (state, action) => {
      state.searchText = action.payload; 
    },
    setPriceRange:(state,action)=>{
      state.price.higher = action.payload[1];
      state.price.lower = action.payload[0];
    },
    setPropertyRange:(state,action)=>{
      state.property = action.payload;
    },
    setCity:(state,action)=>{
      state.city = action.payload;
    },
    setLike:(state,action)=>{
      state.likes.push(action.payload);
    },
    setLikeClick:(state,action)=>{
      state.likeClick = action.payload;
    }
  },
});

export const { setLikeClick,setLike,setShowData,setSearchTerm , setPriceRange,setPropertyRange,setCity } = searchSlice.actions;

export default searchSlice.reducer;