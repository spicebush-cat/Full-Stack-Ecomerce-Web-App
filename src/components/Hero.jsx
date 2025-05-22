import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Hero() {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()

  // Fetch slider data from backend API on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allslider')
      .then(response => {
        // Map backend data to frontend slide format
        const formattedSlides = response.data.map(slide => ({
          image: slide.slider_image,
          title: slide.slider_name,
          description: slide.slider_description,
          link: '/collection' // or dynamically set if you have links in backend
        }))
        setSlides(formattedSlides)
      })
      .catch(error => {
        console.error('Error fetching slider data:', error)
      })
  }, [])

  // Auto-slide only if slides loaded
  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides])

  const handleShopNow = () => {
    setClicked(true)
    setTimeout(() => {
      setClicked(false)
      if (slides[current]?.link) {
        navigate(slides[current].link)
      }
    }, 200)
  }

  if (slides.length === 0) {
    return <div>Loading slider...</div>
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center border-2 border-gray-100 h-auto sm:h-[33.5vw] p-6 sm:p-10 gap-y-10">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center sm:items-start w-full sm:w-1/2 text-center sm:text-left">
        {/* Bestseller Line */}
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
        </div>

        {/* Dynamic Title */}
        <h2 className="prata-regular text-4xl sm:text-5xl md:text-6xl text-[#414141] leading-tight">
          {slides[current].title}
        </h2>

        {/* Dynamic Description */}
        <p className="mt-2 text-[#414141] text-base md:text-lg">
          {slides[current].description}
        </p>

        {/* Shop Now Button with effect */}
        <div className="flex items-center gap-2 text-[#414141] mt-3 sm:mt-5">
          <button
            onClick={handleShopNow}
            className={`relative font-medium text-sm md:text-base cursor-pointer focus:outline-none px-5 py-2 rounded border border-[#414141] overflow-hidden
              ${clicked ? "bg-[#414141] text-white scale-95 transition-all duration-200" : "hover:bg-[#414141] hover:text-white transition-all duration-200"}
            `}
            style={{ outline: 'none' }}
          >
            SHOP NOW
          </button>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
        </div>
      </div>

      {/* Right Side - Dynamic Image */}
      <div className="w-full sm:w-1/2 flex justify-center overflow-hidden">
        <img
          className="w-full h-auto max-h-[400px] object-cover rounded-lg transition-all duration-[1500ms]"
          src={slides[current].image}
          alt={slides[current].title}
        />
      </div>
    </div>
  )
}

export default Hero
