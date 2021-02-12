/* eslint-disable no-unused-vars */
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

export const PRODUCTGROUP_URL = `${CONST.API_URL}/productgroup`;

export const addProductGroup = (payload) => {
  return axios.post(`${PRODUCTGROUP_URL}`, payload);
};
export const updateProductGroup = (id, payload) => {
  return axios.put(`${PRODUCTGROUP_URL}/${id}`, payload);
};
export const deleteProductGroup = (id) => {
  return axios.delete(`${PRODUCTGROUP_URL}/${id}`);
};
export const getProductGroup = (id) => {
  return axios.get(`${PRODUCTGROUP_URL}/${id}`);
};
export const getProductGroupAll = () => {
  return axios.get(`${PRODUCTGROUP_URL}/all`);
};

export const getProductGroupFilter = (
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
  return axios.get(encodeURLWithParams(`${PRODUCTGROUP_URL}/filter`, payload));
};
