/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const Content = () => (
  <div className="mt-4 mb-4 ml-4 mr-4 bg-gray-200">
    <div className=" mx-auto bg-white rounded-md shadow-md overflow-hidden md:max-w-screen-xl h-auto sm:h-96">
      <div className="sm:flex">
        <div className="">
          <div className="relative  sm:object-cover md:w-full h-60 sm:h-80">
            <img
              className="object-cover w-96 sm:w-auto h-60 sm:h-96 object-top md:object-center"
              src="https://s3-alpha-sig.figma.com/img/afe1/d4c4/f16fbf7d136b918d71008adbca0eeac9?Expires=1635724800&Signature=XOsd1HqgA03EqSQ2faR0w102W5NdjJgxxYglCeOGXpN5hO1FP1LluwS7A~HhH8qKeb-ySAqMyMQRLJjNuMRgayxmsD7lNT7D3W7Tgt8u4i-e~XkFJ06PdeeQOIfB6EMMu0NiF-K7ye69-lu-3axOT1Dri3XZxf-NcgJndy8LK7PeGIJTbrv8cnuqFpZGs-opvVfbW~8I98Xd5cldE2Y311FPzweYLlg3gW9zRp9Bqu~m0b6yAR2V3sSdhDPbRuMP3XAmzfTmDnWWmNN7XXg89lCTIp1ZB1VaLMF9lK8KfK5ovZjl2dD1dDLxQJQPlq6Z2xPWd4zD4YTLqtbaEvHrEg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="block mt-1 md:text-3xl lg:text-5xl text-2xl py-4 font-bold leading-tight text-gray-800">
            Global Trade Made Local
          </div>
          <div className="xl:w-3/4 lg:w-11/12 w-full">
            <p className="mt-2 text-blue-600 text-base font-medium">
              Get thousands of wholesale products for your business from verified suppliers in India in a few clicks!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full whitespace-nowrap mt-4">
            <div className="flex items-center">
              <img
                src="https://tradyl.com/_next/image?url=%2Fsvg%2Fbanner%2Fbanner1.png&w=48&q=75"
                alt="banner"
                className="p-2 sm:p-4 h-16 w-16"
              />
              <p className="pl-4">100% Quality Assured</p>
            </div>
            <div className="flex items-center ">
              <img
                src="https://tradyl.com/_next/image?url=%2Fsvg%2Fbanner%2Fbanner2.png&w=48&q=75"
                alt="banner"
                className="p-2 sm:p-4 h-16 w-16"
              />
              <p className="pl-4">Verified Suppliers</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://tradyl.com/_next/image?url=%2Fsvg%2Fbanner%2Fbanner3.png&w=48&q=75"
                alt="banner"
                className="p-2 sm:p-4 h-16 w-16"
              />
              <p className="pl-4 whitespace-nowrap">Fast worldwide shipping</p>
            </div>
            <div className="flex items-center ">
              <img
                src="https://tradyl.com/_next/image?url=%2Fsvg%2Fbanner%2Fbanner4.png&w=48&q=75"
                alt="banner"
                className="p-2 sm:p-4 h-16 w-16"
              />
              <p className="pl-4">Wholesale Prices</p>
            </div>
          </div>
          <div className="block md:flex md:justify-around font-medium md:mt-6 mt-4">
            <button className="text-blue-500 whitespace-nowrap  border-2 border-blue-500 p-2 w-full text-center rounded-md md:mx-2">
              Explore Ready to Ship Products
            </button>
            <button className="text-green-500 whitespace-nowrap  border-2 border-green-500 p-2 w-full text-center mt-4 md:mt-0 rounded-md md:mx-2">
              Customize Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Content
