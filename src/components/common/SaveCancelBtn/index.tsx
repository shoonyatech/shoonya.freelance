import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
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
    <div className="self-end pt-2">
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
