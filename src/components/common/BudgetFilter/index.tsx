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

const BudegtFilter = ({ label, name, checked }) => {
  const classes = useStyles()
  return (
    <div>
      <div className="flex">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              // onChange={handleChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
        <Currency />
      </div>
      <div className="flex">
        <TextField label="min" type="number" className={classes.input} />
        <TextField label="max" type="number" className={classes.input} />
      </div>
    </div>
  )
}

export default BudegtFilter
