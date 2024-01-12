import { useState } from 'react';
import styled from 'styled-components';


function Card({img, price, content,title }) {
  
  return (
      <div className='items-center  border-2 border-gray-200 shadow-lg rounded p-4 mt-6  h-full '>
        <div className='justify-center flex'><img src={img} className='h-full max-w-40' alt="" /></div>
        <div className='p-2 flex justify-center'><p className='mt-12 text-md text-pretty max-w-lg'>{title}</p></div>
        <div className='flex justify-center p-4 mt-6 text-2xl'><p>${price}</p></div>
        <div className=' mt-20  flex justify-center'><button className=' b-0 p-2 w-3/5 h-10 rounded-lg bg-gray-400 text-white  mb-0 '><a href=''>Visit Website</a></button></div>
        
      </div>

  )
}

export default Card;
