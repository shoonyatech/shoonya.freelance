/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, makeStyles } from '@material-ui/core/styles'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import Projects from '../Projects'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '1em',
      border: 'solid 1px #E5E7EB',
      borderRadius: '8px',
    },
    input: {
      padding: '0 1em',
    },
  })
)

const ProjectsPageWrapper = ({ data, activeProjectId, updateActiveProjectId }) => {
  const classes = useStyles()
  const [slider, setSlider] = useState(false)
  const closeSlider = () => {
    setSlider(false)
  }
  const {
    error,
    loading,
    data: d,
    refetch,
  } = useQuery(GET_PROJECT, {
    variables: {
      _id: activeProjectId,
    },
  })
  const updateActiveProject = (newId) => {
    updateActiveProjectId(newId)
    refetch({
      _id: newId,
    })
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <>
      <InputBase
        className={`${classes.root} ${classes.input}`}
        placeholder="Search Projects"
        inputProps={{ 'aria-label': 'search projects' }}
      />
      <div className="flex justify-end py-2">
        <Button onClick={() => setSlider(true)} variant="contained" color="primary">
          Send Proposal
        </Button>
      </div>
      <Projects
        data={data}
        activeProjectId={activeProjectId}
        projectData={d.project}
        updateActiveProjectId={updateActiveProject}
      />
      {slider ? (
        <SliderContainer closeSlider={closeSlider} openOrCloseSlider={slider}>
          <ProjectProposal
            closeSlider={closeSlider}
            projectId={activeProjectId}
            projectTitle={d.project.title}
            currency={d.project.budget.currency}
          />
        </SliderContainer>
      ) : null}
    </>
  )
}

export default ProjectsPageWrapper
