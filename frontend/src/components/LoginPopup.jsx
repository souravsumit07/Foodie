import React, { useState } from 'react'

const LoginPopup = ({ setShowLoginPopup }) => {


  const [isLogging, setisLogging] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 const handleForm=(e) => {
    e.preventDefault()
 } 

  return (
    
    <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center z-50">
     
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 relative">
       
        <button
          onClick={() => setShowLoginPopup(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{isLogging?"Sign In":"Sign Up"}</h2>


        <form className="flex flex-col gap-4" onSubmit={handleForm}>
          {!isLogging && (<input type='text' placeholder='Enter your name'  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"/>)}
          
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLogging?"Sign In":"Sign Up"}
          </button>
        </form>

        {isLogging?<p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <span onClick={()=>setisLogging(false)} className="text-orange-500 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>:<p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span onClick={()=>setisLogging(true)} className="text-orange-500 cursor-pointer hover:underline">
            Sign In
          </span>
        </p>}
      </div>
    </div>
  )
}

export default LoginPopup
    