import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCity, setPriceRange, setPropertyRange } from '../../redux/searchSlice';

const Search = () => {
  const [priceValue, setPriceValue] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const arr = priceValue.split('-');
    console.log(cityValue);
    dispatch(setPriceRange(arr));
    dispatch(setCity(cityValue));
    dispatch(setPropertyRange(propertyValue));
    setCityValue('');
    setPriceValue('');
    setPropertyValue('');
  }

  return (
    <div className='flex flex-col md:flex-row justify-evenly m-4 bg-slate-200 h-auto md:h-32 p-4 rounded-md'>
      <div className='flex flex-col mb-4 md:mb-0 border-r border-gray-400 pr-4'>
        <h3 className='font-semibold mb-2'>Enter City</h3>
        <input
          type="text"
          placeholder="City Name"
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
          className='p-2 rounded-md border-2 border-gray-300'
        />
      </div>
      <div className='flex flex-col mb-4 md:mb-0 border-r border-gray-400 pr-4'>
        <h3 className='font-semibold mb-2'>Date</h3>
        <input
          type="date"
          placeholder='dd-mm-yyyy'
          className='p-2 rounded-md border-2 border-gray-300'
        />
      </div>
      <div className='flex flex-col mb-4 md:mb-0 border-r border-gray-400 pr-4'>
        <h3 className='font-semibold mb-2'>Price</h3>
        <select
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
          className='p-2 rounded-md border-2 border-gray-300'
        >
          <option value="">0-3000</option>
          <option value="0-500">RS:0-500</option>
          <option value="500-1000">Rs: 500-1000</option>
          <option value="1000-1500">Rs: 1000-1500</option>
          <option value="1500-2000">Rs: 1500-2000</option>
          <option value="2000-2500">Rs: 2000-2500</option>
          <option value="2500-3000">Rs: 2500-3000</option>
        </select>
      </div>
      <div className='flex flex-col border-r border-gray-400 pr-4'>
        <h3 className='font-semibold mb-2'>Property Type</h3>
        <select
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          className='p-2 rounded-md border-2 border-gray-300'
        >
          <option value="">All</option>
          <option value="house">House</option>
          <option value="pg">pg</option>
          <option value="Farmhouse">Farm-house</option>
          <option value="villa">Villa</option>
          <option value="hotel">Hotel</option>
          <option value="Oyo">Oyo</option>
        </select>
      </div>
      <div className='flex items-center gap-3 ml-3'>
        <button onClick={handleSubmit} className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400'>Submit</button>
      </div>
    </div>
  )
}

export default Search;