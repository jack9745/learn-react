import React from 'react'

export default function Index() {
  const handlerPlay = () => {
    alert('电影开始了')
  }
  const handlerUpload = () => {
    alert('开始上传了')
  }
  const handlerClick = () => {
    alert('父组件触发事件了')
  }

  // 这里学习事件冒泡 ，阻止事件冒泡，事件捕获，

  // 事件冒泡：现在目标元素上触发事件，再在父级元素上触发，以此类推，依次往上
  // 阻止事件冒泡：e.stopPropagation();

  // 事件捕获

  // 怎么样声明事件捕获 ，在react中是 onClickCapture
  //  原生声明是怎么样的？？addEventListener(type, listener, useCapture);
  // 将useCapture 配置为 true

  // 一个布尔值，表示在 DOM 树中注册了 listener 的元素，
  // 是否要先于它下面的 EventTarget 调用该 listener

  // 我自己的理解：如果在一个目标元素的父元素或者祖先元素上 声明一个事件处理函数
  // 并且 配置为捕获阶段触发（将useCapture 配置为 true），那么这个组件元素的事件
  // 处理函数将优先于 目标元素的事件处理函数 触发

  /**
   * 当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，
   * 所发生的事件冒泡和事件捕获是两种不同的事件传播方式。
   * 事件传播模式决定了元素以哪个顺序接收事件
   */

  // 所以我的理解：事件传播方式有两种，一种是事件冒泡，一种是事件捕获，
  // 这种传播模式决定了哪个元素先触发事件

  // 每个事件的传播都有三个阶段 ,react官网就是这样描述的，

  /**
   * The capture phase: 第一个阶段 捕获阶段
   * The target phase: 第二个阶段  目标阶段
   * The bubble phase: 第三个阶段 冒泡阶段
   */
  return (
    <div
      style={{ height: '100px', border: '1px solid #ccc' }}
      onClick={() => {
        alert('最外层的元素上')
      }}
    >
      <span style={{ color: 'red' }}>学习事件处理</span>
      <div onClickCapture={handlerClick}>
        <Button onClick={handlerPlay}>play moive</Button>
        <br></br>
        <div
          onClickCapture={() => {
            alert(123)
          }}
        >
          <Button onClick={handlerUpload}>upload</Button>
        </div>
      </div>
    </div>
  )
}

// 可以这样来定义一个函数组件吗,好像是可以的
const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}
