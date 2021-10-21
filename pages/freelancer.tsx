/* eslint-disable react/button-has-type */
import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React, { useEffect, useState } from 'react'

import MasterDetailsLayout from '../components/common/MasterDetailsLayout'
import FreelancerCard from '../components/profile/FreelancerCard/index'
import Profile from '../components/profile/Profile'
import ClientSideRendering from '../lib/client-side-rendering'

const GET_FREELANCERS = gql`
  {
    freelancers {
      name
    }
  }
`

export default function Freelancer() {
  const [userId, setUserId] = useState()
  const { error, loading, data } = useQuery(GET_FREELANCERS, {
    variables: { _id: userId },
  })
  const isReadOnly = true

  useEffect(() => {
    if (data) setUserId(data?.freelancers)
  }, [data])

  function handleClick(Id) {
    setUserId(Id)
  }
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  return (
    <div>
      <ClientSideRendering>
        <MasterDetailsLayout>
          <FreelancerCard handleClick={handleClick} data={data} />
          <Profile isReadOnly={isReadOnly} userId={userId} />
        </MasterDetailsLayout>
      </ClientSideRendering>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
