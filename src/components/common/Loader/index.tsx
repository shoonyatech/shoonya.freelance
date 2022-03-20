import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

const Loader = ({ open, error = false }: any) => (
  <div>
    {open !== undefined || error !== undefined ? (
      <Backdrop open={open}>
        {open ? <CircularProgress size={60} color="primary" /> : null}
        {error ? error.message : null}
      </Backdrop>
    ) : null}
  </div>
)

export default Loader
