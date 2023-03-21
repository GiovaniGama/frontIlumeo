import axios from "axios";
import { environment } from "../environments/environments";

const url_api = environment.apiURL || 'Not found URL'

export const api = axios.create({
    baseURL: url_api
})

export const LoginUser = async (user_name: string, password: string) => {
    return api.post('/login', {user_name, password})
}