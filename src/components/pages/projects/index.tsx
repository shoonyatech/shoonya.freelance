/* eslint-disable @typescript-eslint/no-use-before-define */
import { useLazyQuery, useMutation } from '@apollo/client'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { GET_PROJECT, GET_PROJECTS } from '../../../gql/project'
import { ADD_NEW_PROPOSAL } from '../../../gql/proposal'
import useFilters from '../../../hooks/useFilters'
import { isArrayEmpty } from '../../../lib/utils'
import BudgetFilter from '../../common/BudgetFilter'
import IconList from '../../common/IconList'
import Loader from '../../common/Loader'
import MasterDetailsLayout from '../../common/MasterDetailsLayout'
import SkilliconPickor from '../../common/SkillIconPickor'
import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import Project from '../../project/Project'
import ProjectList from '../../projects/ProjectList'

const initialFilter = {
  skills: [],
  title: '',
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

export const ProjectsPage = () => {
  const [filters, dispatch, getState] = useFilters(initialFilter)
  const [loadActiveProject, { loading, error, data: activeProject }] = useLazyQuery(GET_PROJECT)

  const [
    loadProjects,
    { loading: loadingProjects, error: errorProjects, data: projectList, refetch: refetchProjects },
  ] = useLazyQuery(GET_PROJECTS, {
    async onCompleted({ projects }) {
      if (!isArrayEmpty(projects))
        await loadActiveProject({
          variables: { _id: projects[0]._id },
        })
    },
  })

  const updateActiveProjectId = async (_id: string) => {
    await loadActiveProject({
      variables: { _id },
    })
  }

  const updateFilters = async ({ type, values }: { type?; values }) => {
    dispatch({
      type,
      payload: { ...values },
    })
    const input = getState()
    await refetchProjects({
      input,
    })
  }

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // fetched data returns undefined in first render ,even though loading turns false
  if (!activeProject || loading || error) return <Loader open={loading} error={error} />
  if (!projectList || errorProjects || loadingProjects) return <Loader open={loadingProjects} error={errorProjects} />

  const { project } = activeProject
  const { projects } = projectList
  return (
    <div className="px-4">
      <div className="flex my-4">
        <InputBase
          onChange={(e) =>
            dispatch({
              payload: { key: 'title', value: e.target.value },
            })
          }
          sx={{ padding: '0 1em', display: 'flex', border: 'solid 1px #E5E7EB', borderRadius: '8px', flex: 1 }}
          type="search"
          id="search-projects"
          placeholder="Search Projects"
          value={filters.title}
          inputProps={{ 'aria-label': 'search projects' }}
        />

        <Button
          onClick={() =>
            refetchProjects({
              input: filters,
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
        <SkillFilter
          handleSkillChange={(icon) =>
            updateFilters({
              values: {
                key: 'skills',
                value: icon,
              },
            })
          }
          skills={filters.skills}
        />
        <BudgetFilter
          updateFilter={(val) =>
            updateFilters({
              type: 'nested',
              values: {
                key: 'hourly',
                nestedkey: val.name,
                value: val.value,
              },
            })
          }
          label="Hourly rate"
          name="checked"
          state={filters.hourly}
        />
        <BudgetFilter
          updateFilter={(val) =>
            updateFilters({
              type: 'nested',
              values: {
                key: 'fixed',
                nestedkey: val.name,
                value: val.value,
              },
            })
          }
          label="Fixed rate"
          name="checked"
          state={filters.fixed}
        />
      </div>
      {isArrayEmpty(projects) ? (
        <div>Nothing to show , come back when there are active projects!</div>
      ) : (
        <MasterDetailsLayout>
          <ProjectList activeProjectId={project._id} updateActiveProjectId={updateActiveProjectId} data={projects} />
          <div className="my-4 px-6 py-2">
            <div className="flex gap-4 mb-4">
              <ApplyForProject project={project} />
              <Link href={`/projects/${project._id}`} passHref>
                <Button variant="contained" color="primary">
                  Details
                </Button>
              </Link>
            </div>
            <Project data={project} />
          </div>
        </MasterDetailsLayout>
      )}
    </div>
  )
}

const ApplyForProject = ({ project }) => {
  const router = useRouter()
  const [slider, setSlider] = useState<boolean>(false)
  const [proposal, setProposal] = useState({
    coverLetter: '',
    proposedRate: 0,
  })
  const handleChange = (key, newValue) =>
    setProposal({
      ...proposal,
      [key]: newValue,
    })

  const toggleSlider = () => setSlider((state) => !state)

  const [addNewProposal, { loading, error }] = useMutation(ADD_NEW_PROPOSAL, {
    variables: {
      coverLetter: proposal.coverLetter,
      proposedRate: proposal.proposedRate,
      projectId: project._id,
      projectTitle: project.title,
      currency: project?.budget?.currency,
    },
    onCompleted({ addNewProposal: { _id } }) {
      router.push(`/proposals/${_id}`)
    },
  })
  if (loading || error) return <Loader open={loading} error={error} />

  return (
    <>
      <Button onClick={() => toggleSlider()} variant="contained" color="primary">
        Apply
      </Button>
      {slider && (
        <SliderContainer openOrCloseSlider={slider}>
          <ProjectProposal
            currency={project.budget.currency}
            submitProposal={addNewProposal}
            cancelProposal={toggleSlider}
            data={proposal}
            handleChange={handleChange}
          />
        </SliderContainer>
      )}
    </>
  )
}
const SkillFilter = ({ handleSkillChange, skills }) => {
  const [isIconPickorActive, setIsIconPickorActive] = useState<boolean>(false)

  const toggleIconPickor = () => {
    setIsIconPickorActive((state) => !state)
  }
  return (
    <div>
      <div className="flex">
        <div>Skills </div>
        <IconButton onClick={() => toggleIconPickor()} aria-label="add skill filter" size="small">
          <ArrowDropDownIcon />
        </IconButton>
      </div>

      <SkilliconPickor
        isActive={isIconPickorActive}
        displayIcon
        closeIconPickor={toggleIconPickor}
        selectedIcons={skills}
        handleSkillChange={handleSkillChange}
      />

      <IconList iconArr={skills} displayIcon />
    </div>
  )
}
