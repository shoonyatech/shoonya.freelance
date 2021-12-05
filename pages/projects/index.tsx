/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

import GetApolloClient from '../../apis/apollo.client'
import ProjectsPageWrapper from '../../src/components/projects/ProjectsPageWrapper'
import { FILTER_OWNER_PROJECTS } from '../../src/gql/project'
import { Project } from '../../src/interfaces/project'
import { getUserId } from '../../src/lib/user-helper'
import { isArrayEmpty } from '../../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function ProjectsPage({ data, noProjects }: { data: Project[]; noProjects: boolean }) {
  const [activeProjectId, setActiveProjectId] = useState<string>(data?.[0]?._id)

  const updateActiveProjectId = (newId) => setActiveProjectId(newId)

  if (noProjects)
    return <div style={{ marginLeft: '57px' }}>Nothing to show , come back when there are active projects!</div>
  return (
    <div style={{ marginLeft: '57px' }}>
      <ProjectsPageWrapper
        data={data}
        activeProjectId={activeProjectId}
        updateActiveProjectId={updateActiveProjectId}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  const userId = getUserId(session?.user?.sub)
  const { data } = await client.query({
    query: FILTER_OWNER_PROJECTS,
    variables: { owner: userId },
    errorPolicy: 'ignore',
  })
  if (isArrayEmpty(data.filterOwnerProjects))
    return {
      props: {
        noProjects: true,
      },
    }
  return {
    props: {
      data: data.filterOwnerProjects,
    },
  }
}
