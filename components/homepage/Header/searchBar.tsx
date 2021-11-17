import React from 'react'

function SearchBar() {
  return (
    <div className="mx-auto sm:max-w-md md:max-w-4xl max-w-sm w-auto lg:w-full h-10 cursor-pointer border border-gray-300 text-sm rounded-md flex items-center overflow-hidden">
      <div className="pr-2 bg-gray-300">
        <select className="h-10 rounded bg-gray-300 text-gray-800 text-sm p-2 outline-none cursor-pointer">
          <option value="Products">Products</option>
          <option value="Suppliers">Suppliers</option>
        </select>
      </div>
      <input
        type="search"
        name="search"
        placeholder="Search for products"
        className="flex-grow w-72 h-full px-1 text-sm focus:outline-none bg-gray-50"
      />
      <div className="flex bg-blue-600 items-center px-2 rounded">
        <button type="submit" className="h-10 p-2 outline-none capitalize text-white hidden md:block ">
          Search
        </button>
        <div className=" h-10 p-2 pt-3 outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
