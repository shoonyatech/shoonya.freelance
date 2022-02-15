/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import ProjectStrip from '../src/components/project/ProjectStrip'
import { GET_PROJECTS_BY_USER_PROPOSALS } from '../src/gql/project'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function Dashboard({ proposals, activeProjects }) {
  return (
    <div style={{ marginLeft: '57px' }} className="px-4">
      <section>
        <h2 className="text-3xl my-6">As a freelancer:</h2>

        <div className="grid grid-cols-3 gap-x-4">
          {activeProjects.length ? (
            <div>
              <h3 className="text-xl">Active Projects</h3>
              {activeProjects.map((activeProject) => (
                <ProjectStrip key={activeProject._id} data={activeProject} href={`/projects/${activeProject._id}`} />
              ))}
            </div>
          ) : null}
          {proposals?.getProjectsByUserProposals ? (
            <div>
              <h3 className="text-xl">Proposals</h3>
              {proposals.getProjectsByUserProposals.map((proposal, index) => (
                <ProjectStrip
                  key={proposal._id}
                  data={proposal}
                  href={`/proposals/${proposals.getUserProposals[index]._id}`}
                />
              ))}
            </div>
          ) : null}
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

    const { getProjectsByUserProposals, getUserProposals, getUserActiveProjects } = data
    return {
      props: {
        activeProjects: getUserActiveProjects,
        proposals: { getProjectsByUserProposals, getUserProposals },
      },
    }
  },
})
