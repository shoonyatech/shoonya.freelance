import React from 'react'

const WizardProgressBar = ({ step }) => (
  <>
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-skillbarempty">
        <div
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-skillbarfilled w-${step}/4`}
        />
      </div>
    </div>
    <div className="grid grid-cols-4">
      <div className={`${step === 1 && 'text-skillbarfilled'}`}>Headline</div>
      <div className={`${step === 2 && 'text-skillbarfilled'}`}>Skills</div>
      <div className={`${step === 3 && 'text-skillbarfilled'}`}>Scope</div>
      <div className={`${step === 4 && 'text-skillbarfilled'}`}>Budget</div>
    </div>
  </>
)

export default WizardProgressBar
