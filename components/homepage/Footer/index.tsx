/* eslint-disable react/self-closing-comp */
import { Box, Button, InputBase, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  component: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  leftComponent: {
    display: 'grid',
    width: '528px',
    height: '450px',
    background: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      width: '411px',
    },
  },
  request: {
    marginTop: '20px',
    marginLeft: '20px',
    height: '32px',
    fontWeight: 600,
    fontSize: '24px',
    color: '#1D4E86',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  rightComponent: {
    display: 'grid',
    width: '733px',
    height: '450px',
    background: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  field: {
    width: '430px',
    height: '40px',
    border: '1px solid #D5D7DD',
    marginTop: '10px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '350px',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '25px',
    },
  },
  input: {
    marginLeft: '15px',
    fontSize: '14px',
    color: '#9DA2AF',
  },
  input1: {
    borderRadius: '6px 0 0 6px',
    marginLeft: '15px',
    fontSize: '14px',
    color: '#9DA2AF',
  },
  frequent: {
    marginTop: '20px',
    marginLeft: '20px',
    height: '32px',
    fontWeight: 600,
    fontSize: '24px',
    color: '#1D4E86',
  },
  question: {
    marginTop: '15px',
    marginLeft: '25px',
    fontWeight: 500,
    fontSize: '20px',
    color: '#5C6170',
  },
  answers: {
    marginTop: '15px',
    marginLeft: '20px',
    fontWeight: 500,
    fontSize: '18px',
    color: '#818898',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'normal',
      fontSize: '12px',
    },
  },
  search: {
    marginLeft: '20px',
    marginTop: '10px',
    width: '150px',
    height: '35px',
    backgroundColor: '#0468DB',
    fontSize: 18,
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      marginTop: '25px',
    },
  },
  search1: {
    backgroundColor: '#0468DB',
    fontSize: 12,
    color: '#FFFFFF',
    marginRight: '40px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  },
  button: {
    marginTop: '15px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#454954',
    marginLeft: '40px',
    borderBottom: '1px solid #0468DB',
    [theme.breakpoints.down('sm')]: {
      borderBottom: 'none',
      marginLeft: '10px',
    },
  },
  button1: {
    marginTop: '15px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#454954',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  heading: {
    width: '142px',
    height: '20px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#FFFFFF',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      fontWeight: 'normal',
      marginRight: '-15px',
    },
  },
  subHeading: {
    width: '123px',
    height: '14px',
    fontSize: '14px',
    color: '#FFFFFF',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      fontSize: '12px',
    },
  },
  subHeading1: {
    width: '123px',
    height: '14px',
    fontSize: '14px',
    color: '#FFFFFF',
    marginTop: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  view: {
    marginTop: '5px',
    marginLeft: '15px',
    width: '135px',
    height: '30px',
    fontWeight: 500,
    fontSize: '18px',
    color: '#0470EB',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px',
      fontSize: '12px',
      fontWeight: 'normal',
    },
  },
  more: {
    height: '12px',
    fontWeight: 500,
    fontSize: '16px',
    left: '80px',
    color: '#1D4E86',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      fontWeight: 'normal',
      left: '53px',
    },
  },
  services: {
    display: 'flex',
    height: '60px',
    fontWeight: 'bold',
    fontSize: '48px',
    color: '#393D46',
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px',
      marginLeft: '15px',
      padding: '15px',
    },
  },
  delivery: {
    display: 'flex',
    marginTop: '30px',
    height: '48px',
    fontSize: '18px',
    color: '#5C6170',
    marginLeft: '40px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      marginLeft: '16px',
    },
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '360px',
    background: '#95ACC6',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      height: '520px',
    },
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30px',
      display: 'flex',
    },
  },
  support: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30px',
      display: 'flex',
    },
  },
  border: {
    [theme.breakpoints.down('sm')]: {
      border: '1px solid rgba(157, 162, 175, 0.4)',
      height: '200px',
      marginRight: '15px',
      marginLeft: '15px',
    },
  },
  background: {
    marginTop: '40px',
    background: '#FCFCFC',
    height: '270px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginTop: '15px',
      background: '#FFFFFF',
      height: '377px',
    },
  },
  arrow: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inherit',
      position: 'sticky',
      color: '#393D46',
      fontSize: '20px',
      marginTop: '5px',
      marginLeft: '100px',
    },
  },
  mobFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '40px',
      display: 'flex',
    },
  },
  mobHeading: {
    width: '142px',
    height: '20px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#FFFFFF',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '40px',
      fontSize: '12px',
      fontWeight: 'normal',
      marginRight: '-15px',
    },
  },
  inputField: {
    marginTop: '40px',
    background: 'white',
    border: '1px solid #FFFFFF',
    borderRadius: '6px 0 0 6px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '40px',
      marginTop: '10px',
    },
  },
  fields: {
    marginTop: '-55px',
  },
  box: {
    marginTop: '40px',
    marginLeft: '10px',
    display: 'flex',
  },
  tradyl: {
    fontWeight: 800,
    fontSize: '20px',
    color: '#FFFFFF',
    marginLeft: '10px',
  },
  address: {
    width: '180px',
    marginTop: '40px',
    fontSize: '14px',
    color: '#FFFFFF',
    marginLeft: '-30px',
  },
  logo1: {
    marginLeft: '70px',
    background: '#002BF5',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
}))

