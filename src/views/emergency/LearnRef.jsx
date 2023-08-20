import React, { useState, useRef } from 'react'

// 这里学习ref 钩子

//什么时候需要用到ref
/**
 * 1.你希望组件能够记住某些信息 ，但是又不希望这些信息触发新的渲染，可以用ref
 * 2.操作DOM需要用到ref ，一般情况下，React自动处理DOM的更新，不需要开发者自己处理
 * 但是 有些情况下，我们还是需要访问这些DOM元素的，比如让一个元素获取焦点，
 * 让一个元素滚动到什么地方，或者获取一个元素的尺寸和位置 ，这些都需要一个指向dom 的ref来实现
 * */
// 我的理解就是，希望不要被渲染，但是组件的逻辑又需要的
//怎么用 ref

export default function LearnRef() {
  return (
    <div>
      <RefBasic></RefBasic>
      <RefList></RefList>
    </div>
  )
}
function RefBasic() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('')

  // 声明一个指向DOM的ref，但是在哪里可以访问到这个ref 官网上说可以在事件处理器上setFocus
  const inputRef = useRef(null)

  // 接受一个初始值作为 唯一参数  ref值可以读也可以写 ,其他state的改变不会影响ref值，
  const ref = useRef(0)
  console.log(ref) // {current:0}
  const handleClick = () => {
    ref.current = ref.current + 1
    alert('你点击我了' + ref.current)
  }

  const clickTwo = () => {
    setCount(count + 1)
  }

  // 处理得到焦点
  const setFocus = () => {
    inputRef.current.focus()
  }
  return (
    <div style={{ padding: '10px', margin: '10px', border: '1px solid #ccc' }}>
      <button
        style={{ width: '100px', display: 'block', marginBottom: '10px' }}
        onClick={handleClick}
      >
        {/* 这里的值始终是 0 因为不会触发重新渲染 */}
        点击我 {ref.current}
      </button>

      <button onClick={clickTwo} style={{ height: '40px' }}>
        你也来点击我，这个是state {count}
      </button>

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="请输入"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={setFocus}>获取焦点</button>
      </div>
    </div>
  )
}

/**
 * 什么是ref回调函数 ？？如果某个元素上ref属性是一个函数，
 * 当这个DOM节点被渲染到屏幕上的时候 该回调函数会被执行，参数是这个节点
 * 回调函数在每次渲染时都是不同的函数。
 * 注意事项
 * 当组件重新渲染时，先前的函数将被调用并传递 null 作为参数，
 * 并且下一个函数将被调用并传递对应 DOM 节点作为参数。
 * */
const RefList = () => {
  const [taskList, setTaskList] = useState([
    { title: 'do homework' },
    { title: 'wash the dishes' },
    {
      title: 'watch TV'
    },

    { title: 'see a Fielm' },
    { title: 'cook dinner' },

    { title: 'have dinner' },
    { title: 'see a Fielm11' },
    { title: 'cook dinner1' },

    { title: 'have dinner111' }
  ])
  const liRef = useRef(null)
  const handleClick = (index) => {}
  return (
    <div>
      <button onClick={() => handleClick(2)}>第二个</button>
      <button onClick={() => handleClick(5)}>第五个</button>
      <button onClick={() => handleClick(8)}>第八个</button>

      <ul
        style={{
          padding: '10px',
          margin: '10px',
          border: '1px solid #ccc',
          display: 'flex',
          width: '300px',
          overflow: 'auto'
        }}
      >
        {taskList.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                width: '200px',
                height: '50px',
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
                wordBreak: 'keep-all'
              }}
            >
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
