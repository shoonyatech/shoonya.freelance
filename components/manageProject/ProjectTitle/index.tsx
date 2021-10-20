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

const ProjectTitle = () => {
  const classes = useStyles()
  const updateTitle = (e) => {
    e.preventDefault()
  }
  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <form className="flex flex-col" onSubmit={updateTitle}>
        <TextField
          name="projecttitle"
          label="Project Title"
          color="primary"
          margin="dense"
          variant="outlined"
          required
        />
        <div className="pt-1 self-end">
          <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button className={classes.savecancelbtn} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectTitle
