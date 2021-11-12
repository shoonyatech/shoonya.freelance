import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_BIO } from '../../../gql/user'
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

const Bio = ({ data }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

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
      <h3 className="text-xl md:text-2xl uppercase pb-3">bio</h3>
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
            <Button type="submit" className={classes.savecancelbtn} variant="contained" color="primary">
              Save
            </Button>
            <Button
              className={classes.savecancelbtn}
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
