import React from 'react'

import Avatar from '../Avatar'
import UserNameTitle from '../UserNameTitle'

const Heading = ({ data, display, userId }) => (
  <div className="lg:grid lg:grid-cols-profile">
    <UserNameTitle data={data} display={display} userId={userId} />
    <Avatar data={data} display={display} userId={userId} />
  </div>
)

export default Heading
