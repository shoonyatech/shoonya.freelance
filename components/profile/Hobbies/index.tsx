/* eslint-disable react/no-array-index-key */
import { gql, useMutation, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      hobbies
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserHobbies($_id: ID!, $hobbies: [String]) {
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
  const [popUp, setPopup] = useState({ show: false, index: null })
  const classes = useStyles()
  const { user } = useUser()
  const userId = user?.sub?.split('|')[1]
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserHobbies, { error }] = useMutation(UPDATE_USER)

  const [hobbies, setHobbies] = useState<String[]>([])

  useEffect(() => {
    if (data?.user?.hobbies) {
      setHobbies(data.user.hobbies)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setHobbies([...hobbies.slice(0, index), evt.target.value, ...hobbies.slice(index + 1)])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserHobbies({
      variables: { _id: userId, hobbies },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.hobbies) {
      setHobbies(data.user.hobbies)
    } else setHobbies([])
    setEdit(false)
  }

  const addHobby = () => {
    setHobbies([...hobbies, ''])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = hobbies.filter((_, index) => index !== popUp.index)
    await updateUserHobbies({
      variables: { _id: userId, hobbies: filterDeletedItem },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    closePopUp()
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Hobbies</h3>
        {!edit ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {hobbies
            ? hobbies.map((hobby, i): any => (
                <TextFieldAndDeleteBtn
                  key={i}
                  handleChange={handleChange}
                  index={i}
                  label="language"
                  value={hobby}
                  openPopup={openPopup}
                />
              ))
            : null}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button className={classes.btn} onClick={() => addHobby()}>
            Add Hobby
          </Button>

          <div className="pt-1 self-end">
            <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
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
            {data?.user?.hobbies
              ? data.user.hobbies.map((hobby) => (
                  <div key={hobby} className="uppercase">
                    {hobby}
                  </div>
                ))
              : null}
          </div>
        </>
      )}
    </div>
  )
}

export default Hobbies
