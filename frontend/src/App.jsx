import React from 'react';
import { Stack } from '@mui/material'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import Footer from './components/StoreLayout/footer/Footer'
import About from './components/StoreLayout/pages/About/About'
import Contact from './components/StoreLayout/pages/Contact/Contact'
import Home from './components/StoreLayout/pages/Home/Home'
import NotFound from './components/common/NotFound/NotFound'
import Product from './components/StoreLayout/pages/Product/Product'
import Products from './components/StoreLayout/pages/Products/Products'
import Checkout from './components/StoreLayout/pages/checkout/Checkout'
import Dashboard from './components/AdminLayout/Dashboard'
import Analytics from './components/AdminLayout/analytics/Analytics'
import Orders from './components/AdminLayout/orders/Orders'
import StoreInfos from './components/AdminLayout/storeInfos/StoreInfos'
import UserManagement from './components/AdminLayout/userManagement/UserManagement'
import Header from './components/StoreLayout/header/Header'
import Warehouse from './components/AdminLayout/warehouse/Warehouse'
import MainMenu from './components/AdminLayout/mainMenu/MainMenu'
import { useDispatch } from 'react-redux'
import { fetchStoreProducts } from './features/products/productsSlice'
import { fetchStoreInfos } from './features/storeinfos/storeInfosSlice';
import Inbox from './components/AdminLayout/inbox/Inbox';
import Login from './components/AdminLayout/login/Login';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';


/* Separate admin layout from basic layout */
function BasicLayout() {
  const { pathname } = useLocation()
  //fetching data once mon mount
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchStoreInfos())
    dispatch(fetchStoreProducts())
  }, [])
  return (
    <div className="App" >
        {
          /* checkout route's page has its own footer and header, so we render it separately without header and footer*/
          pathname == '/checkout' ? <Outlet /> :
            <Stack justifyContent={'space-between'}>
              <Header />
              <Outlet />
              <Footer />
            </Stack>
        }
    </div>
  )
}

function AdminLayout() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}


function App() {
  return (
    <Routes>
      <Route path='/' element={<BasicLayout />}>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/products'  >
          <Route index element={<Products />} />
          <Route path=':id' element={<Product />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Route>

      <Route path='/checkout' element={<BasicLayout />}>
        <Route index element={<Checkout />} />
      </Route>

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Navigate to={'/admin/login'} replace />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<ProtectedRoute component={<Dashboard />} />}>
          <Route index element={<Navigate to={'/admin/dashboard/menu'} replace />} />
          <Route path='menu' element={<MainMenu />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='inbox' element={<Inbox />} />
          <Route path='orders' element={<Orders />} />
          <Route path='warehouse' element={<Warehouse />} />
          <Route path='storeinfos' element={<ProtectedRoute roles={['owner']} component={<StoreInfos />}/>} />
          <Route path='accounts' element={<ProtectedRoute roles={['owner']} component={<UserManagement />}/>} />
        </Route>

      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
