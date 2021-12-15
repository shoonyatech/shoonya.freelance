import {
  SiAndroid,
  SiAngular,
  SiApollographql,
  SiAuth0,
  SiCsharp,
  SiJavascript,
  SiNetlify,
  SiPython,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'

export const icons = {
  'react': <SiReact size="2em" color="#00D1F7" />,
  'android': <SiAndroid size="2em" color="#35D47D" />,
  'angular': <SiAngular size="2em" color="#BD002E" />,
  'apollographql': <SiApollographql size="2em" color="#102A47" />,
  'auth0': <SiAuth0 size="2em" />,
  'netlify': <SiNetlify size="2em" color="#4DB1B0" />,
  'javascript': <SiJavascript size="2em" color="#F0DB4F" />,
  'python': <SiPython size="2em" />,
  'tailwindcss': <SiTailwindcss size="2em" color="#07B0CE" />,
  'csharp': <SiCsharp size="2em" color="#9C75D5" />,
  'agile': null
}

export const iconsList = Object.keys(icons)