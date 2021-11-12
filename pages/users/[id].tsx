import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import Profile from '../../src/components/profile/Profile'
import { GET_USER } from '../../src/gql/user'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

function UserPage({ data, countries }) {
  return <Profile countries={countries} data={data} isReadOnly />
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_USER,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })

  if (!data.user) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data: data.user,
    },
  }
}
