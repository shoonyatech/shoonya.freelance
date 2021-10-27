import { gql, useMutation } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'

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

const UPDATE_PROJECT_TITLE = gql`
  mutation UpdateProjectTitle($owner: ID!, $title: String) {
    updateProjectTitle(owner: $owner, title: $title) {
      title
    }
  }
`

const ProjectTitle = ({ data }) => {
  const classes = useStyles()
  const { user } = useUser()
  const [projectTitle, setProjectTitle] = useState<string>(data)
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null)
  const [edit, setEdit] = useState<boolean>(false)

  const [updateProjectTitle, { loading, error }] = useMutation(UPDATE_PROJECT_TITLE, {
    onCompleted(val) {
      const newTitle = val.updateProjectTitle.title
      setProjectTitle(newTitle)
      setUpdatedTitle(newTitle)
      setEdit(false)
    },
  })

  const updateTitle = (e) => {
    e.preventDefault()
    updateProjectTitle({
      variables: { owner: user?.sub?.split('|')[1], title: projectTitle },
    })
  }

  const handleChange = (e) => {
    setProjectTitle(e.target.value)
  }

  const cancel = () => {
    const revertTitle = updatedTitle || data

    setProjectTitle(revertTitle)
    setEdit(false)
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>
  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      {edit ? (
        <form className="flex flex-col" onSubmit={updateTitle}>
          <TextField
            name="projecttitle"
            label="Project Title"
            value={projectTitle}
            onChange={handleChange}
            color="primary"
            margin="dense"
            variant="outlined"
            required
          />
          <div className="pt-1 self-end">
            <Button type="submit" className={classes.savecancelbtn} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => cancel()} className={classes.savecancelbtn} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between whitespace-nowrap">
          <h1 className="text-black text-5xl">{projectTitle}</h1>
          <button type="button" onClick={() => setEdit(!edit)}>
            <EditIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectTitle
