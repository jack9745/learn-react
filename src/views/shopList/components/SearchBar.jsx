import React from 'react'
export default function SearchBar({
  filterText,
  onlyStock,
  changeStock,
  changeFilterText,
}) {
  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          changeFilterText(event.target.value)
        }}
        value={filterText}
        placeholder="请输入关键字"
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={onlyStock}
            onChange={(event) => {
              changeStock(event.target.checked)
            }}
          />
          only show products in stock
        </label>
      </div>
    </div>
  )
}
