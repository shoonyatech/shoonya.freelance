import { gql, useQuery } from '@apollo/client'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
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

const Currency = () => {
  const { error, loading, data } = useQuery(GET_CURRENCIES)

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div>
      <div>
        <Select
          // value={state.budget.currency}
          // onChange={(e) => handleOptionChange(parentkey, 'currency', e.target.value)}
          fullWidth
        >
          {data.countries.map((country) => (
            <MenuItem key={country.name} value={country.currency}>
              {country.currency}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* <TextField
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => handleOptionChange(parentkey, 'amount', e.target.value)}
                value={state.budget.amount}
            /> */}
    </div>
  )
}

export default Currency
