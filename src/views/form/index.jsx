// 学习表单组件
// 学习 更新状态 包括状态的增删改查

import React from 'react'
import { useState } from 'react'
import { Button, Input, Form } from 'antd'
export default function Index() {
  // const [formData, setFormData] = useState({ startAddress: '' })
  const [formData] = Form.useForm()
  const handleChange = (event) => {
    console.log(event.target.value)
  }

  const saveData = () => {}
  const submitData = async (data) => {
    try {
      const result = await formData.validateFields()
      console.log(result)
    } catch (error) {
      //  这里可以拿到错误信息
      console.log(error)
    }

    console.log('submit')
  }

  // 校验数据是否符合要求
  const validate = () => {}

  // 表单数据校验通过 触发这个事件
  const onFinish = (value) => {
    // 这是要提交的表单数据
    console.log(value)
  }

  // 表单校验失败触发这个事件
  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log('校验不通过')
  }
  return (
    <div>
      <Form
        form={formData}
        name="control-hooks"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <Form.Item
          name="startAddress"
          label="运输起点"
          rules={[{ required: true, message: '请输入运输起点' }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name={'startContact'}
          label="联系人"
          rules={[{ required: true, message: '请输入联系人' }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name={'startPhone'}
          label="联系电话"
          rules={[{ required: true, message: '请输入联系电话' }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            onClick={saveData}
            style={{ marginRight: '10px' }}
          >
            保存
          </Button>
          <Button type="primary" htmlType="submit" onClick={submitData}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
