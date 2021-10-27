import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../apis/apollo.client'
import ManageProject from '../../components/manageProject/ManageProject'

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
const client = GetApolloClient('http://localhost:4000/graphql')

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

const Project = ({ data }) => (
  <div>
    <ManageProject data={data} />
  </div>
)
export default Project
