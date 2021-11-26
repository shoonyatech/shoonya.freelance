/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_SPORTS } from '../../../gql/user'
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

const Sport = ({ data }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [sports, setSports] = useState(data || [])
  const [updatedSports, setUpdatedSports] = useState(null)

  const [updateUserSports, { loading, error }] = useMutation(UPDATE_USER_SPORTS, {
    onCompleted(val) {
      const newUserSports = val.updateUserSports.sports
      setSports(newUserSports)
      setUpdatedSports(newUserSports)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserSports({
      variables: { sports },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserSports = updatedSports || data
    setSports(revertUserSports)
    setEdit(false)
  }

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setSports([...sports.slice(0, index), evt.target.value, ...sports.slice(index + 1)])
  }

  const addSport = () => {
    setSports([...sports, ''])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = sports.filter((_, index) => index !== popUp.index)
    await updateUserSports({
      variables: { sports: filterDeletedItem },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Sports</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {sports
            ? sports?.map((sport, i): any => (
                <TextFieldAndDeleteBtn
                  key={i}
                  handleChange={handleChange}
                  index={i}
                  label="language"
                  value={sport}
                  openPopup={openPopup}
                />
              ))
            : null}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button className={classes.btn} onClick={() => addSport()}>
            Add Sport
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
            {sports?.map((sport) => (
              <div key={sport} className="uppercase">
                {sport}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Sport
