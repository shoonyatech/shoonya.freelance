/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Proposals from '../../../src/components/proposals/Proposals'
import { GET_PROPOSALS_BY_PROJECT } from '../../../src/gql/proposal'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ initialData }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals initialData={initialData} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { data } = await client.query({
      query: GET_PROPOSALS_BY_PROJECT,
      variables: { projectId: context.query.id },
      errorPolicy: 'ignore',
    })

    const { getProposalsByProject } = data

    return {
      props: {
        initialData: getProposalsByProject,
      },
    }
  },
})
