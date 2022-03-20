import TextField from '@mui/material/TextField'
import React from 'react'

const WizardHeadlineFlow = ({ handleTextChange, state }) => (
  <div className="w-full">
    <p className="text-xl">Write a headline for you job post</p>

    <TextField
      label="title"
      value={state}
      onChange={handleTextChange}
      color="primary"
      margin="dense"
      variant="outlined"
      fullWidth
      required
    />
  </div>
)

export default WizardHeadlineFlow
