import React from 'react'

import SkillIcons from '../../../common/SkillIcons'

const WizardSkillsFlow = ({ state, handleSkillChange }) => (
  <div className="w-full">
    <p className="text-xl">Search skills or add your own</p>
    <SkillIcons techStack={state} handleSkillChange={(icon) => handleSkillChange(icon)} isIconName />
  </div>
)
export default WizardSkillsFlow
