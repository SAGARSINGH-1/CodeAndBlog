import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button className="rounded-lg border border-transparent px-3 py-2 text-lg font-semibold bg-indigo-600 text-white cursor-pointer transition duration-250 hover:border-white hover:bg-indigo-800">{props.val}</button>
    </div>
  )
}
