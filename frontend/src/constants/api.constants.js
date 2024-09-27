const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1";

export const GET_USER = (userId) => `${BACKEND_URL}/users/${userId}`;
export const SIGNUP = `${BACKEND_URL}/users/signup`;
export const LOGIN = `${BACKEND_URL}/users/login`;
