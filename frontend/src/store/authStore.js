import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth"

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null,
    isCheckingAuth:true,

    signup: async(email,password,fullname) =>{
        set({isLoading:true,error:null});
        try{
            let response = await axios.post(`${API_URL}/signup`,{email,password,fullname});
            set({user: response.data.createdUser,isAuthenticated: true, isLoading: false})
        }catch (error) {
            set({error: error.response.data.message || "Error in signing up", isLoading: false});
            throw error;
        }
    },

    verifyEmail: async(code)=>{
        set({isLoading:true,error:null});
        try {
            let response = await axios.post(`${API_URL}/verify-email`,{code});
            set({user: response.data.email,isAuthenticated: true, isLoading: false})
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading: false});
            throw error;
        }
    }
}))