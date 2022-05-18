import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, useState } from 'react'

import { UPDATE_USER_BIO } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'

const Bio = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useIsReadOnlyContext()

  const [bio, setBio] = useState<null | String>(data)
  const [updatedBio, setUpdatedBio] = useState(null)

  const [updateUserBio, { loading, error }] = useMutation(UPDATE_USER_BIO, {
    onCompleted(val) {
      const newBio = val.updateUserBio.bio
      setBio(newBio)
      setUpdatedBio(newBio)
      setEdit(false)
    },
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setBio(evt.target.value)
  }

  const updateUser = async (e) => {
    e.preventDefault()
    await updateUserBio({
      variables: { bio },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserBio = updatedBio || data
    setBio(revertUserBio)
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
      <h3 className="pb-3 text-xl uppercase md:text-2xl">bio</h3>
      {edit && !isReadOnly ? (
        <form onSubmit={updateUser} className="flex flex-col ">
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            value={bio}
            multiline
            onChange={handleChange}
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
              sx={{
                marginRight: '.5rem',
              }}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div>{bio}</div>
        </div>
      )}
    </div>
  )
}
export default Bio
