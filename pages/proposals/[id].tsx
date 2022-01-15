import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import UserProposal from '../../src/components/proposals/UserProposal'
import { GET_PROPOSAL_BY_ID } from '../../src/gql/proposal'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

// eslint-disable-next-line arrow-body-style
const ProposalPage = ({ initialData }) => {
  return (
    <div style={{ marginLeft: '57px' }}>
      <UserProposal initialData={initialData} />
    </div>
  )
}

export default ProposalPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_PROPOSAL_BY_ID,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })

  const { getProposalsById } = data
  if (!getProposalsById)
    return {
      notFound: true,
    }
  return {
    props: {
      initialData: getProposalsById,
    },
  }
}
