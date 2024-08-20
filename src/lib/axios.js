import axios from "axios";

export const api = axios.create({
    baseURL: "https://expense-tracker-back-8o25.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
})