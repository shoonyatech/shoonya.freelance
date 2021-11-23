/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_HOBBIES } from '../../../gql/user'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

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

const Hobbies = ({ data }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [hobbies, setHobbies] = useState<any>(data)
  const [updatedHobbies, setUpdatedHobbies] = useState(null)

  const [updateUserHobbies, { loading, error }] = useMutation(UPDATE_USER_HOBBIES, {
    onCompleted(val) {
      const newUserHobbies = val.updateUserHobbies.hobbies
      setHobbies(newUserHobbies)
      setUpdatedHobbies(newUserHobbies)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserHobbies({
      variables: { hobbies },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserHobbies = updatedHobbies || data
    setHobbies(revertUserHobbies)
    setEdit(false)
  }

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setHobbies([...hobbies.slice(0, index), evt.target.value, ...hobbies.slice(index + 1)])
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
      variables: { hobbies: filterDeletedItem },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Hobbies</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {hobbies
            ? hobbies?.map((hobby, i): any => (
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
            {hobbies?.map((hobby) => (
              <div key={hobby} className="uppercase">
                {hobby}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Hobbies
