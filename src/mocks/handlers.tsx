/* eslint-disable import/prefer-default-export */

import { graphql } from 'msw'

export const handlers = [
  graphql.query('Freelancer', (req, res, ctx) =>
    res(
      ctx.data({
        freelancer: [
          {
            id: 1,
            name: 'Souvik Basu',
            skills: ['React', ' Vue', ' Angular'],
            experience: 18,
            rate: 500,
            currency: 'INR',
            image: 'https://pbs.twimg.com/profile_images/1439826328493068288/IyDqiBVT_400x400.jpg',
          },
        ],
      })
    )
  ),
]
