/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import React, { ChangeEvent, FormEvent, useState } from 'react'

import { UPDATE_USER_LANGUAGES } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

const Language = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useIsReadOnlyContext()

  const [languages, setLanguages] = useState<string[]>(data)
  const [updatedLanguages, setUpdatedLanguages] = useState(null)

  const [updateUserLanguage, { loading, error }] = useMutation(UPDATE_USER_LANGUAGES, {
    onCompleted(val) {
      const newUserLanguages = val.updateUserLanguages.languages
      setLanguages(newUserLanguages)
      setUpdatedLanguages(newUserLanguages)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserLanguage({
      variables: { languages },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserLanguages = updatedLanguages || data
    setLanguages(revertUserLanguages)
    setEdit(false)
  }

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setLanguages([...languages.slice(0, index), evt.target.value, ...languages.slice(index + 1)])
  }

  const addLanguage = () => {
    setLanguages([...languages, ''])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = languages.filter((_, index) => index !== popUp.index)

    await updateUserLanguage({
      variables: { languages: filterDeletedItem },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl uppercase md:text-2xl">Languages</h3>
        {!edit && !isReadOnly ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {languages.map((lang, i): any => (
            <TextFieldAndDeleteBtn
              key={i}
              handleChange={handleChange}
              index={i}
              label="language"
              value={lang}
              openPopup={openPopup}
            />
          ))}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}

          <Button
            sx={{
              alignSelf: 'flex-end',
              borderRadius: '999px',
            }}
            onClick={() => addLanguage()}
          >
            Add Language
          </Button>
          <div className="self-end pt-1">
            <Button
              sx={{
                marginRight: '.5rem',
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              sx={{
                marginRight: '.5rem',
              }}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="uppercase">{languages.join(' | ')}</div>
      )}
    </div>
  )
}

export default Language
