import { createBrowserRouter } from "react-router-dom";
import  Home  from "../components/Home";
import SongsPage from "../components/SongsPage";
import Layout from "./Layout";
import Login from "../components/Auth/Login";


const Router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path:"/",
                element: <Home />,
            },
            {
                path:"/Songs",
                element: <SongsPage/>
            }
        ],
    },
    {
        path:"/login",
        element: <Login/>
    }
]);
export {Router}