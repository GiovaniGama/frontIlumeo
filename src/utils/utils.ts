import axios from "axios";
import { environment } from "../environments/environments.prod";

const url_api = environment.apiURL

export const http = axios.create({
    baseURL: url_api
})