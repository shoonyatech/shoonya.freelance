import { gql, useQuery } from '@apollo/client'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'

import Loader from '../Loader'

const GET_CURRENCIES = gql`
  {
    countries {
      name
      currency
    }
  }
`

const Currency = ({ currency, handleChange }) => {
  const { error, loading, data } = useQuery(GET_CURRENCIES)

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div>
      <Select value={currency} name="currency" onChange={handleChange} fullWidth>
        {data.countries.map((country) => (
          <MenuItem key={country.name} value={country.currency}>
            {country.currency}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default Currency
