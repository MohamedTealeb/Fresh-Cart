import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart';
import Category from './Components/Category/Category';
import AuthContextProvider from './Contexts/AuthContextProvider'
import CounterContextProvider from './Contexts/CounterContextProvider'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoute from './Components/ProtectedAuthRoute/ProtectedAuthRoute'
import Productdet from './Components/Productdet/Productdet'
import Product from './Components/Product/Product'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Order from './Components/Order/Order'
import { Offline} from 'react-detect-offline'
import { QueryClientProvider } from 'react-query'
import BrandPro from './Components/BrandPro/BrandPro'

function App() {
  const router= createBrowserRouter([
{path:'',element:<Layout />,children:[ 
  
    {index:true,element: <ProtectedRoute> <Home /></ProtectedRoute> },
    {path:'home',element:<ProtectedRoute> <Home /></ProtectedRoute>},
    {path:'Login',element:<ProtectedAuthRoute> <Login /></ProtectedAuthRoute>},
    {path:'register',element:<ProtectedAuthRoute> <Register /></ProtectedAuthRoute>},
    {path:'product',element:<ProtectedRoute><Product /></ProtectedRoute> },
    
    {path:'brands',element:<ProtectedRoute> <Brands /></ProtectedRoute>},
    {path:'brandproduct/:id',element:<BrandPro />},
    {path:'cart',element:<ProtectedRoute> <Cart /></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute> <Category /></ProtectedRoute>},
    {path:'shippingAddress/:cartId',element:<ProtectedRoute> <ShippingAddress /></ProtectedRoute>},
    {path:'allorder',element:<ProtectedRoute> <Order /></ProtectedRoute>},
    {path:'Productdet/:id',element:<ProtectedRoute> <Productdet /></ProtectedRoute>},
    {path:'*',element:<ProtectedAuthRoute> <Notfound /></ProtectedAuthRoute>},


  
]}
    
  ])

  return <>
  {/* <QueryClientProvider client={QueryClient}> */}
  <AuthContextProvider>
    <CounterContextProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
    {/* <Online>Only shown when you're online</Online> */}
  
    <Offline>
    <div className='fixed bottom-4 start-3 p-4 rounded-md bg-yellow-200'>
      Only shown offline (surprise!)
      </div>
      </Offline>
   
    
    </CounterContextProvider>
  
  </AuthContextProvider>
  {/* </QueryClientProvider>     */}
     
    </>
}

export default App
