/* eslint-disable no-underscore-dangle */
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import React from 'react'

import GetApolloClient from '../apis/apollo.client'
import ProjectStrip from '../src/components/project/ProjectStrip'
import { GET_PROJECTS_BY_USER_PROPOSALS } from '../src/gql/project'
import { isArrayEmpty } from '../src/lib/utils'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function Dashboard({ proposals, currentProjects, activeProjects }) {
  return (
    <>
      <section>
        <h2 className="text-3xl my-4">As a freelancer:</h2>

        <div className="grid grid-cols-3 gap-x-4">
          <div>
            <h3 className="text-xl">Active Projects</h3>
            {!isArrayEmpty(activeProjects) ? (
              activeProjects.map((activeProject) => (
                <ProjectStrip data={activeProject} href={`/projects/${activeProject._id}`} />
              ))
            ) : (
              <p>You do not have active Projects</p>
            )}
          </div>

          <div>
            <h3 className="text-xl">Proposals</h3>
            {!isArrayEmpty(proposals?.getProjectsByUserProposals) ? (
              proposals.getProjectsByUserProposals.map((proposal, index) => (
                <ProjectStrip
                  key={proposal._id}
                  data={proposal}
                  href={`/proposals/${proposals.getUserProposals[index]._id}`}
                />
              ))
            ) : (
              <p>You do not have any proposals</p>
            )}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl my-6">As a client:</h2>
        <div className="grid grid-cols-3 gap-x-4">
          <div>
            <h3 className="text-xl">Current Projects</h3>
            {!isArrayEmpty(currentProjects) ? (
              currentProjects.map((activeProject) => (
                <ProjectStrip key={activeProject._id} data={activeProject} href={`/projects/${activeProject._id}`} />
              ))
            ) : (
              <p>You do not have Current Project</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    const { data } = await client.query({
      query: GET_PROJECTS_BY_USER_PROPOSALS,
    })

    const { getProjectsByUserProposals, getUserProposals, getUserCurrentProjects, getUserActiveProjects } = data
    return {
      props: {
        currentProjects: getUserCurrentProjects,
        activeProjects: getUserActiveProjects,
        proposals: { getProjectsByUserProposals, getUserProposals },
      },
    }
  },
})
