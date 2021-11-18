/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

import { megaMenu } from '../../../public/Data/data'

function Products() {
  const [active, setActive] = useState('fashion')
  const [accordian, setAccordian] = useState('')
  const [activeAccordian, setActiveAccordian] = useState(false)
  const megaDrop = megaMenu.find((item) => item.title === active)

  return (
    <div className="h-screen">
      <div
        style={{ boxShadow: '0 10px 8px -8px gray' }}
        className="py-4 px-4 drop-shadow-lg mx-auto overflow-hidden sm:max-w-screen-2xl h-auto"
      >
        <div className="mt-6 ml-4 sm:ml-0 mb-4">
          <h1 className="sm:text-3xl text-lg font-medium md:font-semibold text-blue-800 md:text-gray-600">
            Discover wholesale products
          </h1>
        </div>
        <div className="bg-white rounded-md">
          <div className="bg-gray-200 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-0 md:gap-4 mt-0 overflow-hidden">
            {megaMenu.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'rgb(236, 241, 254)',
                  transition: '0.2s ease',
                }}
                className={`w-10/12 md:w-full md:h-auto relative block ${
                  active === item.title ? 'pb-0 active md:border-t-4 border-blue-700 rounded-lg' : 'md:pb-4 md:mt-4'
                } `}
              >
                <div
                  onClick={() => setActive(item.title)}
                  className={`md:bg-white p-4 pb-0 md:pb-4 overflow-hidden rounded-lg ${
                    active === item.title ? ' h-full bg-white' : 'rounded-lg'
                  }`}
                >
                  <div className="pb-2 md:block hidden">
                    <p className="capitalize text-center md:text-left font-medium text-sm order-2">{item.title}</p>
                  </div>
                  <div>
                    <div className="relative hidden md:block object-cover rounded-lg object-center order-1">
                      <img src={item.image} alt={item.title} className="object-cover h-28 w-52 rounded-lg" />
                    </div>
                    <div className="relative md:hidden object-cover rounded-lg object-center order-1">
                      <img src={item.image} alt={item.title} className="object-cover h-16 w-52 rounded-lg" />
                    </div>
                  </div>
                  <div className="py-2 md:hidden block">
                    <p className=" capitalize text-center font-medium text-base order-2 text-darkblue">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4 px-4">
            {megaDrop &&
              megaDrop.submenu.map((item, index) => (
                <div key={index} className="">
                  <div
                    className="py-4 flex items-center justify-between border-b md:border-0"
                    onClick={() => {
                      setAccordian(item.name)
                      setActiveAccordian(accordian === item.name ? !activeAccordian : true)
                    }}
                  >
                    <h3 className="capitalize font-medium">{item.name}</h3>
                    <div className="md:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm hidden md:block">
                    {item.categories.map((category, index) => (
                      <p key={index} className="capitalize leading-7 cursor-pointer">
                        {category.item}
                      </p>
                    ))}
                  </div>
                  {item.name === accordian && activeAccordian ? (
                    <div className="text-gray-600 text-13px md:text-sm block md:hidden">
                      {item.categories.map((category, index) => (
                        <p key={index} className="capitalize leading-7 py-2 cursor-pointer">
                          {category.item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="py-4 px-52 text-blue-600 text-sm md:text-base block md:flex items-center">
        <p className="cursor-pointer text-xs">Can't find what you are looking for? Suggest a Category &gt; </p>
      </div>
    </div>
  )
}

export default Products
