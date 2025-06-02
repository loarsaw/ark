import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https:closing-dinosaur-apt.ngrok-free.app/api",
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
    }
})