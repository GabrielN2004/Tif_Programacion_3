import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";
import { Navbar } from "../components/Navbar";

export default function Layout() {
    return (
        <AuthProvider>
            <div>
                <ThemeProvider>
                    <Outlet/>
                </ThemeProvider>
            </div>
        </AuthProvider>
    );
}