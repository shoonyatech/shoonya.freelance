import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  leftComponent: {
    width: '580px',
    height: '450px',
    padding: '20px',
    background: '#FFFFFF',
    borderRadius: '2px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      width: '412px',
      height: '280px',
      marginTop: '20px',
    },
  },
  step: {
    marginLeft: '15px',
    marginTop: '20px',
    fontWeight: 600,
    fontSize: '24px',
    height: '32px',
    color: '#0468DB',
  },
  premium: {
    width: '542px',
    height: '342px',
    borderRadius: '2px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '370px',
      height: '168px',
    },
  },
  left: {
    marginTop: '-20px',
    marginLeft: '-1px',
    position: 'absolute',
    width: '140px',
    height: '35px',
    backgroundColor: '#0468DB',
    borderRadius: '20px 0px 0px 0px',
  },
  launches: {
    width: '330px',
    height: '450px',
    background: '#FCFCFC',
    borderRadius: '2px',
    [theme.breakpoints.down('sm')]: {
      width: '410px',
    },
  },
  launches1: {
    width: '330px',
    height: '450px',
    background: '#FCFCFC',
    borderRadius: '2px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      width: '410px',
      marginTop: '25px',
    },
  },
  component: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  image: {
    width: '131px',
    height: '112px',
    border: '1px solid rgba(4, 104, 219, 0.2)',
    borderRadius: '5px',
  },
  header: {
    fontWeight: 600,
    fontSize: '20px',
    color: '#1D4E86',
    marginTop: '20px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '65px',
    },
  },
  subHeading: {
    widht: '60px',
    height: '20px',
    fontSize: '16px',
    color: '#393D46',
  },
  explore: {
    fontWeight: 500,
    fontSize: '12px',
    color: '#0468DB',
    marginTop: '35px',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '45px',
    },
  },
  imageContainer: {
    display: 'flex',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  imageDisplay: {
    marginLeft: '20px',
    marginRight: '10px',
  },
}))

