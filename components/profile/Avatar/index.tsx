/* eslint-disable jsx-a11y/label-has-associated-control */
// import Axios from 'axios'
import { gql, useMutation } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import { Image } from 'cloudinary-react'
import React, { useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../src/context/isReadOnlyContext'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'

const useStyles = makeStyles(() =>
  createStyles({
    deletebtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 10,
      padding: 0,
    },
  })
)

const UPDATE_USER = gql`
  mutation UpdateUserPicture($picture: String) {
    updateUserPicture(picture: $picture) {
      name
      title
    }
  }
`

const Avatar = ({ data }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState<boolean>(false)
  const [picture, setPicture] = useState<URL | null>(data)
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [updateUserPicture, { loading, error }] = useMutation(UPDATE_USER)

  const uploadImage = async (files: any) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'shoonya')
    await Axios.post('https://api.cloudinary.com/v1_1/dbbunxz2o/upload', formData).then((response) => {
      updateUserPicture({
        variables: { picture: response.data.secure_url },
      })
      setPicture(response.data.secure_url)
      setEdit(false)
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
    setEdit(true)
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="flex flex-col justify-self-end p-6">
      {edit && !isReadOnly ? (
        <label className="text-gray-700 dark:text-gray-200  w-40 h-40 rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800  shadow tracking-wide uppercase border cursor-pointer ">
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
      ) : (
        <div className="text-gray-700 dark:text-gray-200 relative w-40 h-40 rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800  shadow tracking-wide uppercase border cursor-pointer ">
          <Image cloudName="dbbunxz2o" className="rounded-full" publicId={picture} />
          {!isReadOnly ? (
            <IconButton className={classes.deletebtn} onClick={() => openPopup()}>
              <DeleteIcon color="error" />
            </IconButton>
          ) : null}
          {popUp ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
        </div>
      )}
    </div>
  )
}

export default Avatar
