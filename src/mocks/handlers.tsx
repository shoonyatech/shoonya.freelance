/* eslint-disable import/prefer-default-export */

import { graphql } from 'msw'

import freelancers from '../../components/profile/FreelancerCard/mockdata'

export const handlers = [
  graphql.query('getFreelancers', (req, res, ctx) =>
    res(
      ctx.data({
        freelancers,
      })
    )
  ),
]
