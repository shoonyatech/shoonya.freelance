import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import React from 'react'

const TextFieldAndDeleteBtn = ({ handleChange, index, label, value, openPopup }) => (
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
    <IconButton onClick={() => openPopup(index)} sx={{ alignSelf: 'flex-end', borderRadius: '999px' }} size="large">
      <DeleteIcon color="error" />
    </IconButton>
  </div>
)

export default TextFieldAndDeleteBtn
