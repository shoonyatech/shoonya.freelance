/* eslint-disable consistent-return */
import { useMutation } from '@apollo/client'
import Button from '@mui/material/Button'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { useRouter } from 'next/router'
import React, { useReducer } from 'react'

import { ADD_PROJECT } from '../../../gql/project'
import { isArrayEmpty, isBlank, isObjEmpty } from '../../../lib/utils'
import WizardBudgetFlow from '../wizardBudget/WizardBudgetFlow'
import WizardHeadlineFlow from '../wizardHeadline/WizardHeadlineFlow'
import WizardScopeFlow from '../wizardScope/WizardScopeFlow'
import WizardSkillsFlow from '../wizardskills/WizardSkillsFlow'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      marginRight: '0.5rem',
    },
  })
)

const initialValue = {
  title: '',
  skills: [],
  scope: {
    size: null,
    duration: null,
    experience: null,
  },
  budget: {
    type: null,
    currency: '',
    amount: 0,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'textInput':
    case 'currency':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
    case 'option':
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          [action.payload.nestedkey]: action.payload.value,
        },
      }
    case 'skill': {
      return {
        ...state,
        skills: action.payload.icon,
      }
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const WizardFlow = ({ step, incrStep, decrStep }) => {
  const router = useRouter()
  const classes = useStyles()
  const [addNewProject, { loading, error }] = useMutation(ADD_PROJECT, {
    onCompleted(data) {
      const { _id } = data.addProject
      router.push(`/projects/${_id}`)
    },
  })

  const [state, dispatch] = useReducer(reducer, initialValue)

  const handleTextChange = (event) =>
    dispatch({
      type: 'textInput',
      payload: { key: 'title', value: event.target.value },
    })

  const handleOptionChange = (key, nestedkey, value) =>
    dispatch({
      type: 'option',
      payload: { key, nestedkey, value },
    })

  const handleSkillChange = (icon) =>
    dispatch({
      type: 'skill',
      payload: { icon },
    })
  const reviewJobPost = () => {
    if (!isObjEmpty(state.budget) && +state.budget.amount !== 0)
      addNewProject({
        variables: {
          title: state.title,
          scope: state.scope,
          budget: {
            ...state.budget,
            amount: +state.budget.amount,
          },
          skills: state.skills,
        },
      })
  }

  let wizardFlow
  switch (step) {
    case 1:
      wizardFlow = <WizardHeadlineFlow handleTextChange={handleTextChange} state={state.title} />
      break
    case 2:
      wizardFlow = <WizardSkillsFlow handleSkillChange={handleSkillChange} state={state.skills} />
      break
    case 3:
      wizardFlow = <WizardScopeFlow handleOptionChange={handleOptionChange} state={state} />
      break
    case 4:
      wizardFlow = <WizardBudgetFlow handleOptionChange={handleOptionChange} state={state} />
      break
    default:
      return null
  }

  if (loading) return <div>Submitting...</div>
  if (error) return <div>Submission error! {JSON.stringify(error, null, 2)}</div>

  const next = () => {
    switch (step) {
      case 1:
        if (!isBlank(state.title)) return incrStep()
        break
      case 2:
        if (!isArrayEmpty(state.skills)) return incrStep()
        break
      case 3:
        if (!isObjEmpty(state.scope)) {
          return incrStep()
        }
        break
      default:
        return null
    }
  }
  return (
    <div onSubmit={reviewJobPost} className="flex-1 grid grid-rows-wizardFlow px-4">
      <div className="pt-40">{wizardFlow}</div>

      <div className="flex justify-end p-4">
        {step > 1 ? (
          <Button className={classes.btn} variant="contained" color="secondary" onClick={() => decrStep()}>
            Previous
          </Button>
        ) : null}
        {step === 4 ? (
          <Button className={classes.btn} variant="contained" color="primary" onClick={() => reviewJobPost()}>
            Review job post
          </Button>
        ) : (
          <Button className={classes.btn} variant="contained" color="primary" onClick={() => next()}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

export default WizardFlow
