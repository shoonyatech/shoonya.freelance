import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
  })
)

const TextFieldAndDeleteBtn = ({ handleChange, index, label, value, openPopup }) => {
  const classes = useStyles()
  return (
    <div className="flex">
      <TextField
        name="name"
        label={label}
        onChange={handleChange(index)}
        value={value}
        color="primary"
        margin="dense"
        variant="outlined"
        required
      />
      <IconButton onClick={() => openPopup(index)} className={classes.btn}>
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  )
}

export default TextFieldAndDeleteBtn
