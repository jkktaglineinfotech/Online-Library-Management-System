import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createUser = async (userInfo,token) => {
  try {
    const { data } = await client.post("/user", userInfo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    catchError(error);
  }
};

export const getUsers = async (token) => {
  try {
    const { data } = await client.get("/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    catchError(error);
  }
};

export const updateUser = async (id, userInfo,token) => {
  try {
    const { data } = await client.put(
      `/user/${id}`,
      { updateUser: userInfo },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    catchError(error);
  }
};

export const deleteUser = async (id, token) => {
  try {
    const { data } = await client.delete(`/user/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    catchError(error);
  }
};