function Launches() {
  const classes = useStyle()
  return (
    <div className={classes.component}>
      <Box className={classes.launches}>
        <Typography className={classes.header}>New Launches</Typography>
        <div className={classes.imageContainer}>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/acdf/ed1d/daa5400cdbc9dc8f285b23ec899c3cce?Expires=1636329600&Signature=eTSoXCIZbdgYuFhmaZ1kQtowLbI0fVCnaqprW26eOLzjtivrj7bsMAJtdJXxof~WNuuuJ8D4GCVTnM34vvI7exrMGrf60AshSqmkkWCq7nfOtZWlTWEmay3XPpDv0W7qVgpZzrNOFBv6fjSnz8CQ1b3-XLGp5D6YR8NWjLoNpeqxDP-mXth4bfIJ3gzrovpk1D~4YclDwSixi-PyKzrfWUI7U1mPUZUBSraBRdPD~V-5sKfy35UNV6a5s0k6N2GDh-GKcCvZ51v3mRCiM79v4o4hciBxY5RM5VN6MgpmYxKWSf5QjOwDE7Vw8lEqpqTzv03~~3e0qISED~XL-fJe9Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>T-shirts</Typography>
          </div>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/4a30/c278/17527695724e91edf503e48c342dc6d1?Expires=1636329600&Signature=K2nvovnNTwRbbNkJXN01l1M3bOmXkdyufEIZkQMlw7UH7NOIji~57t2-P7upOyenPAS7Z1O9JMMXgNB~qwz0w0w6mWJ1diEdp1UwadO99acz0SsxDXBiYU5LaY2AlzOyEdm8G6bJQnDOA0GJKHXaSTLRbzSsRKycayPWFJjSdVB8~Xznz07BIx9MuGWRqEVbIe3ZYNkatVzuONZPc9vp~yAGMikBH5iTSIwHEr~~NzOGZGHuivyJRCl3K~0-PTp0X~-stgak3W9ODru0~4wrlVKSisEh~5p5nA1-J5enqLtopIhzYGSNJVUR9qZSBD4Uu9RxaXCHucEIlMS-tTxYcw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Footwear</Typography>
          </div>
        </div>
        <div className={classes.imageContainer}>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/8806/b8cb/8eea4f0022faaf3e2ab8f06d16f2d556?Expires=1636329600&Signature=GuCSQPlmP29fwRGe-qaE4w1xtzglNIp-5pDviaNxR8ETrP2YekhbBwjg~h48AZP6pztfQsSArB2Fr8wlF5d9qgmYzISJHh04Phg2kgUlVEWuVp~pKh5SP2KyO~VBiuS6HZJkJfM0XsIOHRC5oyjOzRzBzozRUzgA-mE~wEJXp98KAs8bcs~DFS~q5AVCMY9mA5C4HrM4SMjYeVl2GGeZms3vCWQHwKLeHNsVmFN2raLZQFvcWy1vZPRN8D0ZKPWXDAjh6~PNv-VNUA4eQQzwWnYJZ7EmCTjXo4-Os~BgnOoj-hVRNSU3tHhIcymRil59GdYY5x2BRw6nhuI3ETR~8g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Sweaters</Typography>
          </div>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/c563/3411/23385707b38aad7d65f558360a766d06?Expires=1636329600&Signature=UYLjH5PF8o7znji8TAN4~ZSbstaH5~aKeNo--UdVUQMl2Cu5OW4pCmrh0wsLaZ3BYJAa3O4rFZBC-zb1UuUihX1XXR-dKR0W~w8AZWnKhuABbBKOnRwZzySXSBTCYCRz-NKDxNThlcp1Vq5MvwLS0cCI12AC9zQ5vzO4B7qYAvMPlCcqr3avaM1yELVTuNa8axY8eSdjcsgslma~gYJDvzH5dD7GceamMHAQV2hQpHb8hXX-bO7ExGR27QObBidKx5OEJn8Qw3dVZnkLJchMclfkNViUilLc-iM3qpTYz3Tqe7Rfv6JH1cQbDMh0kEysk1CsVRswwVRg-vDF7zMWvw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Bags & Luggage</Typography>
          </div>
        </div>
        <Button className={classes.explore}>Explore More {'>'}</Button>
      </Box>
      <Box className={classes.launches1}>
        <Typography className={classes.header}>Trending Collections</Typography>
        <div className={classes.imageContainer}>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/8806/b8cb/8eea4f0022faaf3e2ab8f06d16f2d556?Expires=1636329600&Signature=GuCSQPlmP29fwRGe-qaE4w1xtzglNIp-5pDviaNxR8ETrP2YekhbBwjg~h48AZP6pztfQsSArB2Fr8wlF5d9qgmYzISJHh04Phg2kgUlVEWuVp~pKh5SP2KyO~VBiuS6HZJkJfM0XsIOHRC5oyjOzRzBzozRUzgA-mE~wEJXp98KAs8bcs~DFS~q5AVCMY9mA5C4HrM4SMjYeVl2GGeZms3vCWQHwKLeHNsVmFN2raLZQFvcWy1vZPRN8D0ZKPWXDAjh6~PNv-VNUA4eQQzwWnYJZ7EmCTjXo4-Os~BgnOoj-hVRNSU3tHhIcymRil59GdYY5x2BRw6nhuI3ETR~8g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>T-shirts</Typography>
          </div>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/0842/23b3/45846ce2d95847605e24eadd961d19c9?Expires=1636329600&Signature=W-Q7-lATTuPmMECNm3HFyBzZ9KPTYt16lqKrXjCFHC3npbczVgciCpQhTKuzznI2~C6xVK0Ddyp6KZtt25JI0IBcFYWcMJ~01BoKvKEbWpUfcKhzE33eTwjSSR0HV6iF9IRbnxfXSVO0w3oTpifpv9vN8BvopekWyCcr02rPnlRLoOlSelgTJkjWdDTl3IEIfID5DBsEYp~DM80XigbMWR~zyXZtI7VRpICWl-0EE3tRCcYyVAWbUc5J5TWxl2~QCFLewT2ajRdvkbWglASsXf1eA0DgdWdIG75vFziyLSQthXxSJNV4UEkAfZsS9br2tBrJD8ka5bZk-sNsQexVpQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Fall Collection</Typography>
          </div>
        </div>
        <div className={classes.imageContainer}>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/7679/e909/2799ca9a8dbc571cfc1a5b50979b0fb1?Expires=1636329600&Signature=A8VONaiUM1EGyCTZF9zoW7xYjn5-leTBvnEnOZTFYWPp~qIAH6exFL4NcXAJxMygi9f8br4UL8yccojfUphPQQrqlu1PM~z3oNnIlCmDnHwKaJq-BIAR~96YK3VNM4HYzhWVg7B52sdoLErab4sDiKb42ZT251WHVwse6SwrHZR-tol-5oEvtY7YLzEFGyuju6PMtJjhECLIjG5odnEuhCdyg6VTUEobqDM4lrzFBRf1InFgZ~5thL7tKsoKb0z~VKM1vevidw96GtFu-14WhFHnRkRanYr26lnP9Unlun0LB5gl~NIV3F2bwF99if7wx5TwxXF~9UTF~aAndbu1aQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Sweaters</Typography>
          </div>
          <div className={classes.imageDisplay}>
            <img
              className={classes.image}
              src="https://s3-alpha-sig.figma.com/img/ad43/e465/70a2fbf9614f32abf798533912890bd2?Expires=1636329600&Signature=MDSlooCkWNZ~9lMskUYFEY6lUAuVP1vbXLIhpkhR7rFjvjpISVjsEMTzLYwmEQtRXsr6~82oOVqQYnXWtZxvs4zwMZfgVDAyc-elkBganpSuz7KQjkRauFtNDdT7bg87o-CvcCtMTo8Q0zSh1wn6~oojScRRzYG-QKaVvcfY-R50c-f4xW11jKKUL~qTts0OQSj4eWuFm2rZ0EsQBlpePIEazNH1fUPDtO~C3QURBdJDVbEECOse5ZCs9-xgEY14K-F96L4Cu-cwU3VhGB95QiH7~D3FIdz4RpfKpgPE7mqRjZO01SJmJpfYN9gLukY0wGfpzSrNDSH1-4UpCsyqfw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Typography className={classes.subHeading}>Footwear</Typography>
          </div>
        </div>
        <Button className={classes.explore}>Explore More {'>'}</Button>
      </Box>
      <Box className={classes.leftComponent}>
        <div style={{ border: '1px solid #0468DB' }}>
          <Typography className={classes.step}>Best Quality Premium Shirts</Typography>
          <div>
            <img
              className={classes.premium}
              src="https://s3-alpha-sig.figma.com/img/7e23/7429/da5778d737117f5e89de80f1082ce82c?Expires=1636329600&Signature=TYZUH64K~HYlIjp2QaIS6SX5csShGYMMC1BjCAJBlOn-i43IAon9Ixvy~axWygOIPnzMU5iGVzUvhWbqmSvZWP9iSJgZzJ-amh55y-JEoAitEciMjX4xMTZewzUK1dDQmT9Q3LWNv-3AR0rKg~2aeOnguyWwQAX0EemvTq6klTK5gCNp20N9sLXWFw4HyVX5ALmElA6KTqMICrx9Agl2cVTRflSaUso-F1xqYldLFurCCkzscT~gV3vXOWye32kyub4doST0r33ZLXY9S3iC3ktzQcIvRyl4ljS4rZKwbv2SU~e2vOX~JweXxndy5D0U-u~edFrAXVqt1Xfh0bHbhw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
            <Button className={classes.left}>Explore More {'>'}</Button>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Launches
