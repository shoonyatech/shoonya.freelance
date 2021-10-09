import React from 'react'

import CurrencyAndRate from '../../common/CurrencyAndRate'

const WizardProjectBudget = ({ handleOptionChange, state, parentkey }) => (
  <div className="pt-10">
    <p>Maximum project budget</p>
    <CurrencyAndRate handleOptionChange={handleOptionChange} state={state} parentkey={parentkey} />
  </div>
)

export default WizardProjectBudget
