import { gql, useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { useContext, useEffect, useState } from 'react'

import { icons } from '../../../lib/icon'
import ProjectIsReadOnlyContext from '../../../src/context/ProjectIsReadOnlyContext'
import Loader from '../../common/Loader'
import SkillIcons from '../../common/SkillIcons'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
    iconbtn: {
      margin: '0.5rem',
      borderRadius: '1rem',
    },
    active: {
      border: '1px solid',
    },
  })
)

const UPDATE_PROJECT_SKILLS = gql`
  mutation UpdateProjectSkills($_id: ID!, $owner: ID!, $skills: [String]) {
    updateProjectSkills(_id: $_id, owner: $owner, skills: $skills) {
      skills
    }
  }
`

const ProjectSkills = ({ data, userId, projectId }) => {
  const classes = useStyles()

  const [projectSkills, setProjectSkills] = useState<any>(data)
  const [updatedSkills, setUpdatedSkills] = useState<any | null>(null)
  const [edit, setEdit] = useState<boolean>(!data)
  const isReadOnly = useContext(ProjectIsReadOnlyContext)

  useEffect(() => {
    setProjectSkills(data)
  }, [data])

  const [updateProjectSkills, { loading, error }] = useMutation(UPDATE_PROJECT_SKILLS, {
    onCompleted(val) {
      const newSkills = val.updateProjectSkills.skills
      setProjectSkills(newSkills)
      setUpdatedSkills(newSkills)
      setEdit(false)
    },
  })

  const cancel = () => {
    const revertSkills = updatedSkills || data

    setProjectSkills(revertSkills)
    setEdit(false)
  }

  const updateSkills = (e) => {
    e.preventDefault()
    updateProjectSkills({
      variables: { _id: projectId, owner: userId, skills: projectSkills },
    })
  }

  const handleSkillChange = (selectedIcons) => {
    setProjectSkills(selectedIcons)
  }

  if (loading) return <Loader open={loading} error={error} />
  return (
    <div className="p-4 md:p-6">
      {!edit && !isReadOnly ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">Skills</h3>

      {edit && !isReadOnly ? (
        <form onSubmit={updateSkills} className="flex flex-col ">
          <SkillIcons techStack={projectSkills} handleSkillChange={(icon) => handleSkillChange(icon)} />
          <div className="self-end pt-2">
            <Button type="submit" className={classes.savecancelbtn} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => cancel()} className={classes.savecancelbtn} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex">
            {projectSkills.map((icon) => (
              <span key={icon} className="px-px">
                {icons[`${icon}`]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectSkills
