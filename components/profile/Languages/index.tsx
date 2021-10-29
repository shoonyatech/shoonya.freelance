/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      languages
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserLanguages($_id: ID!, $languages: [String]) {
    updateUserLanguages(_id: $_id, languages: $languages) {
      languages
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

const Language = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const classes = useStyles()
  const [popUp, setPopup] = useState({ show: false, index: null })
  const { user } = useUser()
  const userId = user?.sub?.split('|')[1]
  const { loading, data } = useQuery(GET_USER, {
    variables: { _id: userId },
  })
  const [updateUserLanguage, { error }] = useMutation(UPDATE_USER)

  const [languages, setLanguages] = useState<string[]>([])

  useEffect(() => {
    if (data?.user?.languages && data?.user?.languages.length !== 0) {
      setLanguages(data.user.languages)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <Loader open={loading} error={error} />

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setLanguages([...languages.slice(0, index), evt.target.value, ...languages.slice(index + 1)])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserLanguage({
      variables: { _id: userId, languages },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    setEdit(false)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.languages) {
      setLanguages(data.user.languages)
    } else setLanguages([])
    setEdit(false)
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
      variables: { _id: userId, languages: filterDeletedItem },
      refetchQueries: [{ query: GET_USER, variables: { _id: userId } }],
    })
    closePopUp()
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Languages</h3>
        {!edit ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
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

          <Button className={classes.btn} onClick={() => addLanguage()}>
            Add Language
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
        <div className="uppercase">{data.user.languages.join(' | ')}</div>
      )}
    </div>
  )
}

export default Language
