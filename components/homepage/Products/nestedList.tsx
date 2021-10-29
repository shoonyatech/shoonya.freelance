/* eslint-disable react/self-closing-comp */
import { Box, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'

const useStyle = makeStyles((theme) => ({
  component: {
    display: 'flex',
  },
  image: {
    width: '212px',
    height: '139px',
    marginLeft: '17px',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    },
  },
  imageContainer: {
    marginBottom: '15px',
    marginTop: '25px',
    marginLeft: '-15px',
  },
  imageContainer1: {
    display: 'grid',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '-15px',
  },
  imageHeading: {
    marginLeft: 25,
    height: '0px',
    fontWeight: 500,
    color: '#393D46',
  },
  home: {
    width: '210px',
    height: '120px',
    marginLeft: '17px',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
      marginLeft: '17px',
    },
  },
  logoHead: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    background: '#FFFFFF',
    marginLeft: '0px',
    justifyContent: 'space-between',
    borderBottom: '1px solid #d8d8d8',
  },
  logo: {
    color: '#002BF5',
    fontWeight: 700,
    width: '70px',
    height: '24px',
    fontSize: '18px',
    marginLeft: '-130px',
    textTransform: 'uppercase',
  },
  logo1: {
    background: '#002BF5',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'inline',
  },
  heading: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#393D46',
    marginTop: '30px',
  },
  quote: {
    fontWeight: 500,
    fontSize: '16px',
    color: '#454954',
  },
  request: {
    fontSize: '16px',
    color: '#1D4E86',
  },
  text: {
    display: 'grid',
    height: '320px',
    marginTop: '25px',
    marginLeft: '10px',
    color: '#5C6170',
  },
  expand: {
    position: 'absolute',
    right: '-180px',
  },
  box: {
    display: 'flex',
    height: '550px',
  },
}))

export default function NestedList() {
  const classes = useStyle()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box className={classes.box}>
      <List>
        <ListItemButton style={{ padding: 0 }} onClick={handleClick}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>Topwear</Typography>
            <AddIcon className={classes.expand} />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <List component="div" disablePadding>
                  <ListItemButton style={{ padding: 0, marginLeft: 20 }}>
                    <Box className={classes.text}>
                      <ListItemText>All</ListItemText>
                      <ListItemText>Tops</ListItemText>
                      <ListItemText>Bottoms</ListItemText>
                      <ListItemText>Dresses</ListItemText>
                      <ListItemText>Night Wear</ListItemText>
                      <ListItemText>Kurtis</ListItemText>
                      <ListItemText>Tops</ListItemText>
                      <ListItemText>Bottoms</ListItemText>
                      <ListItemText>Dresses</ListItemText>
                      <ListItemText>Night Wear</ListItemText>
                      <ListItemText>Kurtis</ListItemText>
                    </Box>
                  </ListItemButton>
                </List>
              </Box>
            </Collapse>
          </Box>
        </ListItemButton>
        <ListItemButton style={{ padding: 0 }}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>
              Ethnic Wear <AddIcon className={classes.expand} />
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton style={{ padding: 0 }}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>
              Bottomwear <AddIcon className={classes.expand} />
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton style={{ padding: 0 }}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>
              Indian & festival Wear <AddIcon className={classes.expand} />
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton style={{ padding: 0 }}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>
              Sports Active Wear <AddIcon className={classes.expand} />
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton style={{ padding: 0 }}>
          <Box className={classes.imageContainer}>
            <Typography className={classes.imageHeading}>
              Casual Wear <AddIcon className={classes.expand} />
            </Typography>
          </Box>
        </ListItemButton>
      </List>
    </Box>
  )
}
