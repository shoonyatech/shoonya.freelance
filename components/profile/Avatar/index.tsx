/* eslint-disable jsx-a11y/label-has-associated-control */
// import Axios from 'axios'
import { gql, useMutation, useQuery } from '@apollo/client'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import { Image } from 'cloudinary-react'
import React, { useEffect, useState } from 'react'

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      picture
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUserPicture($_id: ID!, $picture: String) {
    updateUserPicture(_id: $_id, picture: $picture) {
      name
      title
    }
  }
`

const Avatar = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const [picture, setPicture] = useState<URL | null>(null)
  const { loading, data } = useQuery(GET_USER)
  const [updateUserPicture, { error }] = useMutation(UPDATE_USER)

  const uploadImage = async (files: any) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'shoonya')
    await Axios.post('https://api.cloudinary.com/v1_1/dbbunxz2o/upload', formData).then((response) => {
      updateUserPicture({
        variables: { _id: '613890d00e9d3a2bfc8dd2f7', picture: response.data.secure_url },
        refetchQueries: [{ query: GET_USER }],
      })
      setPicture(response.data.secure_url)
      setEdit(false)
    })
  }

  const removeImage = async () => {
    await updateUserPicture({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', picture: null },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(true)
  }

  useEffect(() => {
    if (data?.user?.picture) {
      setPicture(data.user.picture)
      setEdit(false)
    } else setEdit(true)
  }, [data])
  if (loading) return <div>Loadixng...</div>

  if (error) return <div>Error! ${error.message}</div>

  return (
    <div className="flex flex-col justify-self-end p-6">
      {edit ? (
        <label className="text-gray-700 dark:text-gray-200 custom-file w-40 h-40 rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800  shadow tracking-wide uppercase border cursor-pointer ">
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
        <div className="text-gray-700 dark:text-gray-200 custom-file w-40 h-40 rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800  shadow tracking-wide uppercase border cursor-pointer ">
          <Image cloudName="dbbunxz2o" className="rounded-full" publicId={picture} />
          <DeleteIcon onClick={() => removeImage()} color="error" className="absolute z-10 top-0 right-0 " />
        </div>
      )}
    </div>
  )
}

export default Avatar
