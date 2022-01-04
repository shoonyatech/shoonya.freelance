/* eslint-disable react/jsx-props-no-spreading */
import { Meta, Story } from '@storybook/react'
import React from "react"

import ProjectStrip from '.'

export default {
    title: 'ProjectStrip',
    component: ProjectStrip,
} as Meta

const Template: Story = (args) => <ProjectStrip  {...args} />

export const Default = Template.bind({})

Default.args = {
    href: '/',
    title: 'React project',
    skills: ['react'],
    budgetLevel: '$'
}
