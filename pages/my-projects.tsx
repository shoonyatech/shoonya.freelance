import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import ProjectsPageWrapper from '../src/components/projects/ProjectsPageWrapper'
import { GET_PROJECTS } from '../src/gql/project'
import { getUserId } from '../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProjects({ data }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <ProjectsPageWrapper data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)

    const { data } = await client.query({
      query: GET_PROJECTS,
      variables: { owner: userId },
      errorPolicy: 'ignore',
    })

    const { projects } = data

    if (!projects) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        data: projects,
      },
    }
  },
})
