import React from 'react'

import WizardHourlyRate from '../../WizardHourlyRate'
import WizardOption from '../../WizardOption'
import WizardProjectBudget from '../../WizardProjectBudget'

const WizardBudgetFlow = ({ handleOptionChange, state }) => (
  <div>
    <div className="grid grid-cols-2 gap-4">
      <WizardOption
        handleOptionChange={handleOptionChange}
        parentkey="budget"
        nestedkey="type"
        value="hourly rate"
        state={state}
      >
        Hourly rate
      </WizardOption>
      <WizardOption
        handleOptionChange={handleOptionChange}
        parentkey="budget"
        nestedkey="type"
        value="fixed rate"
        state={state}
      >
        Fixed rate
      </WizardOption>
    </div>
    {state?.budget?.type === 'hourly rate' ? (
      <WizardHourlyRate handleOptionChange={handleOptionChange} state={state} parentkey="budget" />
    ) : null}
    {state?.budget?.type === 'fixed rate' ? (
      <WizardProjectBudget handleOptionChange={handleOptionChange} state={state} parentkey="budget" />
    ) : null}
  </div>
)

export default WizardBudgetFlow
