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

const UPDATE_PROJECT_DESCRIPTION = gql`
  mutation UpdateProjectDescription($_id: ID!, $owner: ID!, $description: String) {
    updateProjectDescription(_id: $_id, owner: $owner, description: $description) {
      description
    }
  }
`

const ProjectDescription = ({ data, _id }) => {
  const classes = useStyles()
  const { user } = useUser()
  const [projectDescription, setProjectDescription] = useState<string>(data)
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(null)
  const [edit, setEdit] = useState<boolean>(!data)

  const [updateProjectDescription, { loading, error }] = useMutation(UPDATE_PROJECT_DESCRIPTION, {
    onCompleted(val) {
      const newDescription = val.updateProjectDescription.description
      setProjectDescription(newDescription)
      setUpdatedDescription(newDescription)
      setEdit(false)
    },
  })

  const updateDescription = (e) => {
    e.preventDefault()
    updateProjectDescription({
      variables: { _id, owner: user?.sub?.split('|')[1], description: projectDescription },
    })
  }

  const handleChange = (e) => {
    setProjectDescription(e.target.value)
  }

  const cancel = () => {
    const revertDescription = updatedDescription || data

    setProjectDescription(revertDescription)
    setEdit(false)
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  return (
    <div className="p-4 md:p-6">
      {!edit ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">Project Details</h3>
      {edit ? (
        <form onSubmit={updateDescription} className="flex flex-col ">
          <TextField
            id="outlined-multiline-static"
            label="Project Details"
            value={projectDescription}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            color="primary"
            required
            fullWidth
          />
          <div className="self-end pt-2">
            <Button type="submit" className={classes.savecancelbtn} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => cancel()} className={classes.savecancelbtn} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div>{projectDescription}</div>
        </div>
      )}
    </div>
  )
}
export default ProjectDescription
