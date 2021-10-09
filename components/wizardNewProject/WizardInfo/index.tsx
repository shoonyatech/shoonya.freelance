/* eslint-disable arrow-body-style */
import React from 'react'

import WizardBudgetInfo from '../wizardBudget/WizardBudgetInfo'
import WizardHeadingInfo from '../wizardHeadline/WizardHeadingInfo'
import WizardProgressBar from '../WizardProgressBar'
import WizardScopeInfo from '../wizardScope/WizardScopeInfo'
import WizardSkillsInfo from '../wizardskills/WizardSkillsInfo'

const WizardInfo = ({ step }) => {
  let wizardInfo

  switch (step) {
    case 1:
      wizardInfo = <WizardHeadingInfo />
      break
    case 2:
      wizardInfo = <WizardSkillsInfo />
      break
    case 3:
      wizardInfo = <WizardScopeInfo />
      break
    case 4:
      wizardInfo = <WizardBudgetInfo />
      break
    default:
      return null
  }
  return (
    <div className="bg-resume flex-1">
      <div className="p-4">
        <WizardProgressBar step={step} />
        <div className="pt-20">{wizardInfo}</div>
      </div>
    </div>
  )
}

export default WizardInfo
