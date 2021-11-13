import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import ManageProject from '../../../src/components/manageProject/ManageProject'
import { GET_PROJECT } from '../../../src/gql/project'
import { Project as ProjectProps } from '../../../src/interfaces/project'

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
