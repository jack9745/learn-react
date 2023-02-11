import React from 'react'
import '../index.css'
export default function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  )

  return (
    <ul className="item">
      <li style={{ marginLeft: '10px', marginRight: '10px' }}>{name}</li>
      <li>{product.price}</li>
    </ul>
  )
}
