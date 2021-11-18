/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import Image from 'next/image'
import React, { useState } from 'react'

import { megaMenu } from '../../../public/Data/data'

export default function Categories() {
  const [active, setActive] = useState({ status: false, title: 'home' })
  const [accordian, setAccordian] = useState('')
  const [activeAccordian, setActiveAccordian] = useState(false)
  const megaDrop = megaMenu.find((item) => item.title === active.title)

  return (
    <div>
      <div className="fixed w-full md:hidden top-0 bg-white min-h-screen h-full z-40 overflow-y-scroll">
        <div className="px-6 mt-20">
          <div className="pb-20">
            <div className="py-3">
              <h1 className="text-base text-gray-800 font-semibold">Categories</h1>
            </div>
            <div>
              {megaMenu.map((item, index) => (
                <div key={index} className="rounded-xl relative block">
                  <div
                    className="flex py-2 items-center justify-between"
                    onClick={() => setActive({ status: !active.status, title: item.title })}
                  >
                    <div className="flex items-center">
                      <div>
                        <div className="relative md:w-full w-10 h-10 md:h-40 ">
                          <Image
                            src={item.image}
                            alt={item.title}
                            layout="fill"
                            className="md:w-full w-10 h-10 md:h-40 object-cover rounded-lg object-center order-1"
                          />
                        </div>
                      </div>
                      <div className="py-2 md:hidden block ml-4">
                        <p className=" capitalize text-center font-semibold text-sm order-2 text-blue-600">
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <div onClick={() => setActive({ status: !active.status, title: item.title })}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className={`${active.title === item.title && active.status ? 'grid' : 'hidden'} py-4`}>
                    {megaDrop &&
                      megaDrop.submenu.map((item, index) => (
                        <>
                          <div
                            key={index}
                            className="py-4 flex items-center justify-between border-b md:border-0"
                            onClick={() => {
                              setAccordian(item.name)
                              setActiveAccordian(accordian === item.name ? !activeAccordian : true)
                            }}
                          >
                            <h3 className="capitalize font-medium text-gray-700">{item.name}</h3>
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
                          {item.name === accordian && activeAccordian ? (
                            <div className="text-gray-600 text-xs md:text-sm block">
                              {item.categories.map((category, index) => (
                                <p key={index} className="capitalize py-2 ">
                                  {category.item}
                                </p>
                              ))}
                            </div>
                          ) : (
                            ''
                          )}
                        </>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
