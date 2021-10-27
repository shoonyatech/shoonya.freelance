/* eslint-disable react/button-has-type */
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  image: {
    width: '500px',
    height: '380px',
    marginLeft: 110,
    borderRadius: '6px 0px 0px 6px',
    [theme.breakpoints.down('sm')]: {
      width: '350px',
      height: '216px',
      marginLeft: 0,
    },
  },
  text: {
    background: '#FFFFFF',
    marginTop: '60px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  component: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '60px',
    borderRadius: '6px',
  },
  list: {
    display: 'flex',
    margin: '20px 30px 0 30px',
    color: '#454954',
    listStyle: 'inherit',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      marginLeft: '66px',
      marginTop: '30px',
    },
  },
  head1: {
    marginLeft: 30,
    width: '576px',
    height: '64px',
    fontWeight: 'bold',
    fontSize: '48px',
    color: '#393D46',
    [theme.breakpoints.down('sm')]: {
      width: '400px',
      fontSize: '27px',
      marginLeft: 0,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  head2: {
    marginLeft: 30,
    width: '576px',
    height: '40px',
    fontWeight: 500,
    fontSize: '16px',
    color: '#0468DB',
    [theme.breakpoints.down('sm')]: {
      marginTop: '-15px',
      width: '331px',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  head3: {
    marginLeft: 30,
    width: '539px',
    height: '40px',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    color: '#393D46',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '276px',
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  listSpace: {
    marginLeft: '25px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  button: {
    marginTop: '20px',
    marginLeft: 30,
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      marginLeft: 50,
      marginRight: 50,
    },
  },
  button1: {
    border: '1px solid #0468DB',
    padding: '8px',
    minWidth: '290px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
  },
  button2: {
    marginLeft: '20px',
    border: '1px solid #27AE60',
    minWidth: '290px',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  qualityList: {
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      listStyle: 'inherit',
    },
  },
}))
function Content() {
  const classes = useStyle()
  return (
    <div className={classes.div}>
      <div className={classes.component}>
        <img
          className={classes.image}
          src="https://s3-alpha-sig.figma.com/img/afe1/d4c4/f16fbf7d136b918d71008adbca0eeac9?Expires=1635724800&Signature=XOsd1HqgA03EqSQ2faR0w102W5NdjJgxxYglCeOGXpN5hO1FP1LluwS7A~HhH8qKeb-ySAqMyMQRLJjNuMRgayxmsD7lNT7D3W7Tgt8u4i-e~XkFJ06PdeeQOIfB6EMMu0NiF-K7ye69-lu-3axOT1Dri3XZxf-NcgJndy8LK7PeGIJTbrv8cnuqFpZGs-opvVfbW~8I98Xd5cldE2Y311FPzweYLlg3gW9zRp9Bqu~m0b6yAR2V3sSdhDPbRuMP3XAmzfTmDnWWmNN7XXg89lCTIp1ZB1VaLMF9lK8KfK5ovZjl2dD1dDLxQJQPlq6Z2xPWd4zD4YTLqtbaEvHrEg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          alt=""
        />
      </div>
      <div className={classes.text}>
        <Box>
          <Typography className={classes.head1}>Global Trade Made Local.</Typography>
          <Typography className={classes.head2}>
            Get thousands of wholesale products for your business from verified suppliers in India in a few clicks!
          </Typography>
          <Typography className={classes.head3}>
            A cross-border B2B digital sourcing platform to source world class products from India.
          </Typography>
          <ul className={classes.list}>
            <li className={classes.qualityList}>100% Quality Assured</li>
            <li className={classes.listSpace}>Verified Suppliers</li>
            <li className={classes.listSpace}>Fast worldwide shipping</li>
            <li className={classes.listSpace}>Wholesale Prices</li>
          </ul>
          <div className={classes.button}>
            <Button className={classes.button1}>Explore Ready to Ship Products</Button>
            <Button className={classes.button2}>Customise Products</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Content
