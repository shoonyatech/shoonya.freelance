/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react'
import React from 'react'

import BudegtFilter from '.'

export default {
  title: 'BudegtFilter',
  component: BudegtFilter,
} as Meta

const Template: Story = (args) => <BudegtFilter {...args} />

export const Default = Template.bind({})

Default.args = {
  label: 'label',
}

export const Hourly = Template.bind({})

Hourly.args = {
  label: 'Hourly pay',
}
