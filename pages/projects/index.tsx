/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import Projects from '../../src/components/projects/Projects'
import { GET_PROJECTS } from '../../src/gql/project'
import { Project } from '../../src/interfaces/project'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function ProjectsPage({ data }: { data: Project[] }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <div className="flex justify-end p-2">
        <Link href="/projects/new" passHref>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Link>
      </div>
      <Projects data={data} />
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
