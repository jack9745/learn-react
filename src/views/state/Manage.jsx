import React, { useState } from 'react'
import { useImmer } from 'use-immer'

// 这个文件学习状态管理的内容

// 声明式UI和命令式UI的不同

// 可以打个比喻  命令式UI ，就比如你打个车要到某个地方去，而你不告诉司机你要去哪里
// 而是跟司机说 首先左拐，然后直行300米，然后 右拐，然后直行200米，最后跟司机说你到了目的地，
// 这种方式就相当于是 命令式UI ，它是一步一步的执行某个命令
// （比如 document.createElement('div'),element.textContent ='',element.setAttribute('aa',''),等等呢个），类似过程式的编程

// 而声明式的UI 就好比你要去哪里 把目的地直接告诉司机，路线怎么走，让司机决定，

// 学习组件的状态管理
//1 一个组件可能有多个状态 ，
// 2每个状态对应不同的UI ，
// 3 什么行为触发了状态的改变

// 人为输入。比如点击按钮、在表单中输入内容，或导航到链接。
// 计算机输入。比如网络请求得到反馈、定时器被触发，或加载一张图片。

export default function Manage() {
  return (
    <div>
      <ChangeList></ChangeList>

      <SubmitForm></SubmitForm>
    </div>
  )
}

function SubmitForm() {
  // 组件有几个状态 状态之间的切换
  // 输入框的值
  const [name, setName] = useState('')

  // 错误信息
  const [error, setError] = useState('')

  // 状态  空状态 ，有值状态，提交状态 ，成功状态， 失败状态
  const [status, setStatus] = useState('typing') // typing , submit success

  // 提交数据前端处理，
  const handleSumit = async () => {
    try {
      setStatus('submit')
      const result = await submitData({ name: name })
      if (result.code === 200) {
        setStatus('success')
      }
    } catch (error) {
      setError(error.message)
      setStatus('typing')
    }
  }

  // 提交数据请求
  const submitData = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.name === 'huangtao') {
          resolve({ code: 200, message: 'success' })
        } else {
          reject(new Error('答案不正确，请重新输入'))
        }
      }, 2000)
    })
  }
  // 条件分支怎么写 UI 呢
  if (status === 'success') {
    return <div style={{ color: 'green' }}>表单提交成功了</div>
  }
  return (
    <div style={{ marginTop: '20px' }}>
      {status === 'submit' && <h5>表单正在提交中，请稍后</h5>}
      <input
        type="text"
        placeholder="请输入"
        value={name}
        disabled={status === 'submit' ? true : false}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <div>
        <button
          style={{ width: '60px', height: '40px', marginTop: '10px' }}
          onClick={handleSumit}
          disabled={name.length === 0 || status === 'submit'}
        >
          Submit
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}



// 实操 数组的变化
function ChangeList() {
  const initialList = [
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true },
  ]
  const [mineList, setMineList] = useState(initialList)

  // 用 userImmer库
  const [yourList, setYourList] = useImmer(initialList)

  // 状态在哪里， 改变状态的处理函数就应该放在哪里

  const toggleYour = (id) => {
    //setYourList 接受一个函数
    setYourList((list) => {
      const obj = list.find((item) => {
        return item.id === id
      })
      obj.seen = !obj.seen
    })
  }
  const toggleMine = (id) => {
    // 改变某一项的选中状态，并且不能影响 yourList 因为他们的初始值是一样的
    // 始终用一个新的值替换旧的值
    const list = mineList.map((item) => {
      if (item.id === id) {
        // 这里要用一个新的对象
        return { ...item, seen: !item.seen }
      }
      return item
    })
    setMineList(list)
  }
  return (
    <div>
      {/* style 也可以放在组件上面？？ 详情来了 props 可以接受任何类型的数据，甚至是一个组件 */}

      {/* 我们可以看到 your 和 mine 互相不影响，虽然他们有相同的初始值  */}
      <Item
        list={mineList}
        toggle={toggleMine}
        style={{ marginBottom: '10px' }}
      ></Item>

      <Item list={yourList} toggle={toggleYour}></Item>
    </div>
  )
}

function Item({ list = [], toggle, style }) {
  return (
    <div style={style}>
      {list.map((item, index) => {
        return (
          <div key={index}>
            <input
              label={item.title}
              type="checkbox"
              checked={item.seen}
              onChange={() => toggle(item.id)}
            ></input>
            <label htmlFor="">{item.title}</label>
          </div>
        )
      })}
    </div>
  )
}
