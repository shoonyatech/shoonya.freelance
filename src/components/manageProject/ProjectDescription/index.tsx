import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'

import { UPDATE_PROJECT_DESCRIPTION } from '../../../gql/project'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'

const ProjectDescription = ({ data, userId, projectId }) => {
  const [projectDescription, setProjectDescription] = useState<string>(data)
  const [updatedDescription, setUpdatedDescription] = useState<string | null>(null)
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useIsReadOnlyContext()

  const [updateProjectDescription, { loading, error }] = useMutation(UPDATE_PROJECT_DESCRIPTION, {
    onCompleted(val) {
      const newDescription = val.updateProjectDescription.description
      setProjectDescription(newDescription)
      setUpdatedDescription(newDescription)
      setEdit(false)
    },
  })

  useEffect(() => {
    setProjectDescription(data)
  }, [data])

  const updateDescription = (e) => {
    e.preventDefault()
    updateProjectDescription({
      variables: { _id: projectId, owner: userId, description: projectDescription },
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

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="p-4 md:p-6">
      {!edit && !isReadOnly ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="pb-3 text-xl uppercase md:text-2xl">Project Details</h3>
      {edit && !isReadOnly ? (
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
            <Button
              type="submit"
              sx={{
                marginRight: '.5rem',
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => cancel()}
              sx={{
                marginRight: '.5rem',
              }}
              variant="contained"
              color="secondary"
            >
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
