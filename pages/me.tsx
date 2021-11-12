import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import Profile from '../src/components/profile/Profile'
import { GET_USER_AND_COUNTRIES } from '../src/gql/user'
import { getUserId } from '../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function Me({ data, countries }) {
  return <Profile countries={countries} data={data} />
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)
    const { data } = await client.query({
      query: GET_USER_AND_COUNTRIES,
      variables: { _id: userId },
      errorPolicy: 'ignore',
    })
    return {
      props: {
        data: data.user,
        countries: data.countries,
      },
    }
  },
})
