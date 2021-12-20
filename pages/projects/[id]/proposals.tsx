/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Proposals from '../../../src/components/proposals/Proposals'
import { GET_PROPOSALS_BY_PROJECT } from '../../../src/gql/user'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ initialData, initialProposals }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals
        data={initialData}
        proposals={initialProposals}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { data } = await client.query({
      query: GET_PROPOSALS_BY_PROJECT,
      variables: { _id: context.query.id },
      errorPolicy: 'ignore',
    })

    const { getProposalsByProject, getProposalsByProject2 } = data

    return {
      props: {
        initialData: getProposalsByProject,
        initialProposals: getProposalsByProject2,
      },
    }
  },
})
