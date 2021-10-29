import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import React from 'react'

import { icons } from '../../../lib/icon'

const SkillIcons = ({ techStack, openTechStackPickor, children }) => (
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
      {children}
    </div>
  </div>
)
export default SkillIcons
