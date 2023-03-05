import React, { useState } from 'react'

import { useImmer } from 'use-immer'
// 学习如何更新对象类型的状态数据 以及注意事项

/**
 * Updating Objects in State
 * State can hold any kind of JavaScript value, including objects.
 *
 * . But you shouldn’t change objects that you hold in the React state directly.
 * 你不应该直接改变一个对象
 *
 *  Instead, when you want to update an object,
 *  you need to create a new one (or make a copy of an existing one),
 * and then set the state to use that copy.
 *
 * 当你想要更新一个对象时，（当然这里说的是状态数据）,
 * 你应该创建一个新的对象，然后设置给状态
 *
 *
 *
 */

/**
 * So far you’ve been working with numbers, strings, and booleans.
 *  These kinds of JavaScript values are “immutable”
 * 简单数据类型，他们的值是不变的
 *
 *
 * setX(0) =====>  setX(5)
 *
 * The x state changed from 0 to 5, but the number 0 itself did not change.
 * It’s not possible to make any changes to the built-in primitive values like numbers,
 * 简单是数据类型，它们的值是不可能改变的
 *
 *
 * const [position, setPosition] = useState({ x: 0, y: 0 });
 *
 *
 * 什么是 mutation ？？？
 * Technically, it is possible to change the contents of the object itself.
 *  This is called a mutation:
 * 但是对于一个对象，我们是可以改变它的内容的，这个就是改变
 *
 * 在 React中，虽然对象是可以改变的，但是你应该认为他们也是不可以改变的，
 * 就像 字符串类型，数值类型，布尔类型的值一样，如果你想改变他们，你应该替换他们
 * 这一点非常重要。
 * */

// Treat state as read-only
//  you should treat any JavaScript object that you put into state as read-only.
export default function LearnObject() {
  const user = { weight: '', city: '' }

  const [userData, updateUserData] = useImmer({
    user: {
      city: '',
    },
  })
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    height: '',
    // 嵌套的对象
    user,
  })
  const [userInfo, setUser] = useState(user)
  const changeName = (event) => {
    console.log(event)
    // 为什么这样就会报错呢？官网上好像也没有介绍 为什么不能这样做
    // setFormData({
    //   name: event.target.value,
    // })
    setFormData({
      ...formData,
      name: event.target.value,
    })
    console.log(formData)
  }

  const changeSex = (event) => {
    setFormData({ ...formData, sex: event.target.value })

    // 最新的状态不会打印出来
    console.log(formData)
  }

  // 如果一个表单里有很多表单的字段，是不是要为每个字段都声明事件处理函数
  // 这样就会显示的很冗余

  // 可以这样写 不过首先要为每个表单字段声明name 属性字段
  // [event.target.name]: event.target.value
  const changeHeight = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log(formData)
  }

  // 如果对象有嵌套，如何更新呢

  const changeWeight = (event) => {
    setFormData({
      ...formData,
      user: { ...formData.user, weight: event.target.value },
    })

    console.log(formData)
  }

  // 官网上又解释了说：其实对象不是真正嵌套的，

  /**
   * However, “nesting” is an inaccurate way to think about how objects behave.
   *  When the code executes, there is no such thing as a “nested” object. 
   * You are really looking at two different objects:
   * 其实，嵌套是一种不准确的方法来思考对象的行为，
   * 当代码执行的时候并没有嵌套对象这个东西，
   * 
   * 其实他们是对立的对象，用一个属性指向对方
   * let obj1 = {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    };

    let obj2 = {
      name: 'Niki de Saint Phalle',
      artwork: obj1
    };
   * */

  // 只是为了说明嵌套这种思考方式是不准确的 ？？？
  // 因为用同一个对象去初始化两个状态变量，
  // 如果改变一个状态的值，是不影响另外一个状态的

  const changeWeightTwo = (event) => {
    setUser({
      weight: event.target.value,
    })
  }

  // 这样也可以更新，这样简单一些
  const changCity = (event) => {
    // 更新函数接受一个参数，这个参数是一个代理对象，当我们访问代理对象时
    // 这个 代理对象可以拦截我们的访问 ，然后可以返回一个新的对象给到React
    updateUserData((data) => {
      // How does Immer work?
      // https://beta.reactjs.org/learn/updating-objects-in-state#write-concise-update-logic-with-immer
      // data 是一个proxy
      console.log(data)
      data.user.city = event.target.value
    })

    console.log(userData)
  }
  return (
    <div>
      <input
        className="flex"
        type="text"
        name="name"
        onChange={changeName}
        value={formData.name}
        placeholder="请输入姓名"
      />
      <input
        type="text"
        className="flex"
        name="sex"
        onChange={changeSex}
        value={formData.sex}
        placeholder="请输入性别"
      />

      <input
        type="text"
        className="flex"
        name="height"
        placeholder="请输入身高"
        onChange={changeHeight}
      />

      {/* 请输入体重 */}
      <input
        type="text"
        className="flex"
        name="weight"
        value={formData.user.weight}
        placeholder="请输入体重"
        onChange={changeWeight}
      />

      {/*  这是另外一个体重 */}

      <input
        type="text"
        className="flex"
        name="weight"
        placeholder="请输入体重"
        value={userInfo.weight}
        onChange={changeWeightTwo}
      />

      <input
        type="text"
        name="city"
        className="flex"
        placeholder="请输入城市"
        value={userData.user.city}
        onChange={changCity}
      />
    </div>
  )
}
