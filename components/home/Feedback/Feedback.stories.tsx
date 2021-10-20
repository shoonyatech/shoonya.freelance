import { ApolloProvider } from '@apollo/client'
import React from 'react'

import client from '../../../apis/apollo.client'
import Feedback from '.'

export default {
  title: 'Feedback',
  component: Feedback,
}

const Template = () => (
  <ApolloProvider client={client}>
    <Feedback />
  </ApolloProvider>
)

export const Default = Template.bind({})
