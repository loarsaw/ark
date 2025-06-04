import { axiosInstance } from "@/utils/axiosIntance";
import { useState } from "react";

interface User {
  uid: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log(user, "user");
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const signup = async (email: string, password: string) => {
    try {
      await axiosInstance.post<AuthResponse>("/signup", {
        email,
        password,
      });
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Signup failed");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post<AuthResponse>("/signin", {
        email,
        password,
      });
      const { user, token } = res.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    token,
    signup,
    login,
    logout,
    isAuthenticated: !!token,
  };
};
