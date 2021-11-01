import { ApolloProvider } from '@apollo/client'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import Feedback from '.'

export default {
  title: 'Feedback',
  component: Feedback,
}

const client = GetApolloClient('/api/graphql')
const Template = () => (
  <ApolloProvider client={client}>
    <Feedback />
  </ApolloProvider>
)

export const Default = Template.bind({})
