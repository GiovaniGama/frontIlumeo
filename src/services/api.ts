import axios from "axios";
import { environment } from "../environments/environments";

const url_api = 'http://localhost:3000'

export const api = axios.create({
    baseURL: url_api
})

export const LoginUser = async (user_name: string, password: string) => {
    return axios.post('http://localhost:3000/login',{ user_name, password })
}

export const createWorkSchedule = async (date_check_in: Date, date_check_out: Date) => {
    return axios.post('http://localhost:3000/create-schedule', {  date_check_in, date_check_out }, 
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}

export const getWorkSchedule = async() => {
    return axios.get('http://localhost:3000/schedule',
    {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
}