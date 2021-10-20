import { gql, useMutation, useQuery } from '@apollo/client'
import { InputLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { FormEvent, useEffect, useState } from 'react'

import DeleteAlert from '../DeleteAlert'

const GET_USER_AND_COUNTRY = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      countriesICanWork
    }
    countries {
      name
    }
  }
`
const UPDATE_USER = gql`
  mutation UpdateUserCountriesICanWork($_id: ID!, $countriesICanWork: [String]) {
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

const CountriesICanWork = ({ display, userId }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const classes = useStyles()
  const { loading, data } = useQuery(GET_USER_AND_COUNTRY, {
    variables: { _id: userId },
  })
  const [updateUserCountriesICanWork, { error }] = useMutation(UPDATE_USER)

  const [countriesICanWork, setCountriesICanWork] = useState<any[]>([])

  useEffect(() => {
    if (data?.user?.countriesICanWork && data?.user?.countriesICanWork.length !== 0) {
      setCountriesICanWork(data.user.countriesICanWork)
      setEdit(false)
    } else setEdit(true)
  }, [data])

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>

  const handleChange = (index: number) => (evt: any) => {
    setCountriesICanWork([
      ...countriesICanWork.slice(0, index),
      evt.target.value,
      ...countriesICanWork.slice(index + 1),
    ])
  }

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserCountriesICanWork({
      variables: { _id: userId, countriesICanWork },
      refetchQueries: [{ query: GET_USER_AND_COUNTRY, variables: { _id: userId } }],
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    if (data?.user?.countriesICanWork) {
      setCountriesICanWork(data.user.countriesICanWork)
    } else setCountriesICanWork([])
    setEdit(false)
  }

  const addCountry = () => {
    setCountriesICanWork([...countriesICanWork, ''])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }
  const handleDelete = async () => {
    const filterDeletedItem = countriesICanWork.filter((_, index) => index !== popUp.index)
    await updateUserCountriesICanWork({
      variables: { _id: userId, countriesICanWork: filterDeletedItem },
      refetchQueries: [{ query: GET_USER_AND_COUNTRY, variables: { _id: userId } }],
    })
    closePopUp()
  }

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Countries I Can Work</h3>
        {!edit || display ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit || display ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {countriesICanWork.map((countryName, i): any => (
            <>
              <div className="flex">
                <div className="flex-1">
                  <InputLabel key={countryName} id="demo-simple-select-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={countryName}
                    onChange={handleChange(i)}
                    fullWidth
                  >
                    {data.countries.map((country) => (
                      <MenuItem key={country.name} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <IconButton onClick={() => openPopup(i)} className={classes.btn}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </>
          ))}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button className={classes.btn} onClick={() => addCountry()}>
            Add Country
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
          <div className="flex flex-col">
            {data.user.countriesICanWork.map((country): any => (
              <div key={country}>
                <div className="uppercase">{country} </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CountriesICanWork
