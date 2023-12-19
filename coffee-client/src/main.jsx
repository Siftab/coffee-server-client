import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './compnenets/AddCoffee.jsx';
import UpdateCoffee from './compnenets/UpdateCoffee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    loader: ()=>fetch('http://localhost:5000/coffees')
  },
  {
    path:'/addCoffe',
    element:<AddCoffee></AddCoffee>
  },
  {
    path:'/updateCoffee/:id',
    element:<UpdateCoffee></UpdateCoffee>,
    loader: ({params})=>fetch(`http://localhost:5000/updateCoffee/${params.id}`)
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
