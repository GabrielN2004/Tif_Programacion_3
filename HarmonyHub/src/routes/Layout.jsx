import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@teishi/bulma_theme";


export default function Layout() {
    return (
        <AuthProvider>
            <div
            >
                <ThemeProvider>
                    <Outlet />
                </ThemeProvider>
            </div>
        </AuthProvider>
    );
}
