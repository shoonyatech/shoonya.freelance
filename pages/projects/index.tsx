/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import ProjectsPageWrapper from '../../src/components/projects/ProjectsPageWrapper'
import { GET_PROJECTS } from '../../src/gql/project'
import { Project } from '../../src/interfaces/project'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function ProjectsPage({ data }: { data: Project[] }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <ProjectsPageWrapper data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_PROJECTS,
    errorPolicy: 'ignore',
  })

  return {
    props: {
      data: data.projects,
    },
  }
}
