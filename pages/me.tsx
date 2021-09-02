import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

export default function Me() {
  // const { user, isLoading, error } = useUser()

  return <div>check</div>
}

export const getServerSideProps = withPageAuthRequired()
