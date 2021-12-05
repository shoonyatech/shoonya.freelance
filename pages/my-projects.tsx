/* eslint-disable no-underscore-dangle */
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import GetApolloClient from '../apis/apollo.client'
import MyProjectsWrapper from '../src/components/my-projects/MyProjectsWrapper'
import { GET_USER_PROJECTS } from '../src/gql/project'
import { Project } from '../src/interfaces/project'
import { getUserId } from '../src/lib/user-helper'
import { isArrayEmpty } from '../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProjects({
  initialData,
  initialUserHasNoProjects,
}: {
  initialData: Project[]
  initialUserHasNoProjects: boolean
}) {
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
    <div style={{ marginLeft: '57px' }}>
      <MyProjectsWrapper
        data={data}
        refreshData={refreshData}
        isRefreshing={isRefreshing}
        initialUserHasNoProjects={initialUserHasNoProjects}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)

    const { data } = await client.query({
      query: GET_USER_PROJECTS,
      variables: { _id: userId },
      errorPolicy: 'ignore',
      fetchPolicy: 'no-cache',
    })

    const { getUserProjects } = data
    if (isArrayEmpty(getUserProjects)) {
      return {
        props: {
          initialUserHasNoProjects: true,
        },
      }
    }
    return {
      props: {
        initialData: getUserProjects,
      },
    }
  },
})
