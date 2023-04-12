import React, { useState } from 'react'
import ProductTable from './components/ProductTable'
import SearchBar from './components/SearchBar'
export default function Index() {
  // 我们应该在哪个组件中来管理状态数据，维护状态数据 ？？

  // 如果是两个子组件都需要用到某一个状态数据，那么这个状态数据应该维护在他们
  // 共同的父组件中，或者是父组件的父组件中，等等。
  // 包括状态数据，维护状态的事件处理函数 状态在哪里，函数就应该在哪里
  const PRODUCTS = [
    { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
    { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
    { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
    { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
    { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
    { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
  ]

  const [filterText, setFilterText] = useState('')
  const [onlyStock, setOnlyStock] = useState(false)
  const handlerTextChange = (value) => {
    setFilterText(value)
  }
  const handlerStockChange = (value) => {
    setOnlyStock(value)
  }
  return (
    <div>
      <div className="" style={{ border: '1px solid #ccc' }}>
        <span style={{ color: 'red' }}>学习状态管理的例子</span>
        <SearchBar
          filterText={filterText}
          onlyStock={onlyStock}
          changeFilterText={handlerTextChange}
          changeStock={handlerStockChange}
        ></SearchBar>

        <ProductTable
          productList={PRODUCTS}
          filterText={filterText}
          onlyStock={onlyStock}
        ></ProductTable>

      </div>
    </div>
  )
}
