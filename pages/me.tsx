import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

import BaseLayout from '../components/common/BaseLayout'
import UserNameTitle from '../components/profile/UserNameTitle'
import ClientSideRendering from '../lib/client-side-rendering'

export default function Me() {
  // const { user, isLoading, error } = useUser()

  return (
    <ClientSideRendering>
      <UserNameTitle />
    </ClientSideRendering>
  )
}

Me.Layout = BaseLayout
export const getServerSideProps = withPageAuthRequired()
