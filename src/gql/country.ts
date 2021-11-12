import { gql } from '@apollo/client'

const GET_CURRENCIES = gql`
  {
    countries {
      name
      currency
    }
  }
`

export default GET_CURRENCIES
