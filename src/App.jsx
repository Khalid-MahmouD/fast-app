import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./ui/Home"
import Error from "./ui/Error"
import Menu, { Loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import Order, { loader as orderLoader } from './features/order/Order'
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder'
import AppLayout from "./ui/AppLayout"

// handle page nor 
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart', element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        // whenever there a form submission this will be called
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,

      },
    ],

  },
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
