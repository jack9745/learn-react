export const updateTask = (taskList, action) => {
  console.log(taskList)
  switch (action.type) {
    case 'added':
      // 添加一个数据
      // taskList 为什么有四个元素，并且第四个元素还是空的，明明初始化数据只有三条
      const list = [
        ...taskList,
        {
          id: action.id,
          text: action.text,
          done: action.done
        }
      ]
      // list.push(action)
      return list

    // 改变复选框的值
    case 'changeCheck':
      return taskList.map((item) => {
        if (item.id === action.id) {
          return { ...item, done: !item.done }
        }
        return item
      })
    case 'delete':
      const list1 = taskList.filter((item) => {
        return item.id !== action.id
      })

      console.log(list1)
      return list1

    case 'changeValue':
      return taskList.map((item) => {
        if (item.id === action.id) {
          return { ...item, text: action.text }
        }
        return item
      })
    case 'edit':
      // 添加一个字段 edit :true;

      return taskList.map((item) => {
        if (item.id === action.id) {
          return { ...item, edit: true }
        }
        return item
      })

    case 'save':
      return taskList.map((item) => {
        if (item.id === action.id) {
          return { ...item, edit: false }
        }
        return item
      })

    default:
  }
}
