/* eslint-disable no-underscore-dangle */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useRouter } from 'next/router'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import { GET_PROJECT, GET_PROJECTS } from '../../../gql/project'
import { ADD_NEW_PROPOSAL } from '../../../gql/proposal'
import { isArrayEmpty } from '../../../lib/utils'
import BudgetFilter from '../../common/BudgetFilter'
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
  const router = useRouter()
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
      checked: false,
    },
    hourly: {
      max: null,
      min: null,
      currency: null,
      checked: false,
    },
  })

  const [slider, setSlider] = useState(false)
  const toggleSlider = () => setSlider((state) => !state)

  const [proposal, setProposal] = useState({
    coverLetter: '',
    proposedRate: 0,
  })
  const handleChange = (key, newValue) =>
    setProposal({
      ...proposal,
      [key]: newValue,
    })

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
    const newFilter = Array.isArray(value)
      ? {
          ...filters,
          [filterType]: {
            ...filters[filterType],
            [value[1]]: Number.isInteger(Number(value[0])) && value[1] !== 'checked' ? +value[0] : value[0],
          },
        }
      : {
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

  const [addNewProposal, { loading: loadAddNewProposal, error: errAddNewProposal }] = useMutation(ADD_NEW_PROPOSAL, {
    variables: {
      coverLetter: proposal.coverLetter,
      proposedRate: proposal.proposedRate,
      projectId: activeProjectId,
      projectTitle: d?.project.title,
      currency: d?.project?.budget?.currency,
    },
    onCompleted({ addNewProposal: { _id } }) {
      router.push(`/proposals/${_id}`)
    },
  })

  if (loading) return <Loader open={loading} error={error} />
  if (errorProjects || loadingProjects) return <Loader open={loading} error={errorProjects} />
  if (loadAddNewProposal) return <Loader open={loadAddNewProposal} error={errAddNewProposal} />

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
        <div className="flex flex-col">
          <div>Skills </div>
          <IconButton
            className={classes.iconBtn}
            onClick={() => toggleIconPickor()}
            aria-label="add skill filter"
            size="small"
          >
            <ArrowDropDownIcon />
          </IconButton>
          <SkilliconPickor
            isActive={isIconPickorActive}
            displayIcon
            closeIconPickor={toggleIconPickor}
            selectedIcons={filters.skills}
            handleSkillChange={updateSkillFilter}
          />

          <IconList iconArr={filters.skills} displayIcon />
        </div>
        <BudgetFilter
          updateFilter={(val) => updateFilter('hourly', val)}
          label="Hourly rate"
          name="checked"
          state={filters.hourly}
        />
        <BudgetFilter
          updateFilter={(val) => updateFilter('fixed', val)}
          label="Fixed rate"
          name="checked"
          state={filters.fixed}
        />
      </div>

      {isArrayEmpty(data) ? (
        <div>Nothing to show , come back when there are active projects!</div>
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
        <SliderContainer openOrCloseSlider={slider}>
          <ProjectProposal
            currency={d.project.budget.currency}
            submitProposal={addNewProposal}
            cancelProposal={toggleSlider}
            data={proposal}
            handleChange={handleChange}
          />
        </SliderContainer>
      ) : null}
    </div>
  )
}

export default ProjectsPageWrapper
