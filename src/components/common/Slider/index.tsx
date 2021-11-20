import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import React from 'react'

const SliderContainer = ({ children, openOrCloseSlider, closeSlider }) => (
  <div
    className={`${openOrCloseSlider}
                ? "translate-x-0 ease-out"
                : "translate-x-full ease-in"
            } fixed right-0 top-0 max-w-sm w-full h-full p-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}
  >
    <div className="flex items-center justify-end">
      <IconButton onClick={closeSlider}>
        <CancelIcon />
      </IconButton>
    </div>
    {children}
  </div>
)
export default SliderContainer
