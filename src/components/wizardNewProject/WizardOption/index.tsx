import Button from '@mui/material/Button'
import React from 'react'

const WizardProjectSizeOption = ({ children, handleOptionChange, parentkey, nestedkey, value, state }) => (
  <Button
    onClick={() => handleOptionChange(parentkey, nestedkey, value)}
    sx={{
      textAlign: 'center',
      padding: '1rem',
      border: '2px solid #282828',
      background: state[parentkey][nestedkey] === value ? '#dfe5cb' : '',
    }}
  >
    {children}
  </Button>
)
export default WizardProjectSizeOption
