import Button from '@mui/material/Button'
import Link from 'next/link'
import React from 'react'

const SeeProposals = ({ projectId }) => (
  <Link href={`/projects/${projectId}/proposals`} passHref>
    <Button sx={{ marginRight: '0.5rem' }} variant="contained" color="primary">
      See proposals
    </Button>
  </Link>
)

export default SeeProposals
