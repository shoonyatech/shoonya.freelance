import { gql, useQuery } from '@apollo/client'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import React from 'react'

const GET_CURRENCIES = gql`
  {
    countries {
      name
      currency
    }
  }
`
const CurrencyAndRate = ({ handleOptionChange, state, parentkey }) => {
  const { error, loading, data } = useQuery(GET_CURRENCIES)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <div className="flex">
      <div>
        <Select
          value={state.budget.currency}
          onChange={(e) => handleOptionChange(parentkey, 'currency', e.target.value)}
          fullWidth
        >
          {data.countries.map((country) => (
            <MenuItem key={country.name} value={country.currency}>
              {country.currency}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleOptionChange(parentkey, 'amount', e.target.value)}
        value={state.budget.amount}
      />
    </div>
  )
}

export default CurrencyAndRate
