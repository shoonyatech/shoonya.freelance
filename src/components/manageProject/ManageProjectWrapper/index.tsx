/* eslint-disable arrow-body-style */
import React from 'react'

import SliderContainer from '../../common/Slider'
import ProjectProposal from '../../project/apply/ProjectProposal'
import ManageProject from '../ManageProject'

const ManageProjectWrapper = ({ data, isOwner, slider, closeSlider }) => {
  return (
    <div>
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
