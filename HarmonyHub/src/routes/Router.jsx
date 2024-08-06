import { createBrowserRouter } from "react-router-dom";
import  Home  from "../components/Home";
import SongsPage from "../components/SongsPage";
import Layout from "./Layout";
import Login from "../components/Auth/Login";
import ListaPlaylist from "../components/ListaPlaylist";
import Profile from "../components/Profile";


const Router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path:"/songs",
                element: <SongsPage/>
            },
            {
                path:"/playlists",
                element: <ListaPlaylist/>
            }
        ],
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/profile",
        element : <Profile/>
    }
]);
export {Router}