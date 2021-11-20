/* eslint-disable arrow-body-style */
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'

import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import ManageProject from '../ManageProject'

const ManageProjectWrapper = ({ data, isOwner }) => {
  const [slider, setSlider] = useState(false)
  const closeSlider = () => {
    setSlider(false)
  }
  return (
    <div>
      <div className="max-w-5xl mx-auto w-full flex justify-end">
        {isOwner ? null : (
          <Button onClick={() => setSlider(true)} variant="contained" color="primary">
            Apply
          </Button>
        )}
      </div>
      <ManageProject data={data} isReadOnly={!isOwner} />
      {slider ? (
        <SliderContainer closeSlider={closeSlider} openOrCloseSlider={slider}>
          <ProjectProposal closeSlider={closeSlider} />
        </SliderContainer>
      ) : null}
    </div>
  )
}

export default ManageProjectWrapper
