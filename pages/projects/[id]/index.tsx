/* eslint-disable no-underscore-dangle */
import { getSession } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import SliderContainer from '../../../src/components/common/Slider'
import SeeProposals from '../../../src/components/project/actionBtns/SeeProposals'
// import SeeProposals from '../../../src/components/project/actionBtns/SeeProposals'
import ProjectProposal from '../../../src/components/project/apply/ProjectProposal'
import ProjectFullDescription from '../../../src/components/projects/ProjectFullDescription'
import { GET_PROJECT } from '../../../src/gql/project'
import { Project as ProjectProps } from '../../../src/interfaces/project'
import { getUserId } from '../../../src/lib/user-helper'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      marginBottom: '1em',
    },
  })
)

const Project = ({ data, isOwner }: { data: ProjectProps; isOwner: boolean }) => {
  const classes = useStyles()
  const [slider, setSlider] = useState(false)
  const closeSlider = () => {
    setSlider(false)
  }
  return (
    <div style={{ marginLeft: '57px' }}>
      <div className="my-4 px-6 py-2">
        {isOwner ? (
          // todo : add margin bottom on see proposals btn
          <SeeProposals projectId={data._id} />
        ) : (
          <Button className={classes.btn} variant="contained" color="primary">
            Apply
          </Button>
        )}

        <ProjectFullDescription data={data} />
      </div>
      {slider ? (
        <SliderContainer closeSlider={closeSlider} openOrCloseSlider={slider}>
          <ProjectProposal
            closeSlider={closeSlider}
            projectId={data._id}
            projectTitle={data.title}
            currency={data.budget.currency}
          />
        </SliderContainer>
      ) : null}
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
