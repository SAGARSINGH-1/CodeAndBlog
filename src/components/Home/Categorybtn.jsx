import React from 'react'

export default function Category(props) {
  return (
    <div>
      <button className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 ml-3 mb-3 font-semibold transition duration-300">{props.val}</button>
    </div>
  )
}
