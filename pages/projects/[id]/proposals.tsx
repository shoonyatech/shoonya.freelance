/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Proposals from '../../../src/components/proposals/Proposals'
import { GET_PROPOSALS_BY_PROJECT } from '../../../src/gql/user'
import { isArrayEmpty } from '../../../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ initialData, initialProposals, initialIsProposalsEmpty }) {
  const [data, setData] = useState(initialData)
  const [proposals, setProposals] = useState(initialProposals)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setData(initialData)
    setProposals(initialProposals)
    setIsRefreshing(false)
  }, [initialData, initialProposals])

  // console.log(d)
  return (
    <div style={{ marginLeft: '57px' }}>
      <Proposals
        data={data}
        proposals={proposals}
        isRefreshing={isRefreshing}
        initialIsProposalsEmpty={initialIsProposalsEmpty}
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
    if (isArrayEmpty(getProposalsByProject))
      return {
        props: {
          initialIsProposalsEmpty: true,
        },
      }
    return {
      props: {
        initialData: getProposalsByProject,
        initialProposals: getProposalsByProject2,
      },
    }
  },
})
