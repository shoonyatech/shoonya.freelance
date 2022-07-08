import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { FormEvent, useState } from 'react'

import { UPDATE_USER_COUNTRIESICANWORK } from '../../../gql/user'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'

const CountriesICanWork = ({ data, countries }) => {
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useIsReadOnlyContext()
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
    <div className="flex flex-col justify-center p-4 bg-resume md:p-6">
      <div className="flex justify-between pb-3 items-start">
        <h3 className="text-xl uppercase md:text-2xl">Countries I Can Work</h3>
        {!edit && !isReadOnly ? (
          <IconButton aria-label="edit countries I can work" onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
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
                <IconButton
                  onClick={() => openPopup(i)}
                  sx={{
                    alignSelf: 'flex-end',
                    borderRadius: '999px',
                  }}
                  size="large"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </>
          ))}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}
          <Button
            sx={{
              alignSelf: 'flex-end',
              borderRadius: '999px',
            }}
            onClick={() => addCountry()}
          >
            Add Country
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
