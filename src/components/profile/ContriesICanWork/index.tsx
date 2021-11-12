import { useMutation } from '@apollo/client'
import { InputLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import React, { FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_USER_COUNTRIESICANWORK } from '../../../gql/user'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'

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

const CountriesICanWork = ({ data, countries }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useContext(UserIsReadOnlyContext)
  const [countriesICanWork, setCountriesICanWork] = useState<any[]>(data)
  const [updatedCountriesICanWork, setupdatedCountriesICanWork] = useState(null)

  const [updateUserCountriesICanWork, { loading, error }] = useMutation(UPDATE_USER_COUNTRIESICANWORK, {
    onCompleted(val) {
      const newCountriesICanWork = val.updateUserCountriesICanWork.countriesICanWork
      setCountriesICanWork(newCountriesICanWork)
      setupdatedCountriesICanWork(newCountriesICanWork)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserCountriesICanWork({
      variables: { countriesICanWork },
    })
    setEdit(!edit)
  }

  const cancelUpdateUser = () => {
    const revertUserCountriesICanWork = updatedCountriesICanWork || data
    setCountriesICanWork(revertUserCountriesICanWork)
    setEdit(false)
  }

  const handleChange = (index: number) => (evt: any) => {
    setCountriesICanWork([
      ...countriesICanWork.slice(0, index),
      evt.target.value,
      ...countriesICanWork.slice(index + 1),
    ])
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
      variables: { countriesICanWork: filterDeletedItem },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Countries I Can Work</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
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
                    {countries.map((country) => (
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
            {countriesICanWork.map((country): any => (
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
