import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { useDispatch } from 'react-redux';
// import {useNavigate} from 'react-router-dom'
import { setLikeClick, setSearchTerm, setShowData } from '../../redux/searchSlice';

const Navbar = () => {
    const [search , setSearch] = useState("");
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleSearch =()=>{
        console.log(search);
        dispatch(setSearchTerm(search))
        setSearch("");
    }
    const showData = ()=>{
      dispatch(setLikeClick(false));
      dispatch(setShowData(true));
      // navigate("/");
        console.log("show data");
    }

    const handleLike =()=>{
      dispatch(setLikeClick(true));
    }
    // useEffect(()=>{
    //   handleSearch();
    // },[dispatch])
  return (
    <div className='flex  flex-col md:flex-row justify-between items-center p-4 md:p-8 gap-2 w-full border-2 md:h-20'>
      <div className='text-3xl mb-4 md:mb-0' onClick={showData}>
        <FaHome />
      </div>
      <h1 className='text-xl md:text-2xl font-bold mb-4 md:mb-0'>Search Property to rent</h1>
      <div className='flex gap-2'>
        <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder='search' className='border-2 p-2 rounded-md' value={search} />
        <button onClick={handleSearch} className='bg-white text-black border-2 border-black p-2 rounded-md transition-colors duration-300 hover:bg-black hover:text-white'>Search</button>
        <button  onClick={handleLike} className='bg-white text-black border-2 border-black p-2 rounded-md transition-colors duration-300 hover:bg-black hover:text-white'>Liked</button>
      </div>
    </div>
  )
}

export default Navbar