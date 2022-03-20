import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { useContext, useEffect, useState } from 'react'

import { ProjectIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_PROJECT_SCOPE } from '../../../gql/project'
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

const ProjectScope = ({ data, userId, projectId }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(ProjectIsReadOnlyContext)

  const [projectScope, setProjectScope] = useState(data)
  const [updatedScope, setUpdatedScope] = useState<string | null>(null)

  const [updateProjectScope, { loading, error }] = useMutation(UPDATE_PROJECT_SCOPE, {
    onCompleted(val) {
      const newScope = val.updateProjectScope.scope
      setProjectScope(newScope)
      setUpdatedScope(newScope)
      setEdit(false)
    },
  })

  useEffect(() => {
    setProjectScope(data)
  }, [data])

  const updateScope = (e) => {
    e.preventDefault()
    const filterTypename = removeKey('__typename', projectScope)
    updateProjectScope({
      variables: { _id: projectId, owner: userId, scope: filterTypename },
    })
  }

  const cancel = () => {
    const revertScope = updatedScope || data

    setProjectScope(revertScope)
    setEdit(false)
  }

  const handleChange = (e) =>
    setProjectScope({
      ...projectScope,
      [e.target.name]: e.target.value,
    })

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="flex flex-col px-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl uppercase md:text-2xl">scope</h3>
        {!edit && !isReadOnly ? (
          <button type="button" onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>

      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateScope}>
          <RadioButtonsGroup
            formLabel="Project size"
            selectedValue={projectScope.size}
            options={['large', 'medium', 'small']}
            handleChange={handleChange}
            name="size"
            ariaLabel="project size"
          />
          <RadioButtonsGroup
            formLabel="Duration"
            selectedValue={projectScope.duration}
            options={['more than 6 months', '3 to 6 months', '1 to 3 months']}
            handleChange={handleChange}
            name="duration"
            ariaLabel="project duration"
          />
          <RadioButtonsGroup
            formLabel="Expertise"
            selectedValue={projectScope.experience}
            options={['entry', 'intermediate', 'expert']}
            handleChange={handleChange}
            name="experience"
            ariaLabel="project size"
          />
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
          <div className="grid grid-cols-2">
            <span>Project Size</span> <span>: {projectScope?.size}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Duration</span>
            <span>: {projectScope?.duration}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Experience</span>
            <span>: {projectScope?.experience}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectScope
