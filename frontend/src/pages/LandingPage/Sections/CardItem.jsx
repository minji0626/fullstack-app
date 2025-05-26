import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';
import { continents } from '../../../utils/filterData';

const CardItem = ({ product }) => {
  
  const continentObj = continents.find(c => c._id === product.continents);
  const continentName = continentObj ? continentObj.name : "알 수 없음";

  return (
    <div className='border-[1px] border-gray-300'>
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className='p-1'>{product.title}</p>
        <p className='p-1'>{continentName}</p>
        <p className='p-1 text-xs text-gray-500'>{product.price}원</p>
      </Link>
    </div>
  )
}

export default CardItem
