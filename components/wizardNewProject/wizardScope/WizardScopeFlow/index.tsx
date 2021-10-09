import React from 'react'

import WizardOption from '../../WizardOption'

const WizardScopeFlow = ({ handleOptionChange, state }) => (
  <div>
    <div>
      <h3 className="text-xl pb-4">Project Size</h3>
      <div className="grid grid-cols-3 gap-4">
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="size"
          value="large"
          state={state}
        >
          Large
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="size"
          value="medium"
          state={state}
        >
          Medium
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="size"
          value="small"
          state={state}
        >
          Small
        </WizardOption>
      </div>
    </div>

    <div className="pt-10">
      <h3 className="text-xl pb-4">How long will your work take</h3>
      <div className="grid grid-cols-3 gap-4">
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="duration"
          value="more than 6 months"
          state={state}
        >
          More than 6 months
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="duration"
          value="3 to 6 months"
          state={state}
        >
          3 to 6 months
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="duration"
          value="1 to 3 months"
          state={state}
        >
          1 to 3 months
        </WizardOption>
      </div>
    </div>

    <div className="pt-10">
      <h3 className="text-xl pb-4">What level of experience will it need?</h3>
      <div className="grid grid-cols-3 gap-4">
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="experience"
          value="entry"
          state={state}
        >
          Entry
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="experience"
          value="intermediate"
          state={state}
        >
          Intermediate
        </WizardOption>
        <WizardOption
          handleOptionChange={handleOptionChange}
          parentkey="scope"
          nestedkey="experience"
          value="expert"
          state={state}
        >
          Expert
        </WizardOption>
      </div>
    </div>
  </div>
)

export default WizardScopeFlow
