/* eslint-disable jsx-a11y/label-has-associated-control */
// import Axios from 'axios'
import React from 'react'

const Avatar = () => (
  /* const uploadImage = (files: File) => {
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'shoonya')
    Axios.post('https://api.cloudinary.com/v1_1/dbbunxz2o/upload', formData).then((response) => {
      console.log(response)
    })
  } */
  <div className="flex flex-col justify-self-end p-6">
    <label className="text-gray-700 dark:text-gray-200 custom-file w-40 h-40 rounded-full flex flex-col items-center justify-center bg-white dark:bg-brand-grey-800 dark:border-brand-grey-800  shadow tracking-wide uppercase border cursor-pointer ">
      <svg className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
      </svg>
      <span className="mt-2 text-xs font-semibold leading-normal">Upload Photo</span>
      <input
        // onChange={(e) => uploadImage(e.target.files)}
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
      />
    </label>
  </div>
)

export default Avatar
