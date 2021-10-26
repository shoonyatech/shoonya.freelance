/* eslint-disable react/self-closing-comp */
import { Box, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'

const useStyle = makeStyles((theme) => ({
  component: {
    display: 'grid',
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
    display: 'flex',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '-15px',
  },
  imageContainer1: {
    display: 'flex',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '-15px',
  },
  imageHeading: {
    marginLeft: 10,
    marginTop: 10,
    width: '53px',
    height: '30px',
    fontWeight: 500,
    fontSize: '18px',
    color: '#1D4E86',
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
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
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
  },
  expand: {
    position: 'absolute',
    right: 5,
  },
}))

export default function NestedList() {
  const classes = useStyle()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <Box className={classes.logoHead}>
        <div className={classes.logo1}></div>
        <div>
          <Typography className={classes.logo}>Tradyl</Typography>
        </div>
        <div>
          <Typography style={{ fontSize: '10px', position: 'absolute', right: 25, marginTop: '-13px' }}>
            <ClearIcon />
          </Typography>
        </div>
      </Box>
      <div>
        <Typography className={classes.heading}>Categories</Typography>
      </div>
      <List>
        <ListItemButton style={{ padding: 0 }} onClick={handleClick}>
          <Box className={classes.imageContainer}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/9882/cbcf/9126b428ab80d057a9b316611626367b?Expires=1635724800&Signature=U4WwTAKakbTjR3BE3Ubtg55XkUSfGiMfprWYJvjuHMN4TH1Avzd12yzjQ17NjBbgZVdoalPnULMnJzBc-4xAfpHj1Pb4X2B9C9PWiApxlTsRkv6w5migEtDlnfKCs4H0-Je4rHj0CiXqZtXDjG-C3yldw8SuoZYFuYI485xStqpq5DaRRfzv5ca1HHeN3xEQ5p6rgUIpWkCCGx~JpLwIKZrlANY1rzRcyw55oOrU7F2KEMVodnih3ejCDDQZ3-TnGMdoZ71nPHPIA7hf~Z86aYwmEuKE1CTOhE3XI4C0oLEoFeTmgCwnBNDXq5OwKAPIn~98jLDYH28Rz~w4cIuTpQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.imageHeading}>Fashion</Typography>
          </Box>
          {open ? <ExpandLess className={classes.expand} /> : <ExpandMore className={classes.expand} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <List component="div" disablePadding>
              <ListItemButton style={{ padding: 0, marginLeft: 20 }}>
                <Box className={classes.text}>
                  <ListItemText>
                    Topwear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                  <ListItemText>
                    Bottomwear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                  <ListItemText>
                    Indian & Festival Wear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                  <ListItemText>
                    Sports Active Wear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                  <ListItemText>
                    Casual Wear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                  <ListItemText>
                    Ethnic Wear
                    <AddIcon className={classes.expand} />
                  </ListItemText>
                </Box>
              </ListItemButton>
            </List>
          </Box>
        </Collapse>
        <ListItemButton style={{ padding: 0 }} onClick={handleClick}>
          <Box className={classes.imageContainer1}>
            <img
              className={classes.home}
              src="https://s3-alpha-sig.figma.com/img/a653/6915/377c68224a71171f12c16da7fe14eb5f?Expires=1635724800&Signature=fuZZKcZTmxQQfGHrYKK9lUm8~vlhvaUDi0wGqzLPccncHBZHbPXVPcJF4a9KliCCPwjfmv7WN5JM-2WiHcSOCTq9PKGtQMvs700HwBNKxwFdEfQl~tPzo3OGRHyjDEYnVkQCSAHplFFz4veJEpISad5SG0wxOuPy0h-CUpVNcH-3EAPWWD9v-uWmISDyyx0CtPKo-d3Wadmmg9WbbT--BgA22paUYUrrFWG4ELCZ0Fp6RpC3c6EtaGc-wDcYzv1fhElGRtidJPyoghdeOtoqA~wBcfnmi3swTJu7egNXS0YwW--V14LiN-taYCW6TpoFK3j6c6V3s83ZPxfwz1ph1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.imageHeading}>Home</Typography>
          </Box>
          {open ? <ExpandLess className={classes.expand} /> : <ExpandMore className={classes.expand} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton style={{ padding: 0, marginLeft: 20 }}>
              <Box className={classes.text}>
                <ListItemText>
                  Furniture
                  <AddIcon className={classes.expand} />
                </ListItemText>
                <ListItemText>
                  Utensils
                  <AddIcon className={classes.expand} />
                </ListItemText>
                <ListItemText>
                  Beds
                  <AddIcon className={classes.expand} />
                </ListItemText>
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton style={{ padding: 0 }} onClick={handleClick}>
          <Box className={classes.imageContainer1}>
            <img
              className={classes.home}
              src="https://s3-alpha-sig.figma.com/img/ad53/ad8d/a1addba67eb0503c73941c1ea0d3b1d6?Expires=1635724800&Signature=XLPKJrytGDnd8aaGIEvFc2CgqDIx6tfH2baQwExRXXtw9o2cW5oskz3QWKwXoWgICydomCFq-QOzi4ikWMOAEqQxJ7Cq0Xg5OKjmDAaO~73FE1cRJdas2YO-zDT-rPwnCZM8e9VDhYMGasgRw2NHy7uyAW5-HIs7hyRjklTjloU6ENkImoNnjTbbUjPu0ug2mJYFiJeLPeBTd-rpuA6DYEqGoNLYwMtn20PDTbwznRC6C-sllzp4ntUyXbgahlROx1lpsVWb382aYjifFSBcxOiv~SsoxoW9ndm8FoPGA~0bKKDNTQQOkYVxI0Z~wC-~jQjzhVzUBos1-vRpb0--cg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.imageHeading}>Food</Typography>
          </Box>
          {open ? <ExpandLess className={classes.expand} /> : <ExpandMore className={classes.expand} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton style={{ padding: 0, marginLeft: 20 }}>
              <Box>
                <ListItemText>
                  Non-veg
                  <AddIcon className={classes.expand} />
                </ListItemText>
                <ListItemText>
                  Veg
                  <AddIcon className={classes.expand} />
                </ListItemText>
                <ListItemText>
                  Sea food
                  <AddIcon className={classes.expand} />
                </ListItemText>
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Box style={{ marginTop: '85px' }}>
        <Typography className={classes.quote}>Get a quotation directly from the supplier</Typography>
        <Typography className={classes.request}>Request for Quote {'-->'}</Typography>
      </Box>
    </Box>
  )
}
