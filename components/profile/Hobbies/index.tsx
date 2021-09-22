/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, useEffect, useState } from 'react'

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      hobbies
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserHobbies($_id: ID!, $hobbies: String) {
    updateUserHobbies(_id: $_id, hobbies: $hobbies) {
      hobbies
    }
  }
`
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

const Hobbies = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const classes = useStyles()
  const { loading, data } = useQuery(GET_USER)
  const [updateUserHobbies, { error }] = useMutation(UPDATE_USER)

  const [hobbies, setHobbies] = useState<String>('')

  useEffect(() => {
    if (data?.user?.hobbies) {
      setHobbies(data.user.hobbies)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setHobbies(evt.target.value)
  }

  const updateUser = async () => {
    await updateUserHobbies({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', hobbies },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.hobbies) {
      setHobbies(data.user.hobbies)
      setEdit(false)
    } else setHobbies('')
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Hobbies</h3>
        {!edit ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            value={hobbies}
            color="primary"
            margin="dense"
            variant="outlined"
            required
          />

          <div className="pt-1 self-end">
            <Button className={classes.savecancelbtn} onClick={() => updateUser()} variant="contained" color="primary">
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
        <>
          <div className="flex flex-col whitespace-nowrap">
            <div className="uppercase">{data.user.hobbies} </div>
            <hr className="h-px border-0 bg-black w-4/5 mx-auto my-10" />
          </div>
        </>
      )}
    </div>
  )
}

export default Hobbies
