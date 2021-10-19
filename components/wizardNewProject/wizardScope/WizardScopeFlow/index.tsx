import React from 'react'

import WizardScopeSection from '../../WizardScopeSection'

const WizardScopeFlow = ({ handleOptionChange, state }) => (
  <div>
    <WizardScopeSection
      handleOptionChange={handleOptionChange}
      state={state}
      title="Project Size"
      parentkey="scope"
      nestedkey="size"
      values={['large', 'medium', 'small']}
    />
    <WizardScopeSection
      handleOptionChange={handleOptionChange}
      state={state}
      title="How long will your work take"
      parentkey="scope"
      nestedkey="duration"
      values={['more than 6 months', '3 to 6 months', ' 1 to 3 months']}
    />
    <WizardScopeSection
      handleOptionChange={handleOptionChange}
      state={state}
      title="How long will your work take"
      parentkey="scope"
      nestedkey="experience"
      values={['entry', 'intermediate', 'expert']}
    />
  </div>
)

export default WizardScopeFlow
