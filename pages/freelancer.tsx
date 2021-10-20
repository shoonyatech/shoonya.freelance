import { gql, useQuery } from '@apollo/client'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import React, { useState } from 'react'

import MasterDetailsLayout from '../components/common/MasterDetailsLayout'
import FreelancerCard from '../components/profile/FreelancerCard'
import Profile from '../components/profile/Profile'
import ClientSideRendering from '../lib/client-side-rendering'

const GET_FREELANCERS = gql`
  {
    freelancers {
      name
      title
      picture
    }
  }
`

export default function Freelancer() {
  const { user } = useUser()
  const userId = user?.sub?.split('|')[1]
  const { error, loading, data } = useQuery(GET_FREELANCERS, {
    variables: { _id: userId },
  })
  const [display] = useState(true)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  return (
    <div>
      <ClientSideRendering>
        <MasterDetailsLayout>
          <FreelancerCard data={data} />
          <Profile data={data} display={display} userId={userId} />
        </MasterDetailsLayout>
      </ClientSideRendering>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
