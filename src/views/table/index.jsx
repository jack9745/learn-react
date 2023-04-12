import React from 'react'

//
console.log('第一行内容做了修改')
console.log('这一行是新增的内容')
console.log('删除了第二行的数据')

import { Button, Table } from 'antd'
export default function Index() {
  const handleClick = () => {
    console.log('这是一个按钮')
  }
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Button
      </Button>
    </div>
  )
}
