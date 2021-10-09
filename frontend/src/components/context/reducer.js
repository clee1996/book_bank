import React, { useReducer } from "react";

let user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) :
  "";

let loggedIn = localStorage.getItem("loggedIn") ? localStorage.getItem("loggedIn") : false


export const initialState = {
  userDetails: user === "" ? "" : user,
  login: loggedIn === "true"? true: false,
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload.user,
        login: true,
        loading: false
      };
    case "LOGOUT":
      return {
        errorMessage: null,
        loading: false,
        userDetails: "",
        login: false
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
