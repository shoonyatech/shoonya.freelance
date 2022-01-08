import { useMutation, useQuery } from '@apollo/client'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import React, { useReducer } from 'react'

import GET_CURRENCIES from '../../../gql/country'
import { UPDATE_PROJECT } from '../../../gql/project'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import RadioButtonsGroup from '../../common/RadioButtonsGroup'
import SaveCancelBtn from '../../common/SaveCancelBtn'
import SkillIcons from '../../common/SkillIcons'

const reducer = (state, action) => {
  switch (action.type) {
    case 'textInput':
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
    case 'update': {
      return {
        state: action.payload.value,
      }
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const EditProject = ({ cancelEdit, data, getUpdatedProjectDetails }) => {
  const { error: countryError, loading: countryLoad, data: countryData } = useQuery(GET_CURRENCIES)
  const initialScope = removeKey('__typename', data.scope)
  const initialBudget = removeKey('__typename', data.budget)

  const initialState = {
    title: data.title,
    skills: data.skills,
    scope: initialScope,
    budget: initialBudget,
    description: data.description,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
    onCompleted() {
      getUpdatedProjectDetails()
      cancelEdit()
    },
  })

  const handleTextChange = (key) => (event) =>
    dispatch({
      type: 'textInput',
      payload: { key, value: event.target.value },
    })

  const handleSkillChange = (icon) =>
    dispatch({
      type: 'skill',
      payload: { icon },
    })

  const handleOptionChange = (e) => {
    const [key, nestedkey] = e.target.name.split(' ')
    dispatch({
      type: 'option',
      payload: { key, nestedkey, value: e.target.value },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProject({
      variables: {
        project: {
          _id: '61c0add768b1f14890cda333',
          owner: '61bd832be09c83006f188641',
          ...state,
          budget: {
            ...state.budget,
            amount: +state.budget.amount,
          },
        },
      },
    })
  }

  if (loading) return <Loader open={loading} error={error} />
  if (countryLoad) return <Loader open={countryLoad} error={countryError} />

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="projecttitle"
        label="Project Title"
        value={state.title}
        onChange={handleTextChange('title')}
        color="primary"
        margin="dense"
        variant="outlined"
        required
      />
      <div className="my-4">
        <RadioButtonsGroup
          formLabel="Project size"
          selectedValue={state.scope.size}
          options={['large', 'medium', 'small']}
          handleChange={handleOptionChange}
          name="scope size"
          ariaLabel="project size"
        />
        <RadioButtonsGroup
          formLabel="Duration"
          selectedValue={state.scope.duration}
          options={['more than 6 months', '3 to 6 months', '1 to 3 months']}
          handleChange={handleOptionChange}
          name="scope duration"
          ariaLabel="project duration"
        />
        <RadioButtonsGroup
          formLabel="Expertise"
          selectedValue={state.scope.experience}
          options={['entry', 'intermediate', 'expert']}
          handleChange={handleOptionChange}
          name="scope experience"
          ariaLabel="project size"
        />
      </div>

      <div className="my-4">
        <RadioButtonsGroup
          formLabel="Type"
          selectedValue={state.budget.type}
          options={['hourly rate', 'fixed rate']}
          handleChange={handleOptionChange}
          name="budget type"
          ariaLabel="project budget type"
        />
      </div>
      <div className="flex my-4">
        <div>
          <Select value={state.budget.currency} onChange={handleOptionChange} name="budget currency" fullWidth>
            {countryData.countries.map((country) => (
              <MenuItem key={country.name} value={country.currency}>
                {country.currency}
              </MenuItem>
            ))}
          </Select>
        </div>
        <TextField
          type="number"
          name="budget amount"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleOptionChange}
          value={state.budget.amount}
        />
      </div>
      <div>
        <SkillIcons techStack={state.skills} handleSkillChange={(icon) => handleSkillChange(icon)} isIconName />
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Project Details"
        value={state.description}
        onChange={handleTextChange('description')}
        multiline
        rows={4}
        variant="outlined"
        color="primary"
        required
        fullWidth
      />

      <SaveCancelBtn cancelEdit={cancelEdit} />
    </form>
  )
}

export default EditProject
