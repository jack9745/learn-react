import React, { Component } from 'react'
console.log(
  '这是dev分支的打印信息，第一行代码和main分支的不一样，测试从dev合并到main分支'
)
//

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
