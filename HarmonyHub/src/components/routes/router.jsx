import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Home } from "../Home";

const Router = createBrowserRouter([
    {
        element : <Layout/>,
        children : [ {
            index : true,
            element : <Home/>
        }
        ]
    }
])