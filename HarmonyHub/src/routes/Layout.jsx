import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@teishi/bulma_theme";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";

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