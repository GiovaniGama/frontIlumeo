import { http } from "../utils/utils"

export const LoginUser = async (user_name: string, password: string) => {
    return http.post('/login',{ user_name, password })
}

export const createWorkSchedule = async (date_check_in: Date, date_check_out: Date) => {
    return http.post('/create-schedule', {  date_check_in, date_check_out },
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}

export const getWorkSchedule = async() => {
    return http.get('/schedule', 
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}

export const getUser = async() => {
    return http.get('/profile',
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}

export const createUser = async(user_name: string, password: string) => {
    return http.post('/user', { user_name, password },
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}