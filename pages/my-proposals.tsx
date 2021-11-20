import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import Proposals from '../src/components/proposals/Proposals'
import { GET_USER_PROPOSALS } from '../src/gql/proposal'
import { getUserId } from '../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ data }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)

    const { data } = await client.query({
      query: GET_USER_PROPOSALS,
      variables: { proposser: userId },
      errorPolicy: 'ignore',
    })

    const { getProposalsByUser } = data

    return {
      props: {
        data: getProposalsByUser,
      },
    }
  },
})
