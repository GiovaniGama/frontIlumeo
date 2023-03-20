import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import { LoginPage } from "./pages/Login"
import { HomePage } from "./pages/HomePage"

export function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    )
}