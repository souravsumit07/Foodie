import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Placeorders from './pages/Placeorders'
import AOS from 'aos'
import "aos/dist/aos.css"
import LoginPopup from './components/LoginPopup'

const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 3000 })
  }, [])

  return (
    <div>
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      <Navbar setShowLoginPopup={setShowLoginPopup} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Placeorders />} />
      </Routes>
    </div>
  )
}

export default App
