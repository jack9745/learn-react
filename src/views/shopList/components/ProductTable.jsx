import React from 'react'
import ProductRow from './ProductRow'
import ProductRowCategory from './ProductRowCategory'
export default function ProductTable({ productList, filterText, onlyStock }) {
  const rows = []
  let lastCategory = null

  console.log(onlyStock)
  productList.forEach((item) => {
    if (item.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return false
    }
    if (onlyStock && !item.stocked) {
      return false
    }
    if (item.category !== lastCategory) {
      rows.push(
        <ProductRowCategory
          category={item.category}
          key={item.category}
        ></ProductRowCategory>
      )
    }
    rows.push(<ProductRow product={item} key={item.name}></ProductRow>)
    lastCategory = item.category
  })
  return <div>{rows}</div>
}
