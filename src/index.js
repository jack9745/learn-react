// webapck 编译的入口文件
// 测试一下
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ShopList from './views/shopList'
import Test from './views/test'
import Table from './views/table'
import Form from './views/form'
import State from './views/state'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

// 添加路由
const router = createBrowserRouter([
  {
    path: '/helloWorld',
    element: <div>helloWorld</div>,
  },
  {
    path: '/',
    element: <App></App>,
  },
  { path: '/shopList', element: <ShopList></ShopList> },
  { path: '/test', element: <Test></Test> },
  { path: '/table', element: <Table></Table> },
  { path: '/form', element: <Form></Form> },
  { path: '/state', element: <State></State> },
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App></App>
    </RouterProvider>

    {/* <App /> */}
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
