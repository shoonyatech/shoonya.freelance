/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react'
import React from 'react'

import IconList from '.'

export default {
  component: IconList,
  title: 'IconList',
} as Meta

const Template: Story = (args) => <IconList {...args} />
export const DefaultOutlined = Template.bind({})

DefaultOutlined.args = {
  iconArr: ['react', 'agile'],
  displayIcon: true,
}
