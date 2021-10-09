import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'

import { icons } from '../../../lib/icon'
import TechStackIcons from '../../profile/TechStackIcons'

const SkillIcons = ({ techStack, onSelectedSkillChange, i }) => {
  const [showTechStackIconPickor, setShowTechStackIconPickor] = useState<boolean>(false)

  const openTechStackPickor = () => {
    setShowTechStackIconPickor(true)
  }

  const closeTechStackPickor = () => {
    setShowTechStackIconPickor(false)
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
          <TechStackIcons
            closeTechStackPickor={closeTechStackPickor}
            techStack={techStack}
            onSelectedSkillChange={onSelectedSkillChange}
            index={i}
          />
        ) : null}
      </div>
    </div>
  )
}
export default SkillIcons
