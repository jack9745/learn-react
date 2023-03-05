import React from 'react'

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
