import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'

const Bio = () => 
{
  const [edit, setEdit] = useState(false)
  
  return (
  <div className="p-6">
    {edit ? 
      <TextField
      id="outlined-multiline-static"
      label="Bio"
      multiline
      rows={4}
      variant="outlined"
      color="secondary"
      fullWidth
    /> :
    <div>
      18 years of experience in Software development using JavaScript, .Net technologies and Python in various domains like Fintech, Speech and Multilingual Technologies, Network and Platform Security, Telecom and Travel.
<br />
Key Skills: React, Angular, Vue, JavaScript, C#
      </div>
  }
  </div>
)}
export default Bio
