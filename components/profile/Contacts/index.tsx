import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
 
const Contacts = () => {
  const [edit, setEdit] = useState(true)

  return (
    <div className="px-6">
      <div className="pb-3">CONTACTS</div>

      {edit ? (
        <div>
          <TextField size="small" label="location" color="secondary" margin="dense" variant="outlined" />
          <TextField label="phone" color="secondary" margin="dense" variant="outlined" />
          <TextField size="medium" label="mail" color="secondary" margin="dense" variant="outlined" />
          <TextField label="linkedin" color="secondary" margin="dense" variant="outlined" />
          <TextField label="github" color="secondary" margin="dense" variant="outlined" />
          <TextField label="twitter" color="secondary" margin="dense" variant="outlined" />
        </div>
      ) : (
        <ul className="list-none">
          <li className="pb-1">Vancouver , Cannada</li>
          <li className="pb-1">+ 778-939-4992</li>
          <li className="pb-1">souvikbasu@gmail.com</li>
          <li className="pb-1">linked.com/in/souvik-basu</li>
          <li className="pb-1">github.com/souvik-basu</li>
          <li className="pb-1">twitter.com/souvikbasu</li>
        </ul>
      )}
    </div>
  )
}

export default Contacts
