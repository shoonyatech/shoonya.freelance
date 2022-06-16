import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import GetApolloClient from '../apis/apollo.client'
import MyProposals from '../src/components/proposals/MyProposals'
import { GET_USER_PROPOSALS } from '../src/gql/proposal'
import { getUserId } from '../src/lib/user-helper'
import { isArrayEmpty } from '../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProposal({ initialData, initialIsUserHasNoProposals }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const refreshData = () => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }

  useEffect(() => {
    setData(initialData)
    setIsRefreshing(false)
  }, [initialData])

  return (
    <div>
      <MyProposals
        data={data}
        refreshData={refreshData}
        isRefreshing={isRefreshing}
        initialIsUserHasNoProposals={initialIsUserHasNoProposals}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)

    const { data } = await client.query({
      query: GET_USER_PROPOSALS,
      variables: { _id: userId },
      errorPolicy: 'ignore',
      fetchPolicy: 'no-cache',
    })

    const { getUserProposals } = data
    if (isArrayEmpty(getUserProposals))
      return {
        props: {
          initialIsUserHasNoProposals: true,
        },
      }
    return {
      props: {
        initialData: getUserProposals,
      },
    }
  },
})
