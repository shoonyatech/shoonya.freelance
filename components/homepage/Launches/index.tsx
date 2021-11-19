/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'

function Launches() {
  return (
    <div className="grid h-auto  2xl:h-screen justify-center sm:flex">
      <div className="w-auto sm:w-80 h-4/4 bg-white rounded-sm sm:h-2/4">
        <h1 className="font-medium sm:font-semibold capitalize text-2xl mt-5 ml-10 sm:ml-5 text-blue-900">
          New Launches
        </h1>
        <div className="flex mt-5 justify-center">
          <div className="ml-2 sm:ml-5 ">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Men's T-shirts (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Tops & T-Shirts</p>
          </div>
          <div className="ml-5 mr-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Women's Sleepwear (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Women Sleepwear</p>
          </div>
        </div>
        <div className="flex mt-5 justify-center">
          <div className="ml-2 sm:ml-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Women's Bottomwear (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Skirts, Shorts & Trousers</p>
          </div>
          <div className="ml-5 mr-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Women's Dresses & Jumpsuits (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Dresses</p>
          </div>
        </div>
        <p className="font-semibold cursor-pointer sm:font-medium text-sm text-blue-700 mt-6 ml-8">
          Explore More {'>'}
        </p>
      </div>
      <div className="w-auto sm:w-80 h-4/4 bg-white rounded-sm sm:h-2/4 ml-0 mt-6 sm:mt-0 sm:ml-6">
        <h1 className="font-medium sm:font-semibold capitalize text-2xl mt-5 ml-10 sm:ml-5 text-blue-900">
          Trending Collections
        </h1>
        <div className="flex mt-5 justify-center">
          <div className="ml-2 sm:ml-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Table linen (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Home Furnishing</p>
          </div>
          <div className="ml-5 mr-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Sweatshirts & Hoodies (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Men's Clothing</p>
          </div>
        </div>
        <div className="flex mt-5 justify-center">
          <div className="ml-2 sm:ml-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/Kids Clothing (1).png"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Kid's Clothing</p>
          </div>
          <div className="ml-5 mr-5">
            <img
              className="w-36 sm:w-32 h-32 sm:h-28 rounded-lg"
              style={{ border: '1px solid rgba(4, 104, 219, 0.2)' }}
              src="/images/womens.jpg"
              alt=""
            />
            <p className="w-32 h-10 font-medium text-gray-700 ">Women's Clothing</p>
          </div>
        </div>
        <p className="font-semibold cursor-pointer sm:font-medium text-sm text-blue-700 mt-6 ml-8">
          Explore More {'>'}
        </p>
      </div>
      <div className="w-auto h-4/4 sm:h-2/4 mt-6 sm:mt-0 ml-0 p-4 bg-white rounded-sm sm:ml-8 sm:w-3/3">
        <div style={{ border: '1px solid #0468DB' }}>
          <h1 className="font-semibold capitalize text-2xl mt-5 ml-4 sm:ml-5 text-indigo-500">
            Best Quality Premium Shirts
          </h1>
          <div>
            <img className="w-full h-auto rounded-lg sm:h-96" src="/images/shirts.png" alt="" />
            <button
              style={{ borderRadius: '20px 0px 0px 0px' }}
              className="absolute text-white font-semibold w-36 h-10 -mt-6 -ml-4 bg-blue-600"
            >
              Explore More {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Launches
