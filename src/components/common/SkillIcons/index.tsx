/* eslint-disable arrow-body-style */
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import React, { useState } from 'react'

import { icons } from '../../../lib/icon'
import SkilliconPickor from '../SkillIconPickor'

interface Props {
  techStack: any
  handleSkillChange: any
  isIconName?: boolean
}

const defaultProps = {
  isIconName: false,
}

const SkillIcons = ({ techStack, handleSkillChange, isIconName }: Props) => {
  const [isIconPickorActive, setIsIconPickorActive] = useState<boolean>(false)

  const toggleIconPickor = () => {
    setIsIconPickorActive((state) => !state)
  }

  return (
    <div className="pb-4  min-h-10">
      <div className="flex items-center">
        <div className="flex flex-col ">
          <div className="flex">
            <p className="mr-2 whitespace-nowrap">Tech stack : </p>
            <ul className="flex flex-wrap">
              {techStack.map((icon) => {
                if (isIconName) {
                  return (
                    <li key={icon} className="px-0.5">
                      <Chip icon={icons[`${icon}`]} label={icon} color="primary" variant="outlined" />
                    </li>
                  )
                }
                return (
                  <li key={icon} className="px-0.5">
                    {icons[`${icon}`]}
                  </li>
                )
              })}
            </ul>
            <Button onClick={() => toggleIconPickor()}>
              <AddIcon />
            </Button>
          </div>

          <SkilliconPickor
            isActive={isIconPickorActive}
            displayIcon
            closeIconPickor={toggleIconPickor}
            selectedIcons={techStack}
            handleSkillChange={handleSkillChange}
          />
        </div>
      </div>
    </div>
  )
}
export default SkillIcons

SkillIcons.defaultProps = defaultProps
