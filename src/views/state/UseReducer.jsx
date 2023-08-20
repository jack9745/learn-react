import React, { useReducer, useState } from 'react'


// 什么是 reducer
//使用reducer 可以整合逻辑 将状态变化的处理程序集中到一个函数中 用dispatch来触发 action
// dispatch 是 useReducer 钩子返回的一个函数，用它来触发用户操作

// 为什么称之为 reducer 
/**
 * 你传递给 reduce 的函数被称为 “reducer”。
 * 它接受 目前的结果 和 当前的值，然后返回 下一个结果。
 * React 中的 reducer 和这个是一样的：它们都接受 目前的状态 和 action ，
 * 然后返回 下一个状态。这样，action 会随着时间推移累积到状态中。
 *
 *  */ 


// 这个函数可以提取到单独的一个文件中
import { updateTask } from "../../reducer/index"
// 迁移状态逻辑至 Reducer 中

// 如果一个组件中有比较多的事件处理函数，可以将这些处理程序集中起来放在一个地方 这就是useReducer的用处

export default function UseReducer() {
  // 编写一个reducer函数 接受两个参数，第一个参数为 当前state，第二个参数为 action

  
  const list = [
    { id: 0, text: '参观卡夫卡博物馆', done: true },
    { id: 1, text: '看木偶戏', done: false },
    { id: 2, text: '打卡列侬墙', done: false }
  ]
  const [task, setTask] = useState('')

  //  第一个参数是 reducer函数，第二个参数是初始值
  const [taskList, dispatch] = useReducer(updateTask, list)
   let nextId  = taskList.length 
  // 这几个操作都是对同一状态数据进行的操作，可以封账起来
  const handleAdd = () => {
    // taskList.length ++

    // 不能直接  taskList.length ++
    // 明白为什么不能这样了，taskList 是内部状态值 ，++ 操作会导致 多了一个空元素,并且直接改变内部值，这样是不可取的
    
    dispatch({
      type: 'added',
      text: task,
      // id: taskList.length ++ , 不能这样写，这样写会导致updateTask中的taskList 多了一个空元素 导致报错，
      // 不知道为什么多了一个空元素
      id:nextId ++,
      done: false
    })
  }

  const deleteRow = (id) => {
    dispatch({
      type: 'delete',
      id: id
    })
  }

  const changeCheck = (id)=>{
    dispatch({
      type:'changeCheck',
      id
    })
  }
  const changeValue = (value, id) => {
    dispatch({
      type: 'changeValue',
      text: value,
      id
    })
  }
  const edit = (id) => {
    dispatch({
      id,
      type: 'edit'
    })
  }
  const save = (id) => {
    dispatch({
      type: 'save',
      id
    })
  }

  return (
    <div>
      <input
        value={task}
        onChange={(e) => {
          setTask(e.target.value)
        }}
        type="text"
        placeholder="添加任务"
      />
      <button
        onClick={() => {
          handleAdd()
        }}
      >
        Add
      </button>
      <div>
        {taskList.map((item, index) => {
          return (
            <div key={index} style={{ marginRight: '10px' }}>
              <input type="checkbox" checked={item.done} onChange={() => changeCheck(item.id)} />
              {item.edit === true ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    changeValue(e.target.value, item.id)
                  }}
                />
              ) : (
                <span>{item.text}</span>
              )}

              <button
                style={{ marginRight: '10px' }}  onClick={() => deleteRow(item.id)}
              >
                删除
              </button>

              {!item.edit ?  <button
                style={{ marginRight: '10px' }}
                onClick={() => edit(item.id)}
              >
                编辑
              </button>
              : 
              <button
                style={{ marginRight: '10px' }}
                onClick={() => save(item.id)}
              >
                保存
              </button>}
            
             
            </div>
          )
        })}
      </div>
    </div>
  )
}
