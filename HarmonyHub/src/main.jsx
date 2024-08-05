import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom'
import {Router} from "./routes/Routers.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router}/>
=======
import { Router } from './routes/Router'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router}/>
>>>>>>> efe9ad03c6f268c823805455067bb926c24b9324
)
