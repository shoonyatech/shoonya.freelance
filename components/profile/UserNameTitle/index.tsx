import { gql, useQuery } from '@apollo/client'
import React from 'react'

import Loader from '../../common/Loader'

const USER_NAME_TITLE = () => gql`
  query User {
    users {
      name
    }
  }
`

function UserNameTitle() {
  const { loading, error, data } = useQuery(USER_NAME_TITLE())

  if (loading || error)
    return (
      <div>
        <Loader open={loading} error={error} />
      </div>
    )

  return (
    <div>
      <div className="text-left">Name: {data.users[0].name}</div>
      <br />
    </div>
  )
}

export default UserNameTitle
