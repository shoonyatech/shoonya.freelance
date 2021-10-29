import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import NestedList from './nestedList'

const useStyle = makeStyles((theme) => ({
  heading: {
    width: '142px',
    height: '20px',
    fontWeight: 500,
    fontSize: '14px',
    color: '#393D46',
  },
  subHeading: {
    width: '123px',
    height: '14px',
    fontSize: '12px',
    color: '#5C6170',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mainHeading: {
    marginLeft: 110,
    marginTop: 50,
    fontWeight: 600,
    fontSize: '24px',
    color: '#1D4E86',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  },
  boxComponent: {
    marginLeft: 110,
    marginTop: '-1px',
    background: '#FFFFFF',
    marginRight: '100px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 11,
      justifyContent: 'space-evenly',
      marginRight: '0',
      marginTop: '-13px',
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '220px',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      height: '283px',
    },
  },
  boxHeading: {
    marginLeft: '20px',
    marginTop: '10px',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      display: 'none',
    },
  },
  innerHeader: {
    marginLeft: 110,
    marginTop: 30,
    height: '26px',
    fontSize: '14px',
    color: '#0468DB',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  },
  component: {
    display: 'flex',
    marginTop: '15px',
  },
  image: {
    width: '212px',
    height: '139px',
    marginLeft: '17px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '70px',
      height: '70px',
    },
  },
  imageContainer: {
    background: '#FFFFFF',
    marginLeft: 110,
    width: '245px',
    height: '190px',
    borderRadius: '6px',
    borderBottomLeftRadius: 0,
    border: '1px solid #D6DDE6',
    borderTop: '4px solid #0468DB',
    borderBottom: '0px solid #FFFFFF',
    [theme.breakpoints.down('sm')]: {
      borderTop: 'none',
      width: '105px',
      height: '120px',
      marginLeft: 10,
    },
  },
  imageContainer1: {
    background: '#FFFFFF',
    marginLeft: 20,
    marginTop: 12,
    width: '245px',
    height: '170px',
    borderRadius: '6px',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      background: 'none',
      width: '75px',
      height: '120px',
      marginLeft: 0,
    },
  },
  imageHeading: {
    marginLeft: 18,
    marginTop: 7,
    width: '53px',
    height: '20px',
    fontWeight: 500,
    fontSize: '14px',
    color: '#393D46',
    [theme.breakpoints.down('sm')]: {
      color: '#1D4E86',
    },
  },
  imageHeading1: {
    marginLeft: 18,
    marginTop: 7,
    width: '53px',
    height: '20px',
    fontWeight: 500,
    fontSize: '14px',
    color: '#393D46',
    [theme.breakpoints.down('sm')]: {
      color: '#1D4E86',
      marginTop: 0,
    },
  },
  home: {
    width: '210px',
    height: '120px',
    marginLeft: '17px',
    marginTop: '5px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
      marginLeft: '10px',
      marginTop: '2px',
    },
  },
  categories: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'inherit',
    },
  },
}))

