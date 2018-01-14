// @flow

//  API Endpoints
export const BASE_URL = 'http://localhost:3001';
export const IMAGE_URL = `${BASE_URL}/image`;
export const API_REGISTER = `${BASE_URL}/seller`;
export const API_LOGIN = `${BASE_URL}/seller/login`;
export const API_MEMO = `${BASE_URL}/memo`;
export const API_GET_DELIVERY_LIST = `${BASE_URL}/delivery`;
export const API_ACCOUNT = `${BASE_URL}/seller`;
export const API_MENU = `${BASE_URL}/menu`;
export const API_ORDER = `${BASE_URL}/order`;
export const API_IMAGE = `${BASE_URL}/image`;

// Default Map Config
export const DEFAULT_LATITUDE = 35.652832;
export const DEFAULT_LONGITUDE = 139.839478;

// Order State
export const ORDER_STATE = {
  cancelled: 'cancelled',
  waiting: 'waiting',
  finished: 'finished',
};
