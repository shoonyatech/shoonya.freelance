import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
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
      <IconButton onClick={() => openPopup(index)} className={classes.btn} size="large">
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  )
}

export default TextFieldAndDeleteBtn
