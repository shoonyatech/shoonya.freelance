import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { useContext, useEffect, useState } from 'react'

import { ProjectIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_PROJECT_TITLE } from '../../../gql/project'
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
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
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
          <div className="self-end pt-1">
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
          <h1 className="text-5xl text-black">{projectTitle}</h1>
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
