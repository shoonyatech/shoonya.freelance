/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Axios from 'axios'
import React, { useState } from 'react'

import { UPDATE_USER_AVATAR } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Avatar from '../../common/Avatar'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'

const DisplayPicture = ({ data }) => {
  const [popUp, setPopup] = useState<boolean>(false)
  const [picture, setPicture] = useState<URL | null>(data)
  const isReadOnly = useIsReadOnlyContext()

  const [updateUserPicture, { loading, error }] = useMutation(UPDATE_USER_AVATAR)

  const uploadImage = async (files: any) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'shoonya')
    await Axios.post('https://api.cloudinary.com/v1_1/dbbunxz2o/upload', formData).then((response) => {
      updateUserPicture({
        variables: { picture: response.data.secure_url },
      })
      setPicture(response.data.secure_url)
    })
  }

  const openPopup = () => {
    setPopup(true)
  }
  const closePopUp = () => {
    setPopup(false)
  }

  const handleDelete = async () => {
    await updateUserPicture({
      variables: { picture: null },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="flex p-6 justify-self-end">
      {picture ? (
        <>
          <Avatar src={picture} tailwindSizeClass="h-40 w-40" />
          {isReadOnly ? null : (
            <IconButton
              sx={{
                alignSelf: 'flex-start',
              }}
              onClick={() => openPopup()}
              size="large"
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}
          {popUp ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
        </>
      ) : (
        <>
          {isReadOnly ? (
            <Avatar src={null} tailwindSizeClass="h-40 w-40" />
          ) : (
            <label className="flex flex-col items-center justify-center w-40 h-40 tracking-wide text-gray-700 uppercase bg-white border rounded-full shadow cursor-pointer dark:text-gray-200 dark:bg-brand-grey-800 dark:border-brand-grey-800">
              <svg className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-xs font-semibold leading-normal">Upload Photo</span>
              <input
                onChange={(e) => uploadImage(e.target.files)}
                className="hidden"
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
              />
            </label>
          )}
        </>
      )}
    </div>
  )
}

export default DisplayPicture
