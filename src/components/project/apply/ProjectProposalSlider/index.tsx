import React from 'react'

import SliderContainer from '../../../common/Slider'
import ProjectProposal from '../ProjectProposal'

const ProjectProposalSlider = ({ closeSlider, slider }) => (
  <>
    {slider ? (
      <SliderContainer closeSlider={closeSlider} openOrCloseSlider={slider}>
        <ProjectProposal closeSlider={closeSlider} />
      </SliderContainer>
    ) : null}
  </>
)

export default ProjectProposalSlider
