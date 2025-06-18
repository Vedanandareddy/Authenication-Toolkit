import { create } from "zustand"
// this is global state management library where we create all the functions and states in this file which can be accessed across all files
import axios from "axios"

const AUTH_URL = "http://localhost:5000/api/auth"
axios.defaults.withCredentials = true; // cookies are sent on every request 
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenicated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(
                `${AUTH_URL}/signup`,
                { email, password, name },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Important if you're using cookies/auth
                }
            );

            set({
                user: response.data.user,
                isLoading: false,
                isAuthenicated: true
            })
            return true
        } catch (error) {
            console.log(error)
            set({ isLoading: false, error: error.response.data.message })
            return false
        }
    },
    verifymail: async (enteredcode) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(
                `${AUTH_URL}/verify-email`,
                { enteredcode },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Important if you're using cookies/auth
                }
            );

            set({
                user: response.data.user,
                isLoading: false,
                isAuthenicated: true
            })
            return true
        } catch (error) {
            console.log(error)
            set({ isLoading: false, error: error.response.data.message })
            return false
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(
                `${AUTH_URL}/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Important if you're using cookies/auth
                }
            );

            set({
                user: response.data.user,
                isLoading: false,
                isAuthenicated: true
            })
            return true
        } catch (error) {
            console.log(error)
            set({ isLoading: false, error: error.response.data.message })
            return false
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.get(
                `${AUTH_URL}/logout`);
            set({
                user: null,
                isLoading: false,
                isAuthenicated: false
            })
            return true
        } catch (error) {
            console.log(error)
            set({ isLoading: false, error: error.response.data.message })
            return false
        }
    },
    checkauth: async () => {
        try {
            set({ isCheckingAuth: true, error: null });

            const response = await axios.get(`${AUTH_URL}/check-auth`);
            console.log("checking auth from authstore", response.data.message);
            set({
                isAuthenicated: true,
                user: response.data.user,
                isCheckingAuth: false
            });
            console.log(response.data.user)
            return { success: true, user: response.data.user };
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message;
            console.log("Error checking auth", errorMsg);

            set({
                isCheckingAuth: false,
                isAuthenicated: false,
                error: errorMsg
            });

            return { success: false, error: errorMsg };
        }
    },
    forgotpassword: async (email) => {
        try {
            set({ isLoading: true })
            const response = await axios.post(
                `${AUTH_URL}/forgot-password`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Important if you're using cookies/auth
                }
            );
            set({ isLoading: false })
            return true
        } catch (error) {
            console.log(error)
            set({ error: error.response.data.message, isLoading: false })
            return false
        }
    },
    resetpassword: async (newpassword, token) => {
        try {
            set({ isLoading: true })
            const response = await axios.post(
                `${AUTH_URL}/reset-password/${token}`,
                { newpassword },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Important if you're using cookies/auth
                }
            );
            set({ isLoading: false })
            console.log(response.data.message)
            return true
        } catch (error) {
            console.log(error)
            set({ error: error.response.data.message, isLoading: false })
            return false
        }
    }
}))