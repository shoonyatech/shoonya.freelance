/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Loader from '../../../src/components/common/Loader'
import Proposals from '../../../src/components/proposals/Proposals'
import { GET_PROPOSALS_BY_PROJECT, GET_USER } from '../../../src/gql/user'
import { getUserId } from '../../../src/lib/user-helper'
import { isArrayEmpty } from '../../../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ data, isProposalsEmpty }) {
  const {
    error,
    loading,
    data: d,
    refetch,
  } = useQuery(GET_USER, {
    variables: {
      _id: data?.[0]?._id,
    },
    skip: isProposalsEmpty,
  })

  const updateActiveProject = (newId) => {
    refetch({
      _id: data[newId]._id,
    })
  }

  if (isProposalsEmpty) return <div> No one has send proposal to this project.</div>
  if (loading) return <Loader open={loading} error={error} />

  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals data={data} activeFreelancer={d?.user} updateActiveProject={updateActiveProject} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)
    const { data } = await client.query({
      query: GET_PROPOSALS_BY_PROJECT,
      variables: { _id: context.query.id },
      errorPolicy: 'ignore',
    })

    // temporary show 404 if user is not the owner of this project
    if (data.project.owner !== userId) {
      return {
        notFound: true,
      }
    }

    const { getProposalsByProject } = data
    if (isArrayEmpty(getProposalsByProject))
      return {
        props: {
          isProposalsEmpty: true,
        },
      }
    return {
      props: {
        data: getProposalsByProject,
      },
    }
  },
})