function Footer() {
  const classes = useStyle()
  return (
    <>
      <div className={classes.component}>
        <Box className={classes.leftComponent}>
          <Typography className={classes.request}>Request for a quote</Typography>
          <div className={classes.fields}>
            <InputBase
              className={classes.field}
              inputProps={{ className: classes.input }}
              placeholder="Select your Country"
            />
            <InputBase
              className={classes.field}
              inputProps={{ className: classes.input }}
              placeholder="What are you looking for?"
            />
            <InputBase
              className={classes.field}
              inputProps={{ className: classes.input }}
              placeholder="Enter Email or phone number"
            />
            <InputBase
              className={classes.field}
              inputProps={{ className: classes.input }}
              placeholder="Enter the Quantity"
            />
            <Button className={classes.search}>Submit</Button>
          </div>
        </Box>
        <Box className={classes.rightComponent}>
          <Typography className={classes.frequent}>Frequently Asked Questions</Typography>
          <Typography className={classes.question}>{'>'} Difficulty in placing orders?</Typography>
          <Typography className={classes.answers}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In purus dui, scelerisque id orci vel, cursus
            commodo ante.
          </Typography>
          <Typography className={classes.question}>{'>'} Shipping related queries?</Typography>
          <Typography className={classes.answers}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In purus dui, scelerisque id orci vel, cursus
            commodo ante.{' '}
          </Typography>
          <Button className={classes.view}>View All</Button>
          <Button className={classes.more}>Any more questions? Talk to us {'-->'}</Button>
        </Box>
      </div>
      <div className={classes.background}>
        <Typography className={classes.services}>
          Tradyl Services
          <span className={classes.arrow}>
            {'<'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {'>'}
          </span>
        </Typography>
        <div className={classes.border}>
          <Button className={classes.button}>QC Partners</Button>
          <Button className={classes.button1}>Payment Partners</Button>
          <Button className={classes.button1}>Shipping partners</Button>
          <Typography className={classes.delivery}>
            Quality is delivered as assured. Consignments are delivered only when certified by SGS or Bureau Veritas.
          </Typography>
        </div>
      </div>
      <div className={classes.footer}>
        <Box className={classes.box}>
          <div className={classes.logo1}></div>
          <div>
            <Typography className={classes.tradyl}>Tradyl</Typography>
            <Typography className={classes.address}>
              Elephanteer Private Limited, Bengaluru,Karnataka, India Pin Code 560103
            </Typography>
          </div>
        </Box>
        <div className={classes.mobFooter}>
          <Box>
            <Typography className={classes.heading}>About</Typography>
            <Typography className={classes.subHeading}>Why Us</Typography>
            <Typography className={classes.subHeading1}>Blogs</Typography>
            <Typography className={classes.subHeading1}>Careers</Typography>
            <Typography className={classes.subHeading1}>Press</Typography>
          </Box>
          <Box>
            <Typography className={classes.heading}>Support</Typography>
            <Typography className={classes.subHeading}>Help Center</Typography>
            <Typography className={classes.subHeading1}>FAQ</Typography>
            <Typography className={classes.subHeading1}>Contact Us</Typography>
          </Box>
          <Box>
            <Typography className={classes.heading}>Browse</Typography>
            <Typography className={classes.subHeading}>Products</Typography>
            <Typography className={classes.subHeading1}>Suppliers</Typography>
            <Typography className={classes.subHeading1}>Collections</Typography>
          </Box>
        </div>
        <Box>
          <Typography className={classes.mobHeading}>Stay up to date</Typography>
          <InputBase
            className={classes.inputField}
            inputProps={{ className: classes.input1 }}
            placeholder="Sign up for emails"
          />
          <Button className={classes.search1}>Subscribe</Button>
        </Box>
      </div>
    </>
  )
}

export default Footer
