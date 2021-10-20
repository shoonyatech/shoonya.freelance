import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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

const ProjectDescription = () => {
  const classes = useStyles()

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl md:text-2xl uppercase pb-3">Project Details</h3>
      <div className="flex flex-col ">
        <TextField
          id="outlined-multiline-static"
          label="Project Details"
          multiline
          rows={4}
          variant="outlined"
          color="primary"
          required
          fullWidth
        />
        <div className="self-end pt-2">
          <Button className={classes.savecancelbtn} variant="contained" color="primary">
            Save
          </Button>
          <Button className={classes.savecancelbtn} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
export default ProjectDescription
