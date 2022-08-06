/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react'
import React from 'react'

import SkillIconPickor from '.'

export default {
  component: SkillIconPickor,
  title: 'SkillIconPickor',
} as Meta
// @ts-ignore
const Template: Story = (args) => <SkillIconPickor {...args} />
export const Default = Template.bind({})

Default.args = {
  displayIcon: true,
  isActive: true,
  closeIconPickor: undefined,
  selectedIcons: [],
  handleSkillChange: undefined,
}

export const DisplayIcons = Template.bind({})
DisplayIcons.args = {
  ...Default.args,
}

export const HideIcons = Template.bind({})
HideIcons.args = {
  ...Default.args,
  displayIcon: false,
}
