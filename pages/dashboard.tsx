/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import ProjectStrip from '../src/components/project/ProjectStrip'
import { GET_PROJECTS_BY_USER_PROPOSALS } from '../src/gql/project'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function Dashboard({ proposals }) {
  return (
    <div style={{ marginLeft: '57px' }} className="px-4">
      <section>
        <h2 className="text-3xl my-6">As a freelancer:</h2>

        <div className="grid grid-cols-3">
          <div>
            <h3 className="text-xl">Proposals</h3>
            {proposals?.getProjectsByUserProposals.map((proposal, index) => (
              <ProjectStrip data={proposal} href={`/proposals/${proposals.getUserProposals[index]._id}`} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl">As a client:</h2>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    const { data } = await client.query({
      query: GET_PROJECTS_BY_USER_PROPOSALS,
    })

    const { getProjectsByUserProposals, getUserProposals } = data
    return {
      props: {
        proposals: { getProjectsByUserProposals, getUserProposals },
      },
    }
  },
})
