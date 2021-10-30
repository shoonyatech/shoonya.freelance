/* eslint-disable arrow-body-style */
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import React, { useState } from 'react'

import { icons } from '../../../lib/icon'

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
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

const SkillIcons = ({ techStack, handleSkillChange }) => {
  const classes = useStyles()

  const [showTechStackIconPickor, setShowTechStackIconPickor] = useState<boolean>(false)
  const iconsArr = Object.keys(icons)

  const openTechStackPickor = () => {
    setShowTechStackIconPickor(true)
  }

  const closeTechStackPickor = () => {
    setShowTechStackIconPickor(false)
  }

  const onSelectedSkillChange = (icon: any) => {
    const updateTechStack = techStack.includes(icon) ? techStack.filter((b) => b !== icon) : [...techStack, icon]
    handleSkillChange(updateTechStack)
  }

  return (
    <div className="pb-4 relative h-10">
      <div className="flex items-center">
        <p className="flex items-center">
          <span className="mr-2">Tech stack : </span>
          {techStack.map((icon) => (
            <span key={icon} className="px-px">
              {icons[`${icon}`]}
            </span>
          ))}
        </p>
        <Button onClick={() => openTechStackPickor()}>
          <AddIcon />
        </Button>
        {showTechStackIconPickor ? (
          <div className="flex flex-col max-h-60 w-80 bg-white shadow-lg rounded absolute top-10 z-20">
            <IconButton onClick={() => closeTechStackPickor()} className={classes.btn}>
              <CancelIcon />
            </IconButton>
            <div className="flex flex-wrap p-2">
              {iconsArr.map((icon) => (
                <Button
                  onClick={() => onSelectedSkillChange(icon)}
                  className={`iconbtn ${techStack.includes(icon) && classes.active}`}
                  key={icon}
                >
                  {icons[icon]}
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default SkillIcons
