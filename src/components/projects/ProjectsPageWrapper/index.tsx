/* eslint-disable no-underscore-dangle */
import { useLazyQuery, useQuery } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT, GET_PROJECTS } from '../../../gql/project'
import { isArrayEmpty } from '../../../lib/utils'
import BudegtFilter from '../../common/BudgetFilter'
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
    iconBtn: {
      alignSelf: 'self-start',
    },
  })
)

const ProjectsPageWrapper = ({ initialData, activeProjectId, updateActiveProjectId, userId }) => {
  const classes = useStyles()
  const [data, setData] = useState(initialData)
  const [isIconPickorActive, setIsIconPickorActive] = useState<boolean>(false)
  const toggleIconPickor = () => {
    setIsIconPickorActive((state) => !state)
  }
  const [filters, setFilter] = useState<any>({
    skills: [],
    title: undefined,
    owner: userId,
    fixed: {
      max: null,
      min: null,
      currency: null,
      checked: null,
    },
    hourly: {
      max: null,
      min: null,
      currency: null,
      checked: null,
    },
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

  const [refetchProjects, { loading: loadingProjects, error: errorProjects }] = useLazyQuery(GET_PROJECTS, {
    fetchPolicy: 'no-cache',
    async onCompleted({ projects }) {
      if (isArrayEmpty(projects)) {
        updateActiveProjectId(null)
        setData([])
        return
      }
      const newId = projects?.[0]?._id
      updateActiveProjectId(newId)
      await refetch({
        _id: newId,
      })
      setData(projects)
    },
  })

  const updateActiveProject = (newId) => {
    updateActiveProjectId(newId)
    refetch({
      _id: newId,
    })
  }
  const updateFilter = (filterType, value) => {
    const newFilter = {
      ...filters,
      [filterType]: value,
    }
    refetchProjects({
      variables: {
        input: newFilter,
      },
    })
    setFilter(newFilter)
  }

  const updateSkillFilter = (icon) => {
    const newFilter = {
      ...filters,
      skills: icon,
    }
    setFilter(newFilter)
    refetchProjects({
      variables: {
        input: newFilter,
      },
    })
  }

  if (loading) return <Loader open={loading} error={error} />
  if (errorProjects || loadingProjects) return <Loader open={loading} error={errorProjects} />

  return (
    <div className="px-4">
      <InputBase
        onChange={(e) => updateFilter('title', e.target.value)}
        className={`${classes.root} ${classes.input}`}
        placeholder="Search Projects"
        value={filters.title}
        inputProps={{ 'aria-label': 'search projects' }}
      />

      <div className="flex flex-wrap gap-x-16">
        <div className="flex">
          <div>Skills </div>
          <SkilliconPickor
            isActive={isIconPickorActive}
            displayIcon
            closeIconPickor={toggleIconPickor}
            selectedIcons={filters.skills}
            handleSkillChange={updateSkillFilter}
          />
          <IconButton
            className={classes.iconBtn}
            onClick={() => toggleIconPickor()}
            aria-label="add skill filter"
            size="small"
          >
            <ArrowDropDownIcon />
          </IconButton>
          <IconList iconArr={filters.skills} displayIcon />
        </div>
        <BudegtFilter label="hourly rate" name="checked" checked={false} />
        <BudegtFilter label="fixed rate" name="checked" checked={false} />
      </div>

      {isArrayEmpty(data) ? (
        <div style={{ marginLeft: '57px' }}>Nothing to show , come back when there are active projects!</div>
      ) : (
        <ProjectsMain
          data={data}
          activeProjectId={activeProjectId}
          projectData={d.project}
          updateActiveProjectId={updateActiveProject}
          toggleSlider={toggleSlider}
        />
      )}

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
