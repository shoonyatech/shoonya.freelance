import { ApolloProvider } from '@apollo/client'
import React from 'react'

import GetApolloClient from '../../../apis/apollo.client'
import FeedbackPanel from '.'

export default {
  title: 'FeedbackPanel',
  component: FeedbackPanel,
}
const client = GetApolloClient('/api/graphql')

const Template = () => (
  <ApolloProvider client={client}>
    <FeedbackPanel />
  </ApolloProvider>
)

export const Default = Template.bind({})
