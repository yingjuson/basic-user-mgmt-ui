import axiosClient from "@/api/axios";
import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      const { data } = await axiosClient.get("/api/user");
      setUser(data);
    } catch (e) {
      console.warn("Error ", e);
    }
  };

  const register = async ({ ...data }) => {
    try {
      await csrf();
      await axiosClient.post("/register", data);
      await getUser();
    } catch (e) {
      if (typeof e === "object" && e !== null && "response" in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
      } else {
        console.warn(e);
      }
    }
  };

  const login = async ({ ...data }) => {
    try {
      await csrf();
      await axiosClient.post("/login", data);
      await getUser();
    } catch (e) {
      if (typeof e === "object" && e !== null && "response" in e) {
        console.warn((e as { response: { data: unknown } }).response.data);
      } else {
        console.warn(e);
      }
    }
  };

  return {
    user,
    register,
    login,
  };
};
