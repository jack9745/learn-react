import React, { useState } from 'react'

const list = [
  {
    name: 'jack',
    age: 12,
  },
]

const newList = [...list]

// 我们可以看到 新的数组和旧的数组 第一个成员指向的是同一个对象，
// 展开运算符不是深拷贝，而是浅拷贝
newList[0].name = 'huangtao'
console.log(list[0].name) //huangtao

// 学习更新数组类型的状态数据

// 数组类型的值 在js 中也是可以变化的，
// 但是你应该认为它们在状态管理中（即将数组设置为某个组件的内部状态的时候）是不可变的

/**
 *
 * but you should treat them as immutable when you store them in state.
 * Just like with objects,
 *
 * when you want to update an array stored in state,
 * you need to create a new one (or make a copy of an existing one),
 * and then set state to use the new array.
 * 当你想更新一个数组类型状态的值的时候，你应该创建一个新的，然后用这个新的替换原来旧的
 *
 * */
export default function LearnArray() {
  const [value, setValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [id, setId] = useState(0)
  const changeValue = (event) => {
    setValue(event.target.value)
  }

  // 从数组中增加一项元素
  const handleClick = () => {
    // 在 object当中有讲 好像叫做 local mutation
    //  我的理解：我们可以利用原来的状态值来生成一个新的变量，
    // 然后可以对这个新的变量做任何操作
    // 改变原数组的和不改变原数组的方法都可以。
    // 就是不要去直接修改已经存在的状态数据
    // 如  todoList[0] = xxx todoList.push() todoList.map()
    const newList = [...todoList]

    newList.push({ id: id, value: value })

    console.log(newList)
    setTodoList(newList)
    setValue('')
    setId(id + 1) // 将 id+1,第二轮的时候 id就变了，
  }

  // 从数组中移除某一项元素

  const deleteElement = (index) => {
    // 这里生成了一个新的list
    const list = todoList.filter((kItem, kIndex) => {
      return index !== kIndex
    })

    setTodoList(list)
  }

  // 反转数组，就是这么容易
  const reverseList = () => {
    // 我的理解：操作一个数组之前，先用原来的状态数组生成一个先的变量，然后再在操作这个新的变量
    // 这一点非常重要

    // list 是一个新的数组，
    const list = [...todoList]
    list.reverse()
    setTodoList(list)
  }

  // 更新某一项里的内容
  const editElement = (id) => {
    // const list = [...todoList]
    // const item = list.find((item) => {
    //   return item.id === id
    // })
    // const newItem = { ...item }
    // newItem.value = '这是一个新值'
    // newItem和list 没有产生联系  这种方法在逻辑上不可取，如果业务复杂，逻辑会更复杂

    // list是新
    const list = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, value: '这是一个新值' }
      }

      // 不需要改变的项就返回原来的项
      return item
    })

    setTodoList(list)
  }
  return (
    <div style={{ margin: '10px' }}>
      <input
        placeholder="请输入代办事项"
        type="text"
        value={value}
        onChange={changeValue}
      />
      <button type="button" onClick={handleClick}>
        生成新的数据
      </button>

      {/* 排序 */}
      <button type="button" onClick={reverseList}>
        翻转数组
      </button>

      {todoList.map((item, index) => {
        return (
          <div key={item.id}>
            <span>{item.value}</span>

            <button type="button" onClick={() => deleteElement(index)}>
              Delete
            </button>

            <button type="button" onClick={() => editElement(item.id)}>
              编辑更新
            </button>
          </div>
        )
      })}
    </div>
  )
}
