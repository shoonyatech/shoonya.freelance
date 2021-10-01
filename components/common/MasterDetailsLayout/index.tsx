import { useQuery } from '@apollo/client'
import React from 'react'

import List from '../List'

const MasterDetailsLayout = ({ queryToFetchList }) => {
  const { error, loading, data } = useQuery(queryToFetchList)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-masterDetailsLayout">
      <List data={data.projects} />
      <div className="border-l-2 border-solid border-primary">next</div>
    </div>
  )
}

export default MasterDetailsLayout
