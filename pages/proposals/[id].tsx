// import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import ProposalCard from '../../src/components/proposals/ProposalCard'
import { GET_PROPOSAL_BY_ID } from '../../src/gql/proposal'
// import { getUserId } from '../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

// eslint-disable-next-line arrow-body-style
const Proposal = ({ initialData }) => {
  return (
    <div style={{ marginLeft: '57px' }}>
      <ProposalCard data={initialData} />
    </div>
  )
}

export default Proposal

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = getSession(context.req, context.res)
  // const userId = getUserId(session?.user.sub)

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
