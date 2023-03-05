import React, { useState } from 'react'
import LearnObject from './Object'
import LearnArray from './Array'
// 学习状态管理 更新对象类型 ，数组类型的状态数据

/**
 *
 * 状态更新触发组件重新执行
 * React 重新渲染组件根据新的状态
 *  React re-renders the component according to the new isSent value.
 *
 * 什么是渲染
 * “Rendering” means that React is calling your component,
 *  which is a function.
 * The JSX you return from that function is like a snapshot of the UI in time.
 * 
 * 
 *  When React re-renders a component: 当React重新渲染一个组件式，会执行下面的操作

    React calls your function again.
    Your function returns a new JSX snapshot.
    React then updates the screen to match the snapshot you’ve returned.
 *
 */
import { Button } from 'antd'
export default function Index() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    /**
     * Setting state only changes it for the next render
     * 状态只有在下次渲染中改变，不会在本次快照中改变
     */

    //  这里调用 setCount 三次，但是下次count的值并不是加3，
    // 因为在本次快照中，count的值始终是0，
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)

    //
    console.log(count)
  }

  const handleClickOne = () => {
    // 这里setCount 也被调用了三次，那么下一次渲染后，count值是多少呢 ？？？

    /**
     * Here, n => n + 1 is called an updater function. 更新函数
     *  When you pass it to a state setter:
     * 
     * 1.React queues this function to be processed after all 
     * the other code in the event handler has run.
     * React 排队处理这些函数
     * 
       2. During the next render, 
        React goes through the queue and gives you the final updated state.
        React给出最后的更新后的值
     * 
      Here’s how React works through these lines of code while executing the event handler:
      当React执行事件函数（click处理事件函数）时是如何处理下面的更新函数的，
      
      setCount(n => n + 1): n => n + 1 is a function. React adds it to a queue.
      setCount(n => n + 1): n => n + 1 is a function. React adds it to a queue.
      setCount(n => n + 1): n => n + 1 is a function. React adds it to a queue.
      将更新函数添加到队列不是在下次渲染中执行的，而是在本轮中执行的


      When you call useState during the next render,
      在下次渲染执行 useState的时候，React会执行下面的操作
       React goes through the queue.
        The previous number state was 0, 
        so that’s what React passes to the first updater function 
        as the n argument. 
        Then React takes the return value of your previous updater function 
        and passes it to the next updater as n, and so on:
     */

    // 所以这样执行下来，下次更新的结果是 增加3
    setCount((n) => n + 1)
    setCount((n) => n + 1)
    setCount((n) => n + 1)
    console.log(count)
  }

  const handleClickTwo = () => {
    setCount(count + 2)

    // 2秒之后，这里弹出的值应该是多少呢 ？？

    // 每次渲染都返回一次快照， 并且官网是是这样说的，
    // A state variable’s value never changes within a render,

    /**
     *
     * The state stored in React may have changed by the time the alert runs,
     *  but it was scheduled using a snapshot of the state at the time the user interacted with it!
     *
     * A state variable’s value never changes within a render,
     *  even if its event handler’s code is asynchronous.
     * Inside that render’s onClick
     *
     * Its value was “fixed” when React “took the snapshot” of the UI
     * by calling your component.
     * 值被固定了，当拍摄快照时，
     */

    // 那么问题来了，如果我想弹出最新的值，应该怎么办
    setTimeout(() => {
      alert(count)
    }, 2000)
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <Button
        type="primary"
        onClick={handleClick}
        style={{ marginRight: '10px' }}
      >
        button
      </Button>

      <Button
        type="primary"
        onClick={handleClickOne}
        style={{ marginRight: '10px' }}
      >
        另外一个按钮
      </Button>

      <Button type="primary" onClick={handleClickTwo}>
        测试一下快照
      </Button>

      <div>count的值是多少呢{count}</div>

      <div style={{ marginTop: '30px' }}>
        <LearnObject></LearnObject>
        <LearnArray></LearnArray>
      </div>
    </div>
  )
}
