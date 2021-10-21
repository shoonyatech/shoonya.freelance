import React from 'react'

import Avatar from '../Avatar'
import UserNameTitle from '../UserNameTitle'

const Heading = ({ isReadOnly, userId }) => (
  <div className="lg:grid lg:grid-cols-profile">
    <UserNameTitle isReadOnly={isReadOnly} userId={userId} />
    <Avatar isReadOnly={isReadOnly} userId={userId} />
  </div>
)

export default Heading
