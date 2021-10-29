import { gql, useMutation, useQuery } from '@apollo/client'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'

import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import RadioButtonsGroup from '../../common/RadioButtonsGroup'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const GET_CURRENCIES = gql`
  {
    countries {
      name
      currency
    }
  }
`

const UPDATE_PROJECT_BUDGET = gql`
  mutation UpdateProjectBudget($_id: ID!, $owner: ID!, $budget: BudgetInput) {
    updateProjectBudget(_id: $_id, owner: $owner, budget: $budget) {
      budget {
        type
        currency
        amount
      }
    }
  }
`

const ProjectBudget = ({ data, userId, projectId }) => {
  const classes = useStyles()
  const { error, loading, data: countryData } = useQuery(GET_CURRENCIES)
  const [edit, setEdit] = useState<boolean>(!data)
  const [projectBudget, setProjectBudget] = useState(data)
  const [updatedBudget, setUpdatedBudget] = useState<string | null>(null)

  const [updateProjectBudget, { loading: loadingMutation, error: errorMutation }] = useMutation(UPDATE_PROJECT_BUDGET, {
    onCompleted(val) {
      const newBudget = val.updateProjectBudget.budget
      setProjectBudget(newBudget)
      setUpdatedBudget(newBudget)
      setEdit(false)
    },
  })

  const cancel = () => {
    const revertBudget = updatedBudget || data

    setProjectBudget(revertBudget)
    setEdit(false)
  }

  const handleChange = (e) => {
    setProjectBudget({
      ...projectBudget,
      [e.target.name]: e.target.value,
    })
  }

  const updateBudget = (e) => {
    e.preventDefault()
    const filterTypename = removeKey('__typename', projectBudget)
    updateProjectBudget({
      variables: { _id: projectId, owner: userId, budget: filterTypename },
    })
  }

  if (loading || loadingMutation) return <Loader open={loading} error={error || errorMutation} />

  return (
    <div className="flex flex-col px-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Budget</h3>
        {!edit ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>

      {edit ? (
        <form className="flex flex-col" onSubmit={updateBudget}>
          <RadioButtonsGroup
            formLabel="Type"
            selectedValue={projectBudget.type}
            options={['hourly rate', 'fixed rate']}
            handleChange={handleChange}
            name="type"
            ariaLabel="project budget type"
          />
          <div className="flex">
            <div>
              <Select value={projectBudget.currency} name="currency" onChange={handleChange} fullWidth>
                {countryData.countries.map((country) => (
                  <MenuItem key={country.name} value={country.currency}>
                    {country.currency}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              type="number"
              name="amount"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={projectBudget.amount}
            />
          </div>

          <div className="self-end pt-2">
            <div className="self-end pt-2">
              <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button className={classes.savecancelbtn} onClick={() => cancel()} variant="contained" color="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          {projectBudget.amount}
          {projectBudget.currency}
          {projectBudget.type === 'hourly rate' ? '/hr' : ' fixed'}
        </div>
      )}
    </div>
  )
}

export default ProjectBudget
