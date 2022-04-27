import Button from '@mui/material/Button'
import React from 'react'

const SaveCancelBtn = ({ cancelEdit }) => (
  <div className="pt-2">
    <Button type="submit" sx={{ marginRight: '.5rem' }} variant="contained" color="primary">
      Save
    </Button>
    <Button onClick={() => cancelEdit()} sx={{ marginRight: '.5rem' }} variant="contained" color="secondary">
      Cancel
    </Button>
  </div>
)

export default SaveCancelBtn
