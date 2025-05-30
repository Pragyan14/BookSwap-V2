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

    verifyEmail: async(verificationToken)=>{
        set({isLoading:true,error:null});
        try {
            let response = await axios.get(`${API_URL}/verify-email`,{
                params: {verificationToken: verificationToken}
            });
            console.log(response.data.message);
            
            set({isAuthenticated: false, isLoading: false})
            return true;
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading: false});
            throw error;
        }
    }
}))