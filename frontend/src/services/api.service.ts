import axios from "axios";
import { SignInDto } from "../shared/dtos/signInDto";
import { SignUpDto } from "../shared/dtos/signUpDto";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const apiService = {
  signIn: async (payload: SignInDto) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, payload);
      if (response.data.message) {
        toast.success(response.data.message || "Sign in successful");
      }

      if (response.status === 200) {
        localStorage.setItem("jwt", response.data.accessToken);
        return response.data.user;
      }
      return response.data; // Assuming the response contains a JWT token
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "An error occurred during sign in."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },

  signUp: async (payload: SignUpDto) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, payload);
      if (response.data.message) {
        toast.success(response.data.message || "Sign up successful");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "An error occurred during sign up."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },

  fetchProfile: async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return null;
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data || null; // Assuming the response contains profile data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred during fetching profile."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
      throw error;
    }
  },
};

export default apiService;
