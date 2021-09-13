/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, useEffect, useState } from 'react'

interface UserObj {
  name: string
  title: string
}

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      name
      title
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserNameTitle($_id: ID!, $name: String, $title: String) {
    updateUserNameTitle(_id: $_id, name: $name, title: $title) {
      name
      title
    }
  }
`

const UserNameTitle = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const { loading, data } = useQuery(GET_USER)
  const [updateUserNameTitle, { error }] = useMutation(UPDATE_USER)

  const initialVal = {
    name: '',
    title: '',
  }

  const [nameTitle, setNameTitle] = useState<UserObj>(initialVal)

  useEffect(() => {
    if (data?.user) {
      setNameTitle({
        name: data.user.name,
        title: data.user.title,
      })
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setNameTitle({
      ...nameTitle,
      [evt.target.name]: evt.target.value,
    })
  }

  const updateUser = async () => {
    await updateUserNameTitle({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', name: nameTitle.name, title: nameTitle.title },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user) {
      setNameTitle({
        name: data.user.name,
        title: data.user.title,
      })
      setEdit(false)
    } else setNameTitle(initialVal)
  }

  const { name, title } = data?.user

  return (
    <div className="bg-resume flex flex-col justify-center p-6">
      {edit ? (
        <>
          <div className="flex flex-col ">
            <TextField
              name="name"
              label="Name"
              onChange={handleChange}
              value={nameTitle.name}
              color="secondary"
              margin="dense"
              variant="outlined"
              required
            />
            <TextField
              name="title"
              label="Title"
              onChange={handleChange}
              value={nameTitle.title}
              color="secondary"
              margin="dense"
              variant="outlined"
            />
            <div className="self-end">
              <Button className="ml-1" onClick={() => cancelUpdateUser()} variant="contained" color="secondary">
                Cancel
              </Button>
              <Button className="ml-1" onClick={() => updateUser()} variant="contained" color="primary">
                Save
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col whitespace-nowrap">
            <button className="self-start" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </button>

            <h1 className="text-black text-5xl">{name}</h1>
            <h3>{title} </h3>
          </div>
        </>
      )}
    </div>
  )
}

export default UserNameTitle
