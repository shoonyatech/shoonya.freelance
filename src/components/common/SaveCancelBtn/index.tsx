import Button from '@mui/material/Button'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const SaveCancelBtn = ({ cancelEdit }) => {
  const classes = useStyles()
  return (
    <div className="pt-2">
      <Button type="submit" className={classes.savecancelbtn} variant="contained" color="primary">
        Save
      </Button>
      <Button onClick={() => cancelEdit()} className={classes.savecancelbtn} variant="contained" color="secondary">
        Cancel
      </Button>
    </div>
  )
}

export default SaveCancelBtn
