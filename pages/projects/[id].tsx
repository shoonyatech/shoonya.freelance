import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import ManageProject from '../../components/manageProject/ManageProject'
import { Project as ProjectProps } from '../../src/interfaces/project'

const GET_PROJECT = gql`
  query Project($_id: ID!) {
    project(_id: $_id) {
      _id
      owner
      title
      description
      skills
      scope {
        size
        duration
        experience
      }
      budget {
        type
        currency
        amount
      }
      isPublished
    }
  }
`
const client = GetApolloClient(process.env.GRAPHQL_SERVER)

const Project = ({ data }: { data: ProjectProps }) => (
  <div>
    <ManageProject data={data} />
  </div>
)
export default Project

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: GET_PROJECT,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })

  if (!data.project) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data: data.project,
    },
  }
}
