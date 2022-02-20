/* eslint-disable no-underscore-dangle */
import { getSession } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import Profile from '../../src/components/profile/Profile'
import { GET_USER } from '../../src/gql/user'
import { getUserId } from '../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

function UserPage({ data, isOwner }) {
  return (
    <div>
      <div className="max-w-5xl mx-auto w-full py-4">
        {isOwner ? null : (
          <Button color="primary" variant="contained">
            Message
          </Button>
        )}
      </div>

      <Profile data={data} isReadOnly />
    </div>
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  const userId = getUserId(session?.user.sub)
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
  const isOwner = data.user._id === userId
  return {
    props: {
      data: data.user,
      isOwner,
    },
  }
}
