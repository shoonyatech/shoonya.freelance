/* eslint-disable no-underscore-dangle */
import { useQuery } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT } from '../../../gql/project'
import IconList from '../../common/IconList'
import Loader from '../../common/Loader'
import SkilliconPickor from '../../common/SkillIconPickor'
import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import ProjectsMain from '../ProjectsMain'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      margin: '1em 0',
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
  const [isIconPickorActive, setIsIconPickorActive] = useState<boolean>(false)
  const toggleIconPickor = () => {
    setIsIconPickorActive((state) => !state)
  }
  // todo: re add setData
  // todo: re add filters
  const [filters, setFilter] = useState<any>({
    skills: [],
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
    setFilter({
      [filterType]: value,
    })
  }

  const updateSkillFilter = (icon) => {
    setFilter({
      ...filters,
      skills: icon
    })
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="px-4">
      <InputBase
        onChange={(e) => updateFilter('title', e.target.value)}
        className={`${classes.root} ${classes.input}`}
        placeholder="Search Projects"
        inputProps={{ 'aria-label': 'search projects' }}
      />
      <div className="flex">
        <div>Skills </div>
        <IconButton onClick={() => toggleIconPickor()} aria-label="add skill filter" size="small">
          <ArrowDropDownIcon />
        </IconButton>
        <IconList iconArr={filters.skills} displayIcon />
      </div>
      <SkilliconPickor
        isActive={isIconPickorActive}
        displayIcon
        closeIconPickor={toggleIconPickor}
        selectedIcons={filters.skills}
        handleSkillChange={updateSkillFilter}
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
    </div>
  )
}

export default ProjectsPageWrapper
