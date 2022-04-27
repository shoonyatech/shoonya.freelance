/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_DEVELOPERCOMUNITYINVOLVEMENT } from '../../../gql/user'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextEditor from '../TextEditor'
import TextEditorReadOnly from '../TextEditorReadOnly'

interface developerCommunityInvolementObj {
  title: string
  description: string
}

const DeveloperCommunityInvolement = ({ data }) => {
  const [popUp, setPopup] = useState({ show: false, index: null })
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [developerCommunityInvolement, setDeveloperCommunityInvolement] =
    useState<developerCommunityInvolementObj[]>(data)
  const [updatedDeveloperCommunityInvolement, setupdatedDeveloperCommunityInvolement] = useState(null)

  const [updateUserDeveloperCommunityInvolement, { loading, error }] = useMutation(
    UPDATE_USER_DEVELOPERCOMUNITYINVOLVEMENT,
    {
      onCompleted(val) {
        const newDeveloperCommunityInvolement = val.updateUserDeveloperCommunityInvolement.developerCommunityInvolement
        setDeveloperCommunityInvolement(newDeveloperCommunityInvolement)
        setupdatedDeveloperCommunityInvolement(newDeveloperCommunityInvolement)
        setEdit(false)
      },
    }
  )

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filterTypenameMap = developerCommunityInvolement.map((item) => removeKey('__typename', item))

    await updateUserDeveloperCommunityInvolement({
      variables: { developerCommunityInvolement: filterTypenameMap },
    })
    setEdit(false)
  }

  const cancelUpdateUser = () => {
    const revertUserDeveloperCommunityInvolement = updatedDeveloperCommunityInvolement || data
    setDeveloperCommunityInvolement(revertUserDeveloperCommunityInvolement)
    setEdit(false)
  }

  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }
  const handleDelete = async () => {
    const filterDeletedItem = developerCommunityInvolement.filter((_, index) => index !== popUp.index)
    const filterTypenameMap = filterDeletedItem.map((item) => removeKey('__typename', item))
    await updateUserDeveloperCommunityInvolement({
      variables: { developerCommunityInvolement: filterTypenameMap },
    })
    closePopUp()
  }

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement.slice(0, index),
      { ...developerCommunityInvolement[index], [evt.target.name]: evt.target.value },
      ...developerCommunityInvolement.slice(index + 1),
    ])
  }

  const handleEditorChange = (index: number) => (evt: any) => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement.slice(0, index),
      { ...developerCommunityInvolement[index], description: evt },
      ...developerCommunityInvolement.slice(index + 1),
    ])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }

  const addDeveloperCommunityInvolement = () => {
    setDeveloperCommunityInvolement([
      ...developerCommunityInvolement,
      {
        title: '',
        description: '',
      },
    ])
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="p-4 md:p-6">
      {!edit && !isReadOnly ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="pb-3 text-xl uppercase md:text-2xl">developer community involement</h3>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <div>
            {developerCommunityInvolement.map((dev, i: number) => (
              <div key={i} className="flex flex-col pb-28">
                <IconButton
                  onClick={() => openPopup(i)}
                  sx={{
                    alignSelf: 'flex-end',
                    borderRadius: '999px',
                  }}
                  size="large"
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <TextField
                  label="Title"
                  margin="dense"
                  value={dev.title}
                  name="title"
                  onChange={handleChange(i)}
                  variant="outlined"
                  color="primary"
                  required
                  fullWidth
                />
                <div className="text-xl md:text-2xl">Description</div>
                <TextEditor handleEditorChange={handleEditorChange(i)} defaultValue={dev.description} />
              </div>
            ))}
            {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          </div>
          <Button
            sx={{
              alignSelf: 'flex-end',
              borderRadius: '999px',
            }}
            onClick={() => addDeveloperCommunityInvolement()}
          >
            Add Developer Community Involvement
          </Button>
          <div className="self-end pt-2">
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
        <div>
          {developerCommunityInvolement.map((dev, i): any => (
            <div key={i}>
              <div className="font-bold uppercase">{dev.title}</div>
              <TextEditorReadOnly defaultValue={dev.description} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeveloperCommunityInvolement
