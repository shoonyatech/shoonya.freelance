import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

import { icons } from '../../../../lib/icon'
import SkillIcons from '../../../common/SkillIcons'
import TechStackIcons from '../../../common/TechStackIcons'

const useStyles = makeStyles(() =>
  createStyles({
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
const WizardSkillsFlow = ({ state, handleSkillsChange }) => {
  const classes = useStyles()

  const [showTechStackIconPickor, setShowTechStackIconPickor] = useState<boolean>(false)
  const iconsArr = Object.keys(icons)

  const openTechStackPickor = () => {
    setShowTechStackIconPickor(true)
  }

  const closeTechStackPickor = () => {
    setShowTechStackIconPickor(false)
  }

  return (
    <div className="w-full">
      <p className="text-xl">Search skills or add your own</p>
      <SkillIcons techStack={state} openTechStackPickor={openTechStackPickor}>
        {showTechStackIconPickor ? (
          <TechStackIcons closeTechStackPickor={closeTechStackPickor}>
            {iconsArr.map((icon) => (
              <Button
                onClick={() => handleSkillsChange(icon)}
                className={`iconbtn ${state.includes(icon) && classes.active}`}
                key={icon}
              >
                {icons[icon]}
              </Button>
            ))}
          </TechStackIcons>
        ) : null}
      </SkillIcons>
    </div>
  )
}
export default WizardSkillsFlow
