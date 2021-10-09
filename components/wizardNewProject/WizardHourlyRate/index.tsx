import React from 'react'

import CurrencyAndRate from '../../common/CurrencyAndRate'

const WizardHourlyRate = ({ handleOptionChange, state, parentkey }) => (
  <div className="pt-10">
    <p>Hourly rate</p>
    <CurrencyAndRate handleOptionChange={handleOptionChange} state={state} parentkey={parentkey} />
  </div>
)

export default WizardHourlyRate
