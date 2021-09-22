/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const GET_USER = gql`
  {
    user(_id: "613890d00e9d3a2bfc8dd2f7") {
      language
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserLanguage($_id: ID!, $language: [String]) {
    updateUserLanguage(_id: $_id, language: $language) {
      language
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

const Languages = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const classes = useStyles()
  const { loading, data } = useQuery(GET_USER)
  const [updateUserLanguage, { error }] = useMutation(UPDATE_USER)

  const [language, setLanguage] = useState<string[]>([])

  useEffect(() => {
    if (data?.user?.language) {
      setLanguage(data.user.language)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setLanguage([...language.slice(0, index), evt.target.value, ...language.slice(index + 1)])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserLanguage({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', language },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.language) {
      setLanguage(data.user.language)
      setEdit(false)
    } else setLanguage([])
  }

  const addLanguage = () => {
    setLanguage([...language, ''])
  }
  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Language</h3>
        {!edit ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {language.map((lang, i): any => (
            <div key={i}>
              <TextField
                name="name"
                label="Language"
                onChange={handleChange(i)}
                value={lang}
                color="primary"
                margin="dense"
                variant="outlined"
                required
              />
            </div>
          ))}
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
        <div className="uppercase">{data.user.language.join(' | ')}</div>
      )}
    </div>
  )
}

export default Languages
