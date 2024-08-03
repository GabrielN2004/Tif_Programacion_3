import { createBrowserRouter } from "react-router-dom";
import ListaPlaylist from "../components/ListaPlaylist";
import { SongsPage } from "../components/SongsPage";


const Router= createBrowserRouter([
    {
        path: "/Playlist",
        element: <ListaPlaylist/>
    },
    {
        path: "/Songs",
        element: <SongsPage/>
    }

]);
export {Router};