function Products() {
  const classes = useStyle()
  return (
    <>
      <Typography className={classes.mainHeading}>Discover wholesale products</Typography>
      <Box className={classes.component}>
        <Box className={classes.imageContainer}>
          <Typography className={classes.imageHeading}>Fashion</Typography>
          <img
            className={classes.image}
            src="https://s3-alpha-sig.figma.com/img/9882/cbcf/9126b428ab80d057a9b316611626367b?Expires=1635724800&Signature=U4WwTAKakbTjR3BE3Ubtg55XkUSfGiMfprWYJvjuHMN4TH1Avzd12yzjQ17NjBbgZVdoalPnULMnJzBc-4xAfpHj1Pb4X2B9C9PWiApxlTsRkv6w5migEtDlnfKCs4H0-Je4rHj0CiXqZtXDjG-C3yldw8SuoZYFuYI485xStqpq5DaRRfzv5ca1HHeN3xEQ5p6rgUIpWkCCGx~JpLwIKZrlANY1rzRcyw55oOrU7F2KEMVodnih3ejCDDQZ3-TnGMdoZ71nPHPIA7hf~Z86aYwmEuKE1CTOhE3XI4C0oLEoFeTmgCwnBNDXq5OwKAPIn~98jLDYH28Rz~w4cIuTpQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
        </Box>
        <Box className={classes.imageContainer1}>
          <Typography className={classes.imageHeading1}>Home</Typography>
          <img
            className={classes.home}
            src="https://s3-alpha-sig.figma.com/img/a653/6915/377c68224a71171f12c16da7fe14eb5f?Expires=1635724800&Signature=fuZZKcZTmxQQfGHrYKK9lUm8~vlhvaUDi0wGqzLPccncHBZHbPXVPcJF4a9KliCCPwjfmv7WN5JM-2WiHcSOCTq9PKGtQMvs700HwBNKxwFdEfQl~tPzo3OGRHyjDEYnVkQCSAHplFFz4veJEpISad5SG0wxOuPy0h-CUpVNcH-3EAPWWD9v-uWmISDyyx0CtPKo-d3Wadmmg9WbbT--BgA22paUYUrrFWG4ELCZ0Fp6RpC3c6EtaGc-wDcYzv1fhElGRtidJPyoghdeOtoqA~wBcfnmi3swTJu7egNXS0YwW--V14LiN-taYCW6TpoFK3j6c6V3s83ZPxfwz1ph1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
        </Box>
        <Box className={classes.imageContainer1}>
          <Typography className={classes.imageHeading1}>Food</Typography>
          <img
            className={classes.home}
            src="https://s3-alpha-sig.figma.com/img/ad53/ad8d/a1addba67eb0503c73941c1ea0d3b1d6?Expires=1635724800&Signature=XLPKJrytGDnd8aaGIEvFc2CgqDIx6tfH2baQwExRXXtw9o2cW5oskz3QWKwXoWgICydomCFq-QOzi4ikWMOAEqQxJ7Cq0Xg5OKjmDAaO~73FE1cRJdas2YO-zDT-rPwnCZM8e9VDhYMGasgRw2NHy7uyAW5-HIs7hyRjklTjloU6ENkImoNnjTbbUjPu0ug2mJYFiJeLPeBTd-rpuA6DYEqGoNLYwMtn20PDTbwznRC6C-sllzp4ntUyXbgahlROx1lpsVWb382aYjifFSBcxOiv~SsoxoW9ndm8FoPGA~0bKKDNTQQOkYVxI0Z~wC-~jQjzhVzUBos1-vRpb0--cg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
        </Box>
      </Box>
      <Box className={classes.boxComponent}>
        <Box className={classes.box}>
          <Box className={classes.categories}>
            <NestedList />
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Topwear</Typography>
            <Typography className={classes.subHeading}>T-Shirts</Typography>
            <Typography className={classes.subHeading}>Casual Shirts</Typography>
            <Typography className={classes.subHeading}>Formal Shirts</Typography>
            <Typography className={classes.subHeading}>Sweatshirts</Typography>
            <Typography className={classes.subHeading}>Sweaters</Typography>
            <Typography className={classes.subHeading}>Jackets</Typography>
            <Typography className={classes.subHeading}>Blazers & Coats</Typography>
            <Typography className={classes.subHeading}>Suits</Typography>
            <Typography className={classes.subHeading}>Rain Jackets</Typography>
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Bottomwear</Typography>
            <Typography className={classes.subHeading}>Jeans</Typography>
            <Typography className={classes.subHeading}>Casual Trousers</Typography>
            <Typography className={classes.subHeading}>Formal Trousers</Typography>
            <Typography className={classes.subHeading}>Shorts</Typography>
            <Typography className={classes.subHeading}>Track Pants & Joggers</Typography>
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Indian & festival Wear</Typography>
            <Typography className={classes.subHeading}>Kurtas & Kurta Sets</Typography>
            <Typography className={classes.subHeading}>Sherwanis</Typography>
            <Typography className={classes.subHeading}>Nehru Jackets</Typography>
            <Typography className={classes.subHeading}>Dhotis</Typography>
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Sports Active Wear</Typography>
            <Typography className={classes.subHeading}>Sports Shoes</Typography>
            <Typography className={classes.subHeading}>Sports Sandals</Typography>
            <Typography className={classes.subHeading}>Active T-Shirts</Typography>
            <Typography className={classes.subHeading}>Track Pants & Shorts</Typography>
            <Typography className={classes.subHeading}>Tracksuits</Typography>
            <Typography className={classes.subHeading}>Jackets & Sweatshirts</Typography>
            <Typography className={classes.subHeading}>Sports Accessories</Typography>
            <Typography className={classes.subHeading}>Swimwear</Typography>
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Bottom Wear</Typography>
            <Typography className={classes.subHeading}>Jeans</Typography>
            <Typography className={classes.subHeading}>Casual Trousers</Typography>
            <Typography className={classes.subHeading}>Formal Trousers</Typography>
            <Typography className={classes.subHeading}>Shorts</Typography>
            <Typography className={classes.subHeading}>Track pants & Joggers</Typography>
          </Box>
          <Box className={classes.boxHeading}>
            <Typography className={classes.heading}>Indian & Festival Wear</Typography>
            <Typography className={classes.subHeading}>Kurtas & Kurta Sets</Typography>
            <Typography className={classes.subHeading}>Sherwanis</Typography>
            <Typography className={classes.subHeading}>Nehru Jackets</Typography>
            <Typography className={classes.subHeading}>Dhotis</Typography>
          </Box>
        </Box>
      </Box>
      <Typography className={classes.innerHeader}>
        Can’t find what you’re looking for? Suggest a category {'>'}
      </Typography>
    </>
  )
}

export default Products
