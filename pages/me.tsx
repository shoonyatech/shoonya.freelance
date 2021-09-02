import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

import Profile from '../components/profile/Profile'
import ClientSideRendering from '../lib/client-side-rendering'

export default function Me() {
  // const { user, isLoading, error } = useUser()

  return (
    <ClientSideRendering>
      <Profile />
    </ClientSideRendering>
  )
}

export const getServerSideProps = withPageAuthRequired()
