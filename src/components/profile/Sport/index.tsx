/* eslint-disable react/no-array-index-key */
import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { UPDATE_USER_SPORTS } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

const Sport = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useIsReadOnlyContext()

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
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
      <div className="flex justify-between pb-3 items-start">
        <h3 className="text-xl uppercase md:text-2xl">Sports</h3>
        {!edit && !isReadOnly ? (
          <IconButton aria-label="edit sports" onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
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
                  label="sport"
                  value={sport}
                  openPopup={openPopup}
                />
              ))
            : null}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button sx={{ alignSelf: 'flex-end', borderRadius: '999px' }} onClick={() => addSport()}>
            Add Sport
          </Button>

          <div className="self-end pt-1">
            <Button sx={{ marginRight: '0.5rem' }} type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              sx={{ marginRight: '0.5rem' }}
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
