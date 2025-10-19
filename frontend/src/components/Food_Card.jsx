import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Food_Card = ({ food }) => {
  const [isCart, setisCart] = useState(false)

  console.log(isCart);
  
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
      data-aos="zoom-in"
    >
      <img
        src={food.image}
        alt={food.name}
        className="object-cover rounded-lg w-full"
      />
      
      <div className="flex justify-between items-center mt-3">
        <h3 className="font-semibold text-lg">{food.name}</h3>
        <img src={assets.rating_starts} alt="rating" className="h-4" />
      </div>

      <p className="text-gray-500 text-sm mt-1">{food.description}</p>

      <div className="flex justify-between items-center mt-3">
        <p className="font-bold text-orange-500">₹{food.price}</p>
        <button
          onClick={() => setisCart(!isCart)}
          className={`px-3 py-1 rounded ${
            isCart ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          {isCart ? 'Remove ' : 'Add To Cart'}
        </button>
      </div>
    </div>
  )
}

export default Food_Card
