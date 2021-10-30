import { gql, useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { useContext, useEffect, useState } from 'react'

import ProjectIsReadOnlyContext from '../../../src/context/ProjectIsReadOnlyContext'
import Loader from '../../common/Loader'

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
  mutation UpdateProjectTitle($_id: ID!, $owner: ID!, $title: String) {
    updateProjectTitle(_id: $_id, owner: $owner, title: $title) {
      title
    }
  }
`

const ProjectTitle = ({ data, userId, projectId }) => {
  const classes = useStyles()
  const [projectTitle, setProjectTitle] = useState<string>(data)
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null)
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(ProjectIsReadOnlyContext)

  useEffect(() => {
    setProjectTitle(data)
  }, [data])

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
      variables: { _id: projectId, owner: userId, title: projectTitle },
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

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      {edit && !isReadOnly ? (
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
          {!isReadOnly ? (
            <button type="button" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default ProjectTitle
