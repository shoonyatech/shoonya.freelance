/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { gql } from '@apollo/client'
import Link from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'

import GetApolloClient from '../../apis/apollo.client'
import Projects from '../../components/projects/Projects'

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
const client = GetApolloClient('http://localhost:4000/graphql')

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

export default function ProjectsPage({ data }) {
  return (
    <div style={{ marginLeft: '57px' }}>
      <Link href="/projects/new">
        <a>New Project</a>
      </Link>
      <Projects data={data} />
    </div>
  )
}
