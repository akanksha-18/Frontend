import React, { useEffect, useState } from 'react';
import { resntdata } from './Card';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../../redux/searchSlice';

const Product = () => {
    const selector = useSelector((store) => store.search);
    const [filter, setFilter] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const dispatch = useDispatch();
    const data = resntdata;

    const handleLike = (index) => {
        setLikedItems((prevLikedItems) => {
            if (prevLikedItems.includes(index)) {
                return prevLikedItems.filter((item) => item !== index);
            } else {
                return [...prevLikedItems, index];
            }
        });
    };

    useEffect(() => {
        dispatch(setLike(likedItems));
    }, [likedItems, dispatch]);

    const filterData = () => {
        const res = data.filter((e) => {
            let matches = true;

            if (selector?.searchText) {
                matches = matches && e.title.toLowerCase().includes(selector.searchText.toLowerCase());
            }

            if (selector?.price?.higher && selector?.price?.lower) {
                matches = matches && e.price <= selector.price.higher && e.price >= selector.price.lower;
            }

            if (selector?.property) {
                matches = matches && e.type.toLowerCase().includes(selector.property.toLowerCase());
            }

            if (selector?.city) {
                matches = matches && e.address.toLowerCase().includes(selector.city.toLowerCase());
            }

            return matches;
        });

        setFilter(res);
    };

    useEffect(() => {
        filterData();
    }, [selector]);

    const renderProduct = (item, index) => (
        <div key={index} className='border border-black mb-4 w-full md:w-1/3 lg:w-1/4 rounded-md overflow-hidden'>
            <div className='w-full h-48'>
                <img src={item.imgurl} alt={item.title} className='w-full h-full object-cover rounded-md' />
            </div>
            <div className='p-4 flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-semibold mt-2'>{item.title}</h3>
                    <div className='flex items-center' onClick={() => handleLike(index)}>
                        {likedItems.includes(index) ? (
                            <FaHeart className='ml-2 text-red-500' />
                        ) : (
                            <FaRegHeart className='ml-2' />
                        )}
                    </div>
                </div>
                <p className='text-blue-500'>₹ {item.price}</p>
                <p className='text-black'>Address: {item.address}</p>
                <div className='flex justify-between mt-2'>
                    <p>Beds: {item.beds}</p>
                    <p>Baths: {item.bath}</p>
                    <p>Sqft: {item.sqft}</p>
                </div>
            </div>
        </div>
    );

    const renderLikedProducts = () => {
      if (likedItems.length === 0) {
          return <div>No liked items</div>;
      }
      return likedItems.map((index) => {
          const item = data[index];
          return renderProduct(item, index);
      });
  };

    return (
        <div className='flex flex-wrap justify-center gap-9'>
            {selector.likeClick ? (
                renderLikedProducts()
            ) : (
                selector.showData ? (
                    data.map(renderProduct)
                ) : (
                    filter.length > 0 ? (
                        filter.map(renderProduct)
                    ) : (
                        data.map(renderProduct)
                    )
                )
            )}
        </div>
    );
};

export default Product;