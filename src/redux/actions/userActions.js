import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
//Stors user data in redux once loggedin
//Call the action in login page
export const setReduxUserState = (userCreated) => (dispatch) => {
  console.log("userCreated", userCreated);
  if(userCreated.role === "ADMIN"){
    document.location.href = "/admin/home";
  } else {
    document.location.href = "/";
  }
  dispatch({
    type: LOGIN_USER,
    payload: userCreated,
  });
};

export const logout = (dispatch) => {
  document.location.href = "/";
  localStorage.removeItem("userInfo");
  //Dispatch action to clear redux
  dispatch({ type: LOGOUT_USER });
};