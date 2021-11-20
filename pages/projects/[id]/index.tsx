import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import ManageProjectWrapper from '../../../src/components/manageProject/ManageProjectWrapper'
import { GET_PROJECT } from '../../../src/gql/project'
import { Project as ProjectProps } from '../../../src/interfaces/project'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

const Project = ({ data, isOwner }: { data: ProjectProps; isOwner: boolean }) => (
  <div>
    <ManageProjectWrapper data={data} isOwner={isOwner} />
  </div>
)
export default Project

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  const userId = getUserId(session?.user.sub)

  const { data } = await client.query({
    query: GET_PROJECT,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })
  const { project } = data

  if (!project) {
    return {
      notFound: true,
    }
  }
  const isOwner = project.owner === userId

  return {
    props: {
      data: project,
      isOwner,
    },
  }
}
