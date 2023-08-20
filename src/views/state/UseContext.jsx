import React, { useState, createContext, useContext } from 'react'

// 怎么样使用上下文 context ？？ context的使用场景是什么呢？？

// 组件通信：父组件可以通过 props将数据传给子组件 但是如果要通过很过中间组件向下传递props
// 或者说持有状态的组件和需要状态的组件离的很远。
// 这是，我们可以考虑 用context

// context的用途 可以让父组件为它下面的整个组件树提供数据

// 怎么使用 context  (前提假设 假设你想让相同 Section 中的多个 Heading 具有相同的尺寸：)

/**
 * 1.创建一个 context
 * 2.在需要数据的组件内 使用刚创建的context
 * 3.在指定数据的组件内 提供这个context
 * */

const levelContext = createContext({ level: 1 })

// 一个对象 各种内容属性
console.log('打印出来看下，是什么东西', levelContext)

// 读取上下文

//  React Hook "useContext" cannot be called at the top level.
//  React Hooks must be called in a React function component or a custom React Hook function
// const readContext = useContext(levelContext)
// console.log('读取出来的是什么东西', readContext)
export default function UseContext() {
  return (
    <div style={{ display: 'flex' }}>
      <div className="left">
        <Section>
          <Heading level={1}>这是一个标题</Heading>
          <Heading level={1}>这是一个标题</Heading>
          <Section>
            <Heading level={2}>这是二级标题</Heading>
            <Heading level={2}>这是二级标题</Heading>
            <Heading level={2}>这是二级标题</Heading>

            <Section>
              <Heading level={3}>这是三级标题</Heading>
              <Heading level={3}>这是三级标题</Heading>
              <Heading level={3}>这是三级标题</Heading>
            </Section>
          </Section>
        </Section>

        <Section>
          <Heading level={1}>这是一个标题</Heading>
        </Section>

        <Section>
          <Heading level={3}>这是一个标题</Heading>
        </Section>
      </div>

      {/* 这一部分用的是 context 通信 */}
      <div className="right">
        <Section level={2}>
          <Heading>这是二级标题</Heading>
          <Heading>这是二级标题</Heading>
          <Heading>这是二级标题</Heading>

          <Section level={3}>
            <Heading>这是三级标题</Heading>
            <Heading>这是三级标题</Heading>
            <Heading>这是三级标题</Heading>
          </Section>
        </Section>
      </div>
    </div>
  )
}

function Section({ children, level }) {
  // children 是 什么类型的数据 ？？
  // console.log(children)
  // 在这里使用 context 怎么使用

  //  provider组件 value属性提供的值 应该和createContext()的参数一样的数据结构
  return (
    <levelContext.Provider value={{ level: level }}>
      <section
        className="section"
        style={{ border: '1px solid #ccc', padding: '10px' }}
      >
        {children}
      </section>
    </levelContext.Provider>
  )
}

function Heading({ children, level }) {
  // 在需要数据的地方使用 context

  // 删掉 level 参数并从你刚刚引入的 LevelContext 中读取值：
  const readContext = useContext(levelContext)
  console.log('读取出来的是什么东西', readContext) // {level:1} createContext的参数
  switch (level || readContext.level) {
    case 1:
      return <h1>{children}</h1>
    case 2:
      return <h2>{children}</h2>
    case 3:
      return <h3>{children}</h3>
    case 4:
      return <h4>{children}</h4>
    case 5:
      return <h5>{children}</h5>
    case 6:
      return <h6>{children}</h6>
    default:
      return ''
  }
}
