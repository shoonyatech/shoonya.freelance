/* eslint-disable jsx-a11y/anchor-is-valid */
import { gql } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import Projects from '../../components/projects/Projects'
import { Project } from '../../src/interfaces/project'

const GET_PROJECTS = gql`
  {
    projects {
      _id
      owner
      skills
      budget {
        type
        amount
      }
      title
      description
      scope {
        experience
        size
        size
      }
    }
  }
`
const client = GetApolloClient(process.env.GRAPHQL_SERVER)

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

export default function ProjectsPage({ data }: { data: Project[] }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <div className="flex justify-end p-2">
        <Link href="/projects/new" passHref>
          <Button variant="contained" color="primary">
            New Project
          </Button>
        </Link>
      </div>
      <Projects data={data} />
    </div>
  )
}
