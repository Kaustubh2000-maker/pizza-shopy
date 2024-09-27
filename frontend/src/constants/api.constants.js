const BACKEND_URL = process.env.REACT_APP_BACKEND_URL + "/api/v1";

//for auth-scontext
export const GET_USER = (userId) => `${BACKEND_URL}/users/${userId}`;
export const SIGNUP = `${BACKEND_URL}/users/signup`;
export const LOGIN = `${BACKEND_URL}/users/login`;

//for data-context

export const pizzas_url = `${BACKEND_URL}/pizzas`;
export const beverages_url = `${BACKEND_URL}/beverages`;

// cart add

export const ADD_CART = (userId) => `${BACKEND_URL}/users/${userId}`;
