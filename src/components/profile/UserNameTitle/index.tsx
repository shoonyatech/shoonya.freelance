import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { UPDATE_USER_NAMETITLE } from '../../../gql/user'
import useIsReadonlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'

interface UserObj {
  name: string
  title: string
}

const UserNameTitle = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useIsReadonlyContext()

  const [nameTitle, setNameTitle] = useState<UserObj>(data)
  const [updatedNameTitle, setUpdatedNameTitle] = useState<string | null>(null)

  const [updateUserNameTitle, { loading, error }] = useMutation(UPDATE_USER_NAMETITLE, {
    onCompleted(val) {
      const newUserNameTitle = val.updateUserNameTitle
      setNameTitle(newUserNameTitle)
      setUpdatedNameTitle(newUserNameTitle)
      setEdit(false)
    },
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setNameTitle({
      ...nameTitle,
      [evt.target.name]: evt.target.value,
    })
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserNameTitle({
      variables: { name: nameTitle.name, title: nameTitle.title },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserNameTitle = updatedNameTitle || data
    setNameTitle(revertUserNameTitle)
    setEdit(false)
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            value={nameTitle.name}
            color="primary"
            margin="dense"
            variant="outlined"
            required
          />
          <TextField
            name="title"
            label="Title"
            onChange={handleChange}
            value={nameTitle.title}
            color="primary"
            margin="dense"
            variant="outlined"
          />
          <div className="self-end pt-1">
            <Button sx={{ marginRight: '0.5rem' }} type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              sx={{ marginRight: '0.5rem' }}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex justify-between">
            <h1 className="text-5xl text-black">{nameTitle.name}</h1>
            {!isReadOnly ? (
              <IconButton aria-label="edit username or/and title" onClick={() => setEdit(!edit)}>
                <EditIcon />
              </IconButton>
            ) : null}
          </div>
          <h3>{nameTitle.title} </h3>
        </div>
      )}
    </div>
  )
}

export default UserNameTitle
