/* eslint-disable react/button-has-type */
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'

const GET_USER = gql`
{
	user(_id: "613890d00e9d3a2bfc8dd2f7"){ 
    name
    title
  }
}`

const UserNameTitle = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, error, data } = useQuery(GET_USER);
  const toggleEdit = () => {
    setEdit(!edit)
  }

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! ${error.message}</div>;
  const { user } = data

  return (
    <div className="bg-resume flex flex-col justify-center p-6">
      {edit ? (
        <>
          <div className="flex flex-col ">
            <TextField label="Name" defaultValue={user.name} color="secondary" margin="dense" variant="outlined" />
            <TextField label="Title" defaultValue={user.title} color="secondary" margin="dense" variant="outlined" />
            <div className='self-end'>
              <Button onClick={()=>toggleEdit()} variant="contained" color="secondary">
                Cancel
              </Button>
              <Button onClick={()=>toggleEdit()} variant="contained" color="primary">
                Save
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col whitespace-nowrap">
            <button className="self-start" onClick={() => toggleEdit()}>
              <EditIcon />
            </button>

            <h1 className="text-black text-5xl">{user.name}</h1>
            <h3 className="">{user.title} </h3>
          </div>
        </>
      )}
    </div>
  )
}

export default UserNameTitle
