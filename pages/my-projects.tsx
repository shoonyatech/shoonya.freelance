/* eslint-disable no-underscore-dangle */
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

import GetApolloClient from '../apis/apollo.client'
import SeeProposals from '../src/components/project/actionBtns/SeeProposals'
import ProjectsPageWrapper from '../src/components/projects/ProjectsPageWrapper'
import { GET_PROJECTS } from '../src/gql/project'
import { Project } from '../src/interfaces/project'
import { getUserId } from '../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function MyProjects({ data }: { data: Project[] }) {
  const [activeProjectId, setActiveProjectId] = useState<string>(data[0]?._id)

  const updateActiveProjectId = (newId) => setActiveProjectId(newId)

  return (
    <div style={{ marginLeft: '57px' }}>
      <div className="flex justify-end py-2">
        <SeeProposals projectId={activeProjectId} />
      </div>
      <ProjectsPageWrapper
        data={data}
        activeProjectId={activeProjectId}
        updateActiveProjectId={updateActiveProjectId}
      />
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
