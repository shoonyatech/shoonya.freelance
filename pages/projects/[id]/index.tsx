/* eslint-disable no-underscore-dangle */
import { getSession } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import ManageProjectWrapper from '../../../src/components/manageProject/ManageProjectWrapper'
import SeeProposals from '../../../src/components/project/actionBtns/SeeProposals'
import { GET_PROJECT } from '../../../src/gql/project'
import { Project as ProjectProps } from '../../../src/interfaces/project'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

const Project = ({ data, isOwner }: { data: ProjectProps; isOwner: boolean }) => {
  const [slider, setSlider] = useState(false)
  const closeSlider = () => {
    setSlider(false)
  }

  return (
    <div>
      <div className="flex justify-end py-2">
        {isOwner ? (
          <SeeProposals projectId={data._id} />
        ) : (
          <Button onClick={() => setSlider(true)} variant="contained" color="primary">
            Send Proposal
          </Button>
        )}
      </div>
      <ManageProjectWrapper data={data} isOwner={isOwner} slider={slider} closeSlider={closeSlider} />
    </div>
  )
}
export default Project

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res)
  const userId = getUserId(session?.user.sub)

  const { data } = await client.query({
    query: GET_PROJECT,
    variables: { _id: context.query.id },
    errorPolicy: 'ignore',
  })
  const { project } = data

  if (!project) {
    return {
      notFound: true,
    }
  }
  const isOwner = project.owner === userId
  return {
    props: {
      data: project,
      isOwner,
    },
  }
}