import React from 'react'

const SliderContainer = ({ children, openOrCloseSlider }) => (
  <div
    className={`${openOrCloseSlider}
                ? "translate-x-0 ease-out"
                : "translate-x-full ease-in"
            } fixed right-0 top-0 max-w-sm w-full h-full p-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
  >
    {children}
  </div>
)
export default SliderContainer
