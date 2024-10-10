import axios from "axios";

export const api = axios.create({
    baseURL: "https://expensetracker-67bc.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
})
