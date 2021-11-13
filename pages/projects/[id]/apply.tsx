import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Apply from '../../../src/components/project/apply/Apply'
import { GET_PROJECT } from '../../../src/gql/project'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

function ApplyForProject({ data }) {
  return <Apply data={data} />
}

export default ApplyForProject

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const userId = getUserId(session?.user.sub)

    const { data } = await client.query({
      query: GET_PROJECT,
      variables: { _id: context.query.id },
      errorPolicy: 'ignore',
    })

    const { project } = data
    // temporarily show 404 if owner himself tries to apply for the project
    if (!project || userId === project.owner) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        data: data.project,
      },
    }
  },
})
