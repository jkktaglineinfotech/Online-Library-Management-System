import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getBooks = async (token) => {
    try {
      const { data } = await client.get("/book", {
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

  export const createBook = async (bookInfo,token) => {
    try {
      const { data } = await client.post("/book", bookInfo,{
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

  export const updateBook = async (bookInfo, bookId,token) => {
    try {
      const { data } = await client.put(`/book/${bookId}`, bookInfo,{
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

  export const deleteBook = async (bookId,token) => {
    try {
      const { data } = await client.delete(`/book/${bookId}`, {
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

