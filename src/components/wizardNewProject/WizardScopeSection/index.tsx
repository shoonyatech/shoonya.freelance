import React from 'react'

import WizardOption from '../WizardOption'

const WizardScopeSection = ({ handleOptionChange, state, title, parentkey, nestedkey, values }) => (
  <div>
    <h3 className="text-xl pb-4 pt-6">{title}</h3>
    <div className="grid grid-cols-3 gap-4">
      {values.map((value: string) => (
        <WizardOption
          key={value}
          value={value}
          handleOptionChange={handleOptionChange}
          parentkey={parentkey}
          nestedkey={nestedkey}
          state={state}
        >
          {value}
        </WizardOption>
      ))}
    </div>
  </div>
)

export default WizardScopeSection
