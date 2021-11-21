/* eslint-disable react/button-has-type */
import React from 'react'

function Suppliers() {
  return (
    <>
      <div className="grid sm:flex justify-center">
        <div className="mt-12 mb-4 h-72 sm:h-2/4 w-screen sm:w-1/4 p-4 bg-white rounded-sm ">
          <div style={{ border: '1px solid #1D4E86' }}>
            <h1 className="ml-2 sm:ml-6 mt-2 sm:mt-7 font-semibold text-2xl h-8 text-blue-800">Step Up</h1>
            <div>
              <img className="w-full h-44 sm:h-80 rounded-sm mt-2" src="/images/stepup.png" alt="" />
              <button
                style={{ backgroundColor: '#1D4E86', borderRadius: '20px 0px 0px 0px' }}
                className="-mt-4 text-white absolute w-32 h-10"
              >
                Explore More {'>'}
              </button>
            </div>
          </div>
        </div>
        <div className=" sm:mt-12 h-72 sm:h-2/4 ml-0 sm:ml-6 w-screen sm:w-2/6 p-4 bg-white rounded-sm ">
          <div style={{ border: '1px solid #B45309' }}>
            <h1 className="ml-2 sm:ml-6 mt-2 sm:mt-7 font-semibold text-2xl h-8 text-yellow-700">Coats and More</h1>
            <div>
              <img className="w-full h-44 sm:h-80 rounded-sm mt-2" src="/images/coats.png" alt="" />
              <button
                style={{ marginTop: '-15px', backgroundColor: '#A07244', borderRadius: '20px 0px 0px 0px' }}
                className="text-white absolute w-36 h-10"
              >
                Explore More {'>'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:flex justify-center mt-6 bg-white">
        <div className="flex">
          <div>
            <img className="mt-6 w-64 h-48 sm:h-64 rounded-sm" src="/images/work-1.png" alt="" />
          </div>
          <div>
            <img className="mt-6 w-80 h-48 sm:h-64 rounded-sm" src="/images/work-2.png" alt="" />
          </div>
        </div>
        <div className="ml-6 mb-8 sm:ml-0">
          <h1 className="ml-4 mt-10 font-bold text-xl sm:text-3xl text-gray-600">Suppliers handpicked just for you.</h1>
          <p className="ml-4 mt-4 text-sm sm:text-base w-96 text-gray-500">
            We work with a few handpicked suppliers with verified business entities to offer you selections directly
            from the source. No intermediaries make our prices extremely compelling.
          </p>
          <p className="ml-4 mb-6 mt-6 text-medium sm:text-lg text-blue-600">
            Explore suppliers by certification {'-->'}
          </p>
        </div>
        <div className="hidden sm:flex">
          <img className="mt-6 w-64 h-64 rounded-sm" src="/images/work-3.png" alt="" />
        </div>
      </div>
      <div className="bg-white mb-6">
        <p className="flex ml-6 sm:justify-center h-16 font-bold text-xl sm:text-3xl text-blue-800">
          Brands our suppliers supply to
        </p>
        <div className="-mt-6 flex justify-evenly">
          <span className="flex items-center cursor-pointer">{'<'}</span>
          <img className="hidden sm:flex w-32 h-20" src="/images/gucci.png" alt="" />
          <img className="hidden sm:flex w-32 h-20" src="/images/zara.png" alt="" />
          <img className="-ml-6 w-16 sm:w-32 h-16 sm:h-20" src="/images/louis.png" alt="" />
          <img className="w-16 sm:w-32 h-16 sm:h-20" src="/images/calvin.png" alt="" />
          <img className="w-16 sm:w-32 h-16 sm:h-20" src="/images/tommy.png" alt="" />
          <img className="hidden sm:flex w-32 h-20" src="/images/polo.png" alt="" />
          <span className="flex items-center cursor-pointer">{'>'}</span>
        </div>
      </div>
    </>
  )
}

export default Suppliers
