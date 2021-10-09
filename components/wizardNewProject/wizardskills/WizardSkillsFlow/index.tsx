import React from 'react'

import SkillIcons from '../../../common/SkillIcons'

const WizardSkillsFlow = ({ state, handleSkillsChange }) => (
  <div className="w-full">
    <p className="text-xl">Search skills or add your own</p>
    <SkillIcons techStack={state} onSelectedSkillChange={handleSkillsChange} i={0} />
  </div>
)

export default WizardSkillsFlow
