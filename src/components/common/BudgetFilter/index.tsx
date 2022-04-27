import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import React from 'react'

import Currency from '../Currency'

const BudegtFilter = ({ label, name, state, updateFilter }) => {
  const handleChange = (e) => {
    if (e.target.name === 'checked') updateFilter([e.target.checked, e.target.name])
    else updateFilter([e.target.value, e.target.name])
  }

  return (
    <div>
      <div className="flex">
        <FormControlLabel
          control={<Checkbox checked={state.checked} onChange={handleChange} name={name} color="primary" />}
          label={label}
        />
        <Currency handleChange={handleChange} currency={state.currency} />
      </div>
      <div className="flex">
        <TextField
          onChange={handleChange}
          name="min"
          label="min"
          value={state.min}
          type="number"
          sx={{ marginRight: '1em', maxWidth: '4em' }}
        />
        <TextField
          onChange={handleChange}
          name="max"
          label="max"
          value={state.max}
          type="number"
          sx={{ marginRight: '1em', maxWidth: '4em' }}
        />
      </div>
    </div>
  )
}

export default BudegtFilter
