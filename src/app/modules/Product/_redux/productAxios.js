/* eslint-disable no-unused-vars */
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

export const PRODUCT_URL = `${CONST.API_URL}/products`;

export const addProduct = (payload) => {
  return axios.post(`${PRODUCT_URL}`, payload);
};
export const updateProduct = (id, payload) => {
  return axios.put(`${PRODUCT_URL}/${id}`, payload);
};
export const deleteProduct = (id) => {
  return axios.delete(`${PRODUCT_URL}/${id}`);
};
export const getProduct = (id) => {
  return axios.get(`${PRODUCT_URL}/${id}`);
};
export const getProductAll = () => {
  return axios.get(`${PRODUCT_URL}/all`);
};

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  name
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    name,
  };
  return axios.get(encodeURLWithParams(`${PRODUCT_URL}/filter`, payload));
};
