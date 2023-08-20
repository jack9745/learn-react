import { createBrowserRouter } from 'react-router-dom'

import ShopList from '../views/shopList'
import Test from '../views/test'
import Table from '../views/table'
import Form from '../views/form'
import State from '../views/state'

import Emergency from '../views/emergency'

// 添加路由
export const router = createBrowserRouter([
  {
    path: '/helloWorld',
    element: <div>helloWorld</div>
  },
  // {
  //   path: '/',
  //   element: <App></App>
  // },
  { path: '/shopList', element: <ShopList></ShopList> },
  { path: '/test', element: <Test></Test> },
  { path: '/table', element: <Table></Table> },
  { path: '/form', element: <Form></Form> },
  { path: '/state', element: <State></State> },
  { path: '/emer', element: <Emergency></Emergency> }
])
