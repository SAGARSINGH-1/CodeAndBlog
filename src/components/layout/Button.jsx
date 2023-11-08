import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button className="rounded-lg border border-transparent px-3 py-2 text-lg font-semibold bg-orange-500 text-white cursor-pointer transition duration-250 hover:border-white hover:bg-orange-400">{props.val}</button>
    </div>
  )
}
