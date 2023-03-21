import React, { createContext, useState, useEffect } from "react"
import { IProps } from "../interfaces/props.interface"
import { useNavigate } from "react-router-dom"
import { api, LoginUser } from "../services/api"

export const AuthContext = createContext({})

export function AuthProvider({children, ...props}: IProps){
    const navigate = useNavigate()
    const [user, setUser] = useState(null ) 
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const recoverUser = localStorage.getItem('user')

        if(recoverUser){
            setUser(JSON.parse(recoverUser))
        }

        setLoading(false)
    }, [])

    async function login(user: string, password: string){
        
        const response = await LoginUser(user, password)

        console.log('login', response.data);

        const loggedUser = response.data.user
        const token = response.data.token

        localStorage.setItem("user", JSON.stringify(loggedUser))
        localStorage.setItem("token", JSON.stringify(token))

        api.defaults.headers.Authorization = `Bearer ${token}`

        setUser(loggedUser)
        navigate("/")
    }

    function logout(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate("/login")
    }

    return(
        <AuthContext.Provider 
            value={{authenticated: !!user, user, loading, login, logout}}>
                {children}
        </AuthContext.Provider>
    )
}