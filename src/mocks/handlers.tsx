/* eslint-disable import/prefer-default-export */

import { graphql } from 'msw'

export const handlers = [
  graphql.query('Projects', (req, res, ctx) =>
    res(
      ctx.data({
        projects: [
          {
            name: 'react',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'low',
          },
          {
            name: 'angular',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'medium',
          },
          {
            name: 'vue',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'high',
          },
        ],
      })
    )
  ),
  graphql.query('Freelancer', (req, res, ctx) =>
    res(
      ctx.data({
        freelancer: [
          {
            id: 1,
            name: 'react',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'low',
          },
          {
            id: 2,
            name: 'angular',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'medium',
          },
          {
            id: 3,
            name: 'vue',
            description: 'some desc some desc some dessc',
            __typename: 'Projects',
            priceRange: 'high',
          },
        ],
      })
    )
  ),
]
