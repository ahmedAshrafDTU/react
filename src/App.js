import React, { Suspense, lazy, useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Brand from './Components/Brand/Brand';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Categoris from './Components/Categories/Categoris';
import { UserToken } from './Context/UserToken';
import ProtectedRoute from './Components/PrtotectedRoute';
import ProductDetails from './Components/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Loading from './Components/Loading';
import Orders from './Components/Orders';
import WitchList from './Components/WitchList';
import ForgetPassword from './Components/Login/ForgetPassword';
const Cart = lazy(() => import('./Components/Cart/Cart'));


export default function App() {

  let test = 'test'

  let { setIsLogin } = useContext(UserToken)
 
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setIsLogin(localStorage.getItem('userToken'))
    }
  }, [])

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout test={test}></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "/login/forgetpassword",
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              {" "}
              <WitchList></WitchList>
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <Orders></Orders>
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brand></Brand>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading></Loading>}>
              <ProtectedRoute>
                <Cart></Cart>
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "categoris",
          element: (
            <ProtectedRoute>
              {" "}
              <Categoris></Categoris>
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login></Login> },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster></Toaster>
    </>
  )
}
