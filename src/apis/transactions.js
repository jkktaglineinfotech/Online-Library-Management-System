import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getTransactionDetails = async (token) => {
    try {
      const { data } = await client.get("/transaction", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      catchError(error)
    }
  };

