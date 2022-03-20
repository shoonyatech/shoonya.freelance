import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import React from 'react'

const RadioButtonsGroup = ({ formLabel, selectedValue, options, handleChange, ariaLabel, name }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{formLabel}</FormLabel>
    <RadioGroup aria-label={ariaLabel} name={name} value={selectedValue} onChange={handleChange}>
      {options.map((option: string) => (
        <FormControlLabel key={option} value={option} control={<Radio color="primary" />} label={option} />
      ))}
    </RadioGroup>
  </FormControl>
)
export default RadioButtonsGroup
