import React from 'react'
import { useParams } from 'react-router-dom';

const Products = () => {
  const { id } = useParams();

  return (
    <div className='border-2 border-red-800 ml-40 mr-40'>
      <div className='text-center'>
        <h1 className='text-3xl'>Add Products</h1>
      </div>
    </div>
  )
}

export default Products