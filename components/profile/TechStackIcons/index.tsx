import { IconButton } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import CancelIcon from '@material-ui/icons/Cancel'
import React from 'react'
import {
  SiAndroid,
  SiAngular,
  SiApollographql,
  SiAuth0,
  SiCsharp,
  SiJavascript,
  SiMaterialUi,
  SiNetlify,
  SiNextDotJs,
  SiPython,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'

const icons = [
  { name: 'react', icon: <SiReact size="2em" color="#00D1F7" /> },
  { name: 'android', icon: <SiAndroid size="2em" color="#35D47D" /> },
  { name: 'angular', icon: <SiAngular size="2em" color="#BD002E" /> },
  { name: 'apollographql', icon: <SiApollographql size="2em" color="#102A47" /> },
  { name: 'auth0', icon: <SiAuth0 size="2em" /> },
  { name: 'netlify', icon: <SiNetlify size="2em" color="#4DB1B0" /> },
  { name: 'nextdotjs', icon: <SiNextDotJs size="2em" /> },
  { name: 'javascript', icon: <SiJavascript size="2em" color="#F0DB4F" /> },
  { name: 'python', icon: <SiPython size="2em" /> },
  { name: 'materilui', icon: <SiMaterialUi size="2em" color="#007DC5" /> },
  { name: 'tailwindcss', icon: <SiTailwindcss size="2em" color="#07B0CE" /> },
  { name: 'csharp', icon: <SiCsharp size="2em" color="#9C75D5" /> },
]

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
    },
  })
)

const TechStackIcons = ({ closeTechStackPickor }) => {
  const classes = useStyles()
  return (
    <div className="flex flex-col max-h-60 w-80 bg-white shadow-lg rounded absolute top-10 z-20">
      <IconButton onClick={() => closeTechStackPickor()} className={classes.btn}>
        <CancelIcon />
      </IconButton>
      <div className="flex flex-wrap p-4">
        {icons.map((icon) => (
          <div className="p-0.5" key={icon.name}>
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
export default TechStackIcons
