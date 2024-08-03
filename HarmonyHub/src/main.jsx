import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {Router} from "./routes/Routers.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router}/>
)
