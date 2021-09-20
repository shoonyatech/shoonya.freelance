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
      language
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserLanguage($_id: ID!, $language: String) {
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

  const [language, setLanguage] = useState<String>('')

  useEffect(() => {
    if (data?.user?.language) {
      setLanguage(data.user.language)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLanguage(evt.target.value)
  }

  const updateUser = async () => {
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
    } else setLanguage('')
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      {edit ? (
        <div>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            value={language}
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
        </div>
      ) : (
        <>
          <div className="flex flex-col whitespace-nowrap">
            <button className="self-start" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </button>
            <div className="font-bold uppercase">Language</div>
            <div className="uppercase">{data.user.language} </div>
            <hr className="h-px border-0 bg-black w-4/5 mx-auto my-10" />
          </div>
        </>
      )}
    </div>
  )
}

export default Languages
