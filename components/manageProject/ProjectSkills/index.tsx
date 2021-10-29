import { gql, useMutation } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { useState } from 'react'

import { icons } from '../../../lib/icon'
import SkillIcons from '../../common/SkillIcons'
import TechStackIcons from '../../common/TechStackIcons'

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

const ProjectSkills = ({ data, _id }) => {
  const { user } = useUser()
  const classes = useStyles()

  const [projectSkills, setProjectSkills] = useState<any>(data)
  const [updatedSkills, setUpdatedSkills] = useState<any | null>(null)
  const [edit, setEdit] = useState<boolean>(!data)
  const [showTechStackIconPickor, setShowTechStackIconPickor] = useState<boolean>(false)
  const iconsArr = Object.keys(icons)

  const openTechStackPickor = () => {
    setShowTechStackIconPickor(true)
  }

  const closeTechStackPickor = () => {
    setShowTechStackIconPickor(false)
  }

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
      variables: { _id, owner: user?.sub?.split('|')[1], skills: projectSkills },
    })
  }

  const onSelectedSkillChange = (icon) => {
    const skills = [...projectSkills]
    const newTechStack = skills.includes(icon) ? skills.filter((b) => b !== icon) : [...skills, icon]
    setProjectSkills(newTechStack)
  }
  if (loading) return <div>Loading...</div>

  if (error) return <div>Error! ${error.message}</div>
  return (
    <div className="p-4 md:p-6">
      {!edit ? (
        <button type="button" className="float-right" onClick={() => setEdit(true)}>
          <EditIcon />
        </button>
      ) : null}
      <h3 className="text-xl md:text-2xl uppercase pb-3">Skills</h3>

      {edit ? (
        <form onSubmit={updateSkills} className="flex flex-col ">
          <SkillIcons techStack={projectSkills} openTechStackPickor={openTechStackPickor}>
            {showTechStackIconPickor ? (
              <TechStackIcons closeTechStackPickor={closeTechStackPickor}>
                {iconsArr.map((icon) => (
                  <Button
                    onClick={() => onSelectedSkillChange(icon)}
                    className={`iconbtn ${projectSkills.includes(icon) && classes.active}`}
                    key={icon}
                  >
                    {icons[icon]}
                  </Button>
                ))}
              </TechStackIcons>
            ) : null}
          </SkillIcons>
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
