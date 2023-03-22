import React, { createContext, useState, useEffect } from "react"
import { IProps } from "../interfaces/props.interface"
import { useNavigate } from "react-router-dom"
import { LoginUser } from "../services/api"
import { http } from "../utils/utils"

export const AuthContext = createContext({})

export function AuthProvider({children}: IProps){
    const navigate = useNavigate()
    const [user, setUser] = useState(null ) 
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const recoverUser = window.localStorage.getItem('user')
        const token = window.localStorage.getItem('token')

        if(recoverUser){
            setUser(JSON.parse(recoverUser))
            http.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    async function login(user: string, password: string){       
        const response = await LoginUser(user, password)

        const loggedUser = response.data.user
        const token = response.data.token

        window.localStorage.setItem("user", JSON.stringify(loggedUser))
        window.localStorage.setItem("token", token)

        http.defaults.headers.Authorization = `Bearer ${token}`

        setUser(loggedUser)
        navigate("/")
    }

    function logout(){
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("token")
        http.defaults.headers.Authorization = null
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