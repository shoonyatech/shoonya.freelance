import { Meta } from '@storybook/react'
import React from 'react'

import NavBar from '.'

export default {
  title: 'Header',
  component: NavBar,
} as Meta

export const LogIn: React.VFC<{}> = () => <NavBar />
