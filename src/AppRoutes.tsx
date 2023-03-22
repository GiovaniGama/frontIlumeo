import React, { useContext } from "react"

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import { LoginPage } from "./pages/Login"
import { HomePage } from "./pages/HomePage"
import { AuthProvider, AuthContext } from "./contexts/auth"
import { IProps } from "./interfaces/props.interface"
import { CreateUser } from "./pages/Create-user"

export function AppRoutes(){

    function Private({children, ...props}: IProps): JSX.Element | any{
        const { authenticated, loading }: IProps = useContext(AuthContext)

        if(loading){
            return (
                <div className="loading">
                    Carregando...
                </div>
            )  
        }

        if(!authenticated){
            return <Navigate to="/Login"/>
        }

        return children;
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/create-user" element={<CreateUser/>}/>
                    <Route path="/" 
                    element={
                        <Private>
                            <HomePage/>
                        </Private>
                    }/>
                </Routes>
            </AuthProvider>
        </Router>
    )
}