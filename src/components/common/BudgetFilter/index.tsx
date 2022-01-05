import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'

import Currency from '../Currency'

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginRight: '1em',
      maxWidth: '4em',
    },
  })
)

const BudegtFilter = ({ label, name, state, updateFilter }) => {
  const classes = useStyles()

  const handleChange = (e) => {
    if (e.target.name === 'checked')
      updateFilter([e.target.checked, e.target.name])
    else
      updateFilter([e.target.value, e.target.name])
  }


  return (
    <div>
      <div className="flex">
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checked}
              onChange={handleChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
        <Currency currency={state.currency} />
      </div>
      <div className="flex">
        <TextField onChange={handleChange} name="min" label="min" value={state.min} type="number" className={classes.input} />
        <TextField onChange={handleChange} name="max" label="max" value={state.max} type="number" className={classes.input} />
      </div>
    </div>
  )
}

export default BudegtFilter
