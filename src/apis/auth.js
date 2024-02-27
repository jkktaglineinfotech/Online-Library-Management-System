import { catchError } from "../utils/helper";
import client from "./client";

export const signIn = async (authInfo) => {
    try {
      const { data } = await client.post("/auth/sign-in", authInfo);
      return data;
    } catch (error) {
      console.log(error);
      catchError(error)
    }
  };