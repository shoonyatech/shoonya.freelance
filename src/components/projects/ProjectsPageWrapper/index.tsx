/* eslint-disable no-underscore-dangle */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { useRouter } from 'next/router'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useReducer, useState } from 'react'

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

const reducer = (filters, action) => {
  switch (action.type) {
    case 'searchBar':
    case 'skillPickor':
      return {
        ...filters,
        [action.payload.key]: action.payload.value,
      }
    case 'hourly':
    case 'fixed':
      return {
        ...filters,
        [action.payload.key]: {
          ...filters[action.payload.key],
          [action.payload.nestedkey]:
            Number.isInteger(Number(action.payload.value)) && action.payload.nestedkey !== 'checked'
              ? +action.payload.value
              : action.payload.value,
        },
      }
    default:
      throw new Error()
  }
}

const ProjectsPageWrapper = ({ initialData, activeProjectId, updateActiveProjectId, userId }) => {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [isIconPickorActive, setIsIconPickorActive] = useState<boolean>(false)
  const [slider, setSlider] = useState(false)

  const initialFilter = {
    skills: [],
    title: '',
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
  }
  const [filters, dispatch] = useReducer(reducer, initialFilter)

  const toggleSlider = () => setSlider((state) => !state)
  const toggleIconPickor = () => {
    setIsIconPickorActive((state) => !state)
  }
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

  const updateHourlyOrFixedFilter = (filterType, val) => {
    dispatch({
      type: filterType,
      payload: { key: filterType, nestedkey: val[1], value: val[0] },
    })
    refetchProjects({
      variables: {
        input: filters,
      },
    })
  }

  const updateSkillFilter = (icon) => {
    dispatch({
      type: 'searchBar',
      payload: { key: 'skills', value: icon },
    })
    refetchProjects({
      variables: {
        input: filters,
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
      <div className="flex my-4">
        <InputBase
          onChange={(e) =>
            dispatch({
              type: 'searchBar',
              payload: { key: 'title', value: e.target.value },
            })
          }
          sx={{ padding: '0 1em', display: 'flex', border: 'solid 1px #E5E7EB', borderRadius: '8px', flex: 1 }}
          placeholder="Search Projects"
          value={filters.title}
          inputProps={{ 'aria-label': 'search projects' }}
        />
        <Button
          onClick={() =>
            refetchProjects({
              variables: {
                input: filters,
              },
            })
          }
          type="button"
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-16">
        <div>
          <div className="flex">
            <div>Skills </div>
            <IconButton
              // className={classes.iconBtn}
              onClick={() => toggleIconPickor()}
              aria-label="add skill filter"
              size="small"
            >
              <ArrowDropDownIcon />
            </IconButton>
          </div>

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
          updateFilter={(val) => updateHourlyOrFixedFilter('hourly', val)}
          label="Hourly rate"
          name="checked"
          state={filters.hourly}
        />
        <BudgetFilter
          updateFilter={(val) => updateHourlyOrFixedFilter('fixed', val)}
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
