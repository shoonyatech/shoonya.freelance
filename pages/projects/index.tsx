/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@material-ui/core/Button'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

import GetApolloClient from '../../apis/apollo.client'
import SliderContainer from '../../src/components/common/Slider'
import ProjectProposal from '../../src/components/project/apply/ProjectProposal'
import ProjectsPageWrapper from '../../src/components/projects/ProjectsPageWrapper'
import { GET_PROJECTS } from '../../src/gql/project'
import { Project } from '../../src/interfaces/project'

const client = GetApolloClient(process.env.GRAPHQL_SERVER)

export default function ProjectsPage({ data }: { data: Project[] }) {
  const [slider, setSlider] = useState(false)
  const closeSlider = () => {
    setSlider(false)
  }
  const [activeProjectId, setActiveProjectId] = useState<string>(data[0]?._id)

  const updateActiveProjectId = (newId) => setActiveProjectId(newId)

  return (
    <div style={{ marginLeft: '57px' }}>
      <div className="flex justify-end py-2">
        <Button onClick={() => setSlider(true)} variant="contained" color="primary">
          Send Proposal
        </Button>
      </div>
      <ProjectsPageWrapper
        data={data}
        activeProjectId={activeProjectId}
        updateActiveProjectId={updateActiveProjectId}
      />
      {slider ? (
        <SliderContainer closeSlider={closeSlider} openOrCloseSlider={slider}>
          <ProjectProposal closeSlider={closeSlider} />
        </SliderContainer>
      ) : null}
    </div>
  )
}

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
