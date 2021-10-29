import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  component: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  leftComponent: {
    marginTop: 50,
    width: '580px',
    height: '476px',
    padding: '20px',
    background: '#FFFFFF',
    borderRadius: '2px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px',
      width: '393px',
      height: '280px',
    },
  },
  rightComponent: {
    marginLeft: 40,
    marginTop: 50,
    width: '670px',
    height: '476px',
    padding: '20px',
    background: '#FFFFFF',
    borderRadius: '2px',
    border: '1px solid #FFC061',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5px',
      width: '393px',
      height: '280px',
    },
  },
  suppliers: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    background: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
    },
  },
  step: {
    marginLeft: '15px',
    marginTop: '20px',
    fontWeight: 600,
    fontSize: '24px',
    height: '32px',
    color: '#1D4E86',
  },
  coats: {
    marginLeft: '15px',
    marginTop: '20px',
    fontWeight: 600,
    fontSize: '24px',
    height: '32px',
    color: '#A07244',
  },
  left: {
    marginTop: '-15px',
    position: 'absolute',
    width: '140px',
    height: '35px',
    backgroundColor: '#1D4E86',
    borderRadius: '20px 0px 0px 0px',
  },
  right: {
    marginTop: '-15px',
    position: 'absolute',
    width: '140px',
    height: '35px',
    backgroundColor: '#A07244',
    borderRadius: '20px 0px 0px 0px',
  },
  line1: {
    marginLeft: '20px',
    marginTop: '30px',
    fontWeight: 'bold',
    fontSize: '34px',
    color: '#454954',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 600,
      marginTop: '10px',
      fontSize: '18px',
    },
  },
  line2: {
    marginLeft: '20px',
    marginTop: '10px',
    fontSize: '16px',
    width: '570px',
    color: '#393D46',
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      fontWeight: 'normal',
      fontSize: '13px',
    },
  },
  line3: {
    marginLeft: '20px',
    marginTop: '20px',
    fontSize: '18px',
    color: '#1D4E86',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'normal',
      marginTop: '10px',
      fontSize: '12px',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    height: '39px',
    fontWeight: 'bold',
    fontSize: '34px',
    color: '#1D4E86',
    [theme.breakpoints.down('sm')]: {
      height: '20px',
      fontSize: '20px',
    },
  },
  premium: {
    width: '542px',
    height: '362px',
    borderRadius: '2px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '350px',
      height: '168px',
    },
  },
  premium1: {
    width: '626px',
    height: '362px',
    borderRadius: '2px',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '350px',
      height: '168px',
    },
  },
  image1: {
    marginTop: '20px',
    width: '280px',
    height: 280,
    border: '3px solid #FFFFFF',
    borderRadius: '2px',
    marginLeft: '15px',
  },
  image2: {
    marginTop: '20px',
    width: '400px',
    height: 280,
    border: '3px solid #FFFFFF',
    borderRadius: '2px',
  },
  brands: {
    width: '150px',
    height: '90px',
    [theme.breakpoints.down('sm')]: {
      width: '55px',
      height: '55px',
    },
  },
  brands1: {
    width: '150px',
    height: '90px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  brandsDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      marginTop: '15px',
    },
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  mobile1: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  border: {
    border: '1px solid #1D4E86',
  },
  back: {
    background: '#FFFFFF',
  },
}))

