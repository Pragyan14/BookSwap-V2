import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth"

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,

    signup: async (email, password, fullname) => {
        set({ isLoading: true, error: null });
        try {
            let response = await axios.post(`${API_URL}/signup`, { email, password, fullname });
            set({ user: response.data.createdUser, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error in signing up", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (verificationToken) => {
        set({ isLoading: true, error: null });
        try {
            let response = await axios.get(`${API_URL}/verify-email`, {
                params: { verificationToken: verificationToken }
            });
            set({ isLoading: false })
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            let response = await axios.post(`${API_URL}/login`, { email, password })
            set({ isLoading: false, user: response.data.data, isAuthenticated: true })
        } catch (error) {
            set({ error: error.response.data.message || "Error in login", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            let response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.data, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token invalid or missing - not an error, just not logged in
                set({ user: null, isAuthenticated: false, isCheckingAuth: false, error: null });
            } else {
                // Other errors: log or set error if you want
                set({ error: error.response?.data?.message || "Error checking auth", isCheckingAuth: false });
            }
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            let response = await axios.post(`${API_URL}/logout`);
            set({ isLoading: false, isAuthenticated: false, user: null })
        } catch (error) {
            set({ error: error.response.data.message || "Error in logout", isLoading: false });
            throw error;
        }
    },

    forgotPassword: async(email) => {
        console.log(email);
        
        set({ isLoading: true, error: null });
        try {
            let response = await axios.post(`${API_URL}/forgot-password`,{email});
            set({ isLoading: false, isAuthenticated: false, user: null })
        } catch (error) {
            set({ error: error.response.data.message || "Error sending reset password email", isLoading: false });
            throw error;
        }
    },

}))