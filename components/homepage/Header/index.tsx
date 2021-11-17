/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-hooks/rules-of-hooks */
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'
import Image from 'next/image'
import React, { useState } from 'react'

import Categories from './drawer'
import SearchBar from './searchBar'

function Header() {
  const [toggle, setToggle] = useState(false)
  // <AppBar className={classes.component} position="fixed">
  //   <ToolBar>
  //     <IconButton className="hidden sm:block -ml-8" style={{ color: '#676E7E' }} color="inherit" onClick={handleOpen}>
  //       <Menu />
  //     </IconButton>
  //     <Drawer open={open} onClose={handleClose}>
  //       {list()}
  //     </Drawer>
  //     <div className="w-full justify-evenly flex text-black">
  //       <Box className="flex items-center -ml-52 sm:ml-0">
  //         <div className="bg-blue-900 w-8 h-8 rounded-full inline"></div>
  //         <Typography className={classes.logo}>Tradyl</Typography>
  //       </Box>
  //       <Box className="hidden items-center sm:flex">
  // {/* color: '#0468DB', */}
  //         <Typography className="w-20 h-4 font-medium text-base">
  //           Categories
  //           <ExpandMore />
  //         </Typography>
  //       </Box>
  //       <div className={classes.searchComponent}>
  //         <Button className={classes.product} variant="contained">
  //           Product
  //           <ExpandMore />
  //         </Button>
  //         <InputBase
  //           className={classes.field}
  //           inputProps={{ className: classes.input }}
  //           placeholder="Search for products"
  //         />
  //         <Button className={classes.search}>
  //           Search
  //           <Search className={classes.searchIcon} />
  //         </Button>
  //         <div className={classes.requestButton}>
  //           <Button className={classes.request}>Request for quote</Button>
  //         </div>
  //       </div>
  //       <Box className={classes.buttonComponent}>
  //         <Button>
  //           <PersonIcon />
  //           <Typography className={classes.button1}>Login</Typography>
  //         </Button>
  //         <Button className={classes.button}>
  //           <FavoriteBorderIcon />
  //           <Typography className={classes.button2}>Saved</Typography>
  //         </Button>
  //         <Button className={classes.button}>
  //           <Badge badgeContent={3} color="success">
  //             <ShoppingCartIcon />
  //           </Badge>
  //           <Typography className={classes.button2}>Cart</Typography>
  //         </Button>
  //       </Box>
  //     </div>
  //   </ToolBar>
  // </AppBar>
  return (
    <div>
      <div className="fixed top-0 z-50 w-full bg-white shadow-lg max-w-screen-3xl">
        <div>
          <div className="mx-auto xl:mx-auto md:max-w-screen-2xl sm:max-w-md max-w-full flex justify-between shadow-xs py-3 md:pb-4 mt-2.5 px-4">
            <div className="flex  items-center">
              <div
                className={`block md:hidden ${toggle ? 'hidden sm:block' : 'block'}`}
                onClick={() => setToggle(!toggle)}
              >
                <Image src="/images/bar.svg" width={40} height={40} />
              </div>
              <div className="md:ml-8 ml-2 text-lg text-gray-700 w-full">
                <Image src="/images/logo.svg" width={120} height={40} />
              </div>
            </div>
            <div className="hidden mt-2 sm:block cursor-pointer w-1/10">
              <p className="flex items-center lg:mx-5 xl:mx-14  text-center capitalize text-sm font-medium text-blue-700">
                categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </p>
            </div>
            <div className="hidden sm:flex w-2/5 ">
              <SearchBar />
            </div>
            <div className="hidden ml-24 sm:flex">
              <p className="flex items-center capitalize text-sm font-medium border p-2 border-blue-700 rounded-md text-blue-700 whitespace-nowrap">
                Request for quote
              </p>
            </div>
            <div className="ml-36 mt-2 sm:ml-24 justify-evenly flex">
              <div className={`${toggle ? 'flex items-center' : 'hidden'}`} onClick={() => setToggle(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div onClick={(e) => e.stopPropagation()} className={`${toggle ? 'hidden md:flex' : 'flex '}`}>
                <button className="flex" type="button">
                  <PersonIcon />
                  <p className="text-gray-500">Login</p>
                </button>
                <button className="hidden sm:flex ml-8" type="button">
                  <FavoriteBorderIcon />
                  <p className="text-gray-500">Saved</p>
                </button>
                <button className="hidden sm:flex ml-8" type="button">
                  <Badge badgeContent={3} color="success">
                    <ShoppingCartIcon />
                  </Badge>
                  <p className="text-gray-500">cart</p>
                </button>
              </div>
            </div>
          </div>
          {!toggle ? (
            <div className="block md:hidden mx-4 pb-3">
              <SearchBar />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div>
        {toggle ? (
          <div className="mx-auto block sm:hidden pb-3">
            <Categories />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Header