function Suppliers() {
  const classes = useStyle()
  return (
    <>
      <div className={classes.component}>
        <Box className={classes.leftComponent}>
          <div className={classes.border}>
            <Typography className={classes.step}>Step Up</Typography>
            <div>
              <img
                className={classes.premium}
                src="https://s3-alpha-sig.figma.com/img/0ebc/e4d8/e011d59bd3acf619f74c25d69bcaa5bf?Expires=1635724800&Signature=VNokJ3aC5tH9OWXQoaeJezP9VJ5gpLbnBYN8ykEVZxCvvYgwwseR1AsoVy4Gmp7vwFHC8gHg~k2LKnFQT8l4UnCxX39xj3I6meNMNyw2DpQz4lOevcRF7vlP7M-9eOX0EJZjWxZfR6pRgTzFqzkPSJBa~Koq4Fk~WVu540rooqQnHcVYauCzdely3CDB7qQ9asT67pGVYk81SjhpGIGE3famsh7l9ZX6GW-3YflujInHmxvsoT-X8x2PXHt6C5ra~J5HPx9hU0uxIffgUIz594FiIxUTsp8nWjF9MmXjBSl27O1T6gFCNlatFlxh1FjdWGdSyOs3QuJErUoohXym~Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt=""
              />
              <Button className={classes.left}>Explore More {'>'}</Button>
            </div>
          </div>
        </Box>
        <Box className={classes.rightComponent}>
          <div className={classes.border}>
            <Typography className={classes.coats}>Coats and More</Typography>
            <div>
              <img
                className={classes.premium1}
                src="https://s3-alpha-sig.figma.com/img/969e/c515/ef69b3c7101b158263d3636a777c73c3?Expires=1635724800&Signature=fq2Y6yBRyZvcc7p0vJHqZntNGTapI0CybbyTR3CdeykZsA-fi4uO3-DYQfmxU3~7i6OKCTvdxjUkIE3lDHt0PIxc-6SDdiCfKLYmswLPf0-2rA9tjftPZjkQUFn3M7SbSvIf2h2btLYAqP-T9wrVp~iPAPBZXfjDAw3jSP-Wui0mmq7b9kHr-8oUiXwR1qbz6nZOTdgmnPT8jLYsPr~TGDjsHDJvah28oC6LNecaucSg~Gj9nZpG3pwWrQZRP0MIN3BPJmXWwYH0ePOMc4dd4jF1nGFl35cfyjwfmky-Clwkh4mCpU7d1E6Ir~w89gf9DiTaED7Y-CPhLBJWxRw27A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                alt=""
              />
              <Button className={classes.right}>Explore More {'>'}</Button>
            </div>
          </div>
        </Box>
      </div>
      <div className={classes.suppliers}>
        <div className={classes.mobile}>
          <Box>
            <img
              className={classes.image1}
              src="https://s3-alpha-sig.figma.com/img/e873/9c4f/ca43b9774db0d98f10cbad235e84c00e?Expires=1635724800&Signature=f0HOMIu6DftKNdW5sNmf8zotvyJ2F4qKdrdwevrqBb8iGRbNd~aAt~BphFjfT7bPPjE16mfuARS6OlUKc2PGz~7cNgQFMY6phm5BeT7axosT2JwDvFvH0J00w-1JSKLRKI3U4hDaMATrgX0PBBAEV59kawzRYOgUAHQsqMovK5HYaRHTL0AS~KRXisBHs5Ca~ufG2vRmkn10-u9L~GDDUnMjpIXqaH3NB-~tQ9FmwkHlA4SD1q-gwPTSF8DFg3lL2MO39aGz3mcrc19R5uSQefH7ZMP4hgbdzskWZ9xL28TBHs8owqV2vZ7NfgJfwb9NdIQgqvhhTmRrbWNtpicpBQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
          </Box>
          <Box>
            <img
              className={classes.image2}
              src="https://s3-alpha-sig.figma.com/img/9ed6/fb4f/8d012eeae20c04e842afc9b2e0c5f46d?Expires=1635724800&Signature=RrV7n-epL~nhd0He5tUbO6Im5TgALSGL-w6rekWtxfqtNrIP6bMFRYgKPzluuDa3QRFR1k2FYUSZUwQVe7FXqB2yMfbU9jC26~GQu2Xd50GJhH1-aVI~FhklStDB~qvGHlaaRoH0l3KtYBmGwBEeFA7DTZzqELO0jERVENtDDYwRkEGxNbeJYUyxyp4ONoIAD2kHr5GkeZYxsQBuhjRbdQy8GP3-~SOX2~8JwIIz76M~PWFITGsTMbny6LeaP-ycbb2ffP5AzUh9qWS7~o7oilkJFrncrerRpkuzyOt2KoDoVdkBOlEWndjGpRsrKTe9E-iSlnBhh2gkA1XQ8IUvnA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt=""
            />
          </Box>
        </div>
        <div>
          <Typography className={classes.line1}>Suppliers handpicked just for you.</Typography>
          <Typography className={classes.line2}>
            We work with a few handpicked suppliers with verified business entities to offer you selections directly
            from the source. No intermediaries make our prices extremely compelling.
          </Typography>
          <Typography className={classes.line3}>Explore suppliers by certification {'-->'}</Typography>
        </div>
        <Box className={classes.mobile1}>
          <img
            className={classes.image1}
            src="https://s3-alpha-sig.figma.com/img/1e91/ea8c/e6adbf66c6a7cf1813af5e580b0cd7ed?Expires=1635724800&Signature=G6I~IxODhQIsXkBNmzHZDqYFj4QmaK5HuQgHGVCSUFZ2fOcQ5b3HOKzZKrt3O8xMPnq9NTRgkrcOLFcMg9N7UBdaDRU~5NFKGLKEO7iTTGOeN2vvOtlQ0wBeHNG4V-u4rbPGgm8S-fYqtICt3KJrkZVcQP2R3e~SlCqMy~Aia6cr~uUeTY6vuL19t2H7~VTsiw664p3QU~1jsAoU2BWSaJ9riM-kroJPakMVqK-WyhKgnfYcqCCYr93Kahy9bIhK36Ea9ZFZ8GezcySAZLqiJmco3YEc-ujZNiJn8UEmXj9487dCAV8pLdGvLsOe0DeUG3CtNRozgFBW3txaNzntVA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
        </Box>
      </div>
      <div className={classes.back}>
        <Typography className={classes.center}>Brands our suppliers supply to</Typography>
        <div className={classes.brandsDiv}>
          <span className={classes.arrow}>{'<'}</span>
          <img
            className={classes.brands}
            src="https://s3-alpha-sig.figma.com/img/2b13/63a9/e8f5d74be58dd0bd755388f42e01ce7d?Expires=1635724800&Signature=UWs1l50yoL-1CGQ2vRpqFUvdPhVCiIAgC8RbGwr4zeHVbEtBCootjG020r4rT5JgJGX8zSVYhSFZz49qtU1qlh1QdXe~ILLca94kW32udM4ywAMQxLW0efr3yKFceLhfeWmg80oCY81IykapqHMuUW1CmckYF-ko79YFq9kXGqIpVetXvqDH12MK8L1fwNnbUdDlcL6AKb9Cu9To54WsRgaJg8AnptbU1KL9-vb0jBxWgkzfmdfLNgpo-ZivrXKhqCVoqkR8K7XpNo8EJOCMJtCXFN3QysiEQBGZcHoyB4EcnIYC18OSFP1y921O1nD5lW3hR3mP09DOR-TK~cuBGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <img
            className={classes.brands}
            src="https://s3-alpha-sig.figma.com/img/3dec/dbe7/ee77d758f56fe70f2ed3bc3643cbe7e5?Expires=1635724800&Signature=ZqzojoJPSw0nN9KjorI5fbgbJjNEpzEvJiOAuLtfioTDlop~7bQ9byx2tHsVqDCl9j7dv2J2VCKnMZQuHjqI5BggLKymOF8psPGrNuLL6GGVD2NSJVrW~0ivU1bfNcE-r4hpCbw7ZXtJ7dy5y90rSHCAdpcigiEjFEQLO73zCl4ju790xiB~ElLRoRL6LYkip6y5gTAWSo6p3geIkFwjC-Rpes2LTj7Boj6UMUoY5TSMZLSbs~egD3rjFn9H7z7tYInRo7~kyHyHj2SqKDeJwZIDJsh3OCPOG7~EJpRpsLR1Ve2Ip8d1kOWUHgmIEnCOSVhUOE5Q8GSujHaRGNRgLw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <img
            className={classes.brands}
            src="https://s3-alpha-sig.figma.com/img/fe45/e784/80c9c03c75af21121694f6cd120ef025?Expires=1635724800&Signature=P4Jboj5WeRwqRl0R6H73hYoY5TVA211jVvZunE-WfeT~nPq7K3emf3aAihn2EeSY8XEoUDqmYgdOxnxE58ZX15Ii4wnH3yPJd-A2dfHqi6QpsvOSYy3HFVcLKoKclpkfRAy9qx9MAUG8bS3oLbko2ZW7oom7892GfTBW~0Cpux006~1cwLoPSyibpfyQC34w~iXu2Af3B0NdZ3s1Bn9pzNIjuyjbf2YhqWheO0~iTxlo9vO~792x6swyWP86FL0V2ZsYzP9nRKD4dX7BT0LIG37WFzS6TrJsh5l7TYh7dorpkQ7c1Z3qy3xlXhY41Mpe9~qBFQ4w7pO6Mt6YqQDbNQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <img
            className={classes.brands1}
            src="https://s3-alpha-sig.figma.com/img/eeb8/717e/dd8a0b984ffd1300a90eb00bf3080ea5?Expires=1635724800&Signature=Md5UD3z~rPU~X1MP1SqAkE8QFR1OxlqDVXThZX0DyE7xVFW7CzIIgmWJLxfj8p7O9FQ4FzuoHteyxb51pByvy3qUQBiA7mG~Vdmg~lg2u7rbbnun6bcjsJ3XKB~swN4Hox9d3PpW28cLK-KTQyarGKaCyymyoF~xagTsQZxlZ34zFPIqIyLGT49jmab6teMN3gpm77tG61gqY17mSRm6Cw61L2vjGZ2Q87CKdsWT9K0Y6ogAxtOXHUGujYfB7QV9QL7po0uxo3dSDRSUhqedlTZ2LplbZpspaN0d4V69LAyeY8Gjn4IWMIWBgiwoxeM694Fo1n2l2m3uE4eQ9rEF9A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <img
            className={classes.brands1}
            src="https://s3-alpha-sig.figma.com/img/add4/0bd2/404866e3ee2ba7e24685820892ce0728?Expires=1635724800&Signature=SQD9~Y6i11FCmWCmC1bK2w4pGYwO3ZTIkKbqxgrg9EF42nSHMC-LLni9v0LooCbMIXQo1LQDlxq305TNDnYbcWg4OmtLhihD2uU3CssV7xqWf0RyyyAmoW7r6sdRyeKZnO6HXu7-FZprKo7lCSh5uUBAdaSbomP5Cv7Erg9DYr43j63wPt8khHB5u77moIE7qMPZsCt4ad3XYRrHE-4bwqXs9mJiPBgEp2GZW84liZewJ6XyDhSAtiuXH412qc5jBCC5-KpwvccOsYW7ClHhxi84Advm0qiB4yidgHYJo8gezSohg-t~jrMcYxz1JD7ebXUCUx9x8dCk2A941uzBPg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <img
            className={classes.brands1}
            src="https://s3-alpha-sig.figma.com/img/45a4/dacb/4e9ff54d5bd621d424840de9c3fdf030?Expires=1635724800&Signature=C6Tvghrr-wCJy4BJXA2pJU5z383ccEve2G4GAxH4GTeGtoSLI0eKhYgmCLSIuAjgFBpfIKJ6oZccYAyuXxaj-QeZfbBdXANJYA~jVwjpIB1-uRsgp27k8k~txVr0ya8dRMY~uFzrE2LqNhO7xA065P5ef-1cZ73WlGVoiHDZZNT--z2Xw1fG2cSwuQMVA6i~eU0WXWxAEyhiM3GbO9~eI62tHmcqDFrzA-KFzWMzaI9knxsYMFqyMF3V4z0FdLjgMvNPQ5-M5FCxcfjc3L9KXY3hU13PiNBvWhJshZ7z38pGErNSuywz3wm-TukQLat6BhNQ5PW0QAHwP3AxFM0i1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
          <span className={classes.arrow}>{'>'}</span>
        </div>
      </div>
    </>
  )
}

export default Suppliers
