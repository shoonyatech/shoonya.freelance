import React from 'react'

import Footer from '../Footer'
import TabsMobileMode from '../TabsMobileMode'

function Bottom({ user }: any) {
  return <>{user ? <TabsMobileMode /> : <Footer />}</>
}

export default Bottom
