/* eslint-disable arrow-body-style */
import React, { useState } from 'react'

import WizardFlow from '../WizardFlow'
import WizardInfo from '../WizardInfo'

const WizardWrapper = () => {
  const [step, setSteps] = useState<number>(1)

  const incrStep = () => setSteps(step + 1)
  const decrStep = () => setSteps(step - 1)

  return (
    <div className="min-h-screen w-full max-w-5xl mx-auto w-full flex">
      <WizardInfo step={step} />
      <WizardFlow step={step} incrStep={incrStep} decrStep={decrStep} />
    </div>
  )
}

export default WizardWrapper
