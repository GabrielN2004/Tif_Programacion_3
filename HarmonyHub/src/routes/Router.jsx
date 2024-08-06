import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import SongsPage from "../components/SongsPage";
import ListaPlaylist from "../components/ListaPlaylist";
import Profile from "../components/Profile";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path:"/songs",
                element: <SongsPage/>
            },
            {
                path:"/playlists",
                element: <ListaPlaylist/>
            },
            {
                path:"/profile",
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
