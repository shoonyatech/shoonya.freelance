import { useMutation, useQuery } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'

import GET_CURRENCIES from '../../../gql/country'
import { UPDATE_PROJECT_BUDGET } from '../../../gql/project'
import useIsReadOnlyContext from '../../../hooks/useIsReadOnlyContext'
import { removeKey } from '../../../lib/utils'
import Loader from '../../common/Loader'
import RadioButtonsGroup from '../../common/RadioButtonsGroup'

const ProjectBudget = ({ data, userId, projectId }) => {
  const { error, loading, data: countryData } = useQuery(GET_CURRENCIES)
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useIsReadOnlyContext()
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

  useEffect(() => {
    setProjectBudget(data)
  }, [data])

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
      <div className="flex justify-between pb-3 items-start">
        <h3 className="text-xl uppercase md:text-2xl">Budget</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>

      {edit && !isReadOnly ? (
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
              <Button sx={{ marginRight: '0.5em' }} type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button sx={{ marginRight: '0.5em' }} onClick={() => cancel()} variant="contained" color="secondary">
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
