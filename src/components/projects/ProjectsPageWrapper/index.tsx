/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, makeStyles } from '@material-ui/core/styles'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import Loader from '../../common/Loader'
import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import ProjectsMain from '../ProjectsMain'

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

const ProjectsPageWrapper = ({ initialData, activeProjectId, updateActiveProjectId }) => {
  const classes = useStyles()
  const [data] = useState(initialData)
  // todo: re add setData
  // todo: re add filters
  const [setUpdateFilter] = useState<any>({
    title: undefined,
  })

  const [slider, setSlider] = useState(false)
  const toggleSlider = () => {
    setSlider((state) => !state)
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
  const updateFilter = (filterType, value) => {
    setUpdateFilter({
      [filterType]: value,
    })
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <>
      <InputBase
        onChange={(e) => updateFilter('title', e.target.value)}
        className={`${classes.root} ${classes.input}`}
        placeholder="Search Projects"
        inputProps={{ 'aria-label': 'search projects' }}
      />
      <ProjectsMain
        data={data}
        activeProjectId={activeProjectId}
        projectData={d.project}
        updateActiveProjectId={updateActiveProject}
        toggleSlider={toggleSlider}
      />
      {slider ? (
        <SliderContainer closeSlider={toggleSlider} openOrCloseSlider={slider}>
          <ProjectProposal
            closeSlider={toggleSlider}
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
