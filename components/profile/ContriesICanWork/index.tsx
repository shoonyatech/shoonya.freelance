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

  const updateUser = async () => {
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
      {edit ? (
        <div>
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
            <div className="font-bold uppercase">Countries I Can Work</div>
            <div className="uppercase">{data.user.countriesICanWork} </div>
            <hr className="h-px border-0 bg-black w-4/5 mx-auto my-10" />
          </div>
        </>
      )}
    </div>
  )
}

export default CountriesICanWork
