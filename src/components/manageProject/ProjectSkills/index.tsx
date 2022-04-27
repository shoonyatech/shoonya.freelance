import { useMutation } from '@apollo/client'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'

import { ProjectIsReadOnlyContext } from '../../../context/isReadOnlyContext'
import { UPDATE_PROJECT_SKILLS } from '../../../gql/project'
import { icons } from '../../../lib/icon'
import Loader from '../../common/Loader'
import SkillIcons from '../../common/SkillIcons'

const ProjectSkills = ({ data, userId, projectId }) => {
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
      <h3 className="pb-3 text-xl uppercase md:text-2xl">Skills</h3>

      {edit && !isReadOnly ? (
        <form onSubmit={updateSkills} className="flex flex-col ">
          <SkillIcons techStack={projectSkills} handleSkillChange={(icon) => handleSkillChange(icon)} isIconName />
          <div className="self-end pt-2">
            <Button
              type="submit"
              sx={{
                marginRight: '.5rem',
              }}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => cancel()}
              sx={{
                marginRight: '.5rem',
              }}
              variant="contained"
              color="secondary"
            >
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
