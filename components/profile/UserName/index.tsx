import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'

const UserName = () => {
  const [edit, setEdit] = useState(false)

  return (
    <div className="bg-resume flex flex-col justify-center p-6">
      {edit ? (
        <>
          <EditIcon />
          <div className="flex flex-col ">
            <TextField label="Name" color="secondary" margin="dense" variant="outlined" />
            <TextField label="Title" color="secondary" margin="dense" variant="outlined" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col whitespace-nowrap">
            <h1 className="text-black text-5xl">SOUVIK BASU</h1>
            <h3 className="">FRONTEND DEVELOPER | TRAINER | SPEAKER </h3>
          </div>
        </>
      )}
    </div>
  )
}

export default UserName
