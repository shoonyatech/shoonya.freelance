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
      countriesICanWork
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserCountriesICanWork($_id: ID!, $countriesICanWork: String) {
    updateUserCountriesICanWork(_id: $_id, countriesICanWork: $countriesICanWork) {
      countriesICanWork
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

const CountriesICanWork = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const classes = useStyles()
  const { loading, data } = useQuery(GET_USER)
  const [updateUserCountriesICanWork, { error }] = useMutation(UPDATE_USER)

  const [countriesICanWork, setCountriesICanWork] = useState<String>('')

  useEffect(() => {
    if (data?.user?.countriesICanWork) {
      setCountriesICanWork(data.user.countriesICanWork)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCountriesICanWork(evt.target.value)
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserCountriesICanWork({
      variables: { _id: '613890d00e9d3a2bfc8dd2f7', countriesICanWork },
      refetchQueries: [{ query: GET_USER }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.countriesICanWork) {
      setCountriesICanWork(data.user.countriesICanWork)
      setEdit(false)
    } else setCountriesICanWork('')
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Countries I Can Work</h3>
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
            value={countriesICanWork}
            color="primary"
            margin="dense"
            variant="outlined"
            required
          />

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
            <div className="uppercase">{data.user.countriesICanWork} </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CountriesICanWork
