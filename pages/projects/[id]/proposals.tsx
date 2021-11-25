/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Loader from '../../../src/components/common/Loader'
import Proposals from '../../../src/components/proposals/Proposals'
import { GET_USER_PROPOSALS_AND_PROJECT_OWNER } from '../../../src/gql/proposal'
import { GET_FREELANCER_CARDS, GET_USER } from '../../../src/gql/user'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ data, freelancers }) {
  const {
    error,
    loading,
    data: d,
    refetch,
  } = useQuery(GET_USER, {
    variables: {
      _id: freelancers[0]._id,
    },
  })

  const updateActiveProject = (newId) => {
    refetch({
      _id: freelancers[newId]._id,
    })
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals
        data={data}
        freelancers={freelancers}
        activeFreelancer={d?.user}
        updateActiveProject={updateActiveProject}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)
    const { data } = await client.query({
      query: GET_USER_PROPOSALS_AND_PROJECT_OWNER,
      variables: { projectId: context.query.id },
      errorPolicy: 'ignore',
    })

    // temporary show 404 if user is not the owner of this project
    if (data.project.owner !== userId) {
      return {
        notFound: true,
      }
    }
    const { getProposals } = data
    const propossers = getProposals.map((proposal) => proposal.proposser)

    const { data: d } = await client.query({
      query: GET_FREELANCER_CARDS,
      variables: { _id: propossers },
      errorPolicy: 'ignore',
    })
    const { freelancers } = d
    return {
      props: {
        data: getProposals,
        freelancers,
      },
    }
  },
})
