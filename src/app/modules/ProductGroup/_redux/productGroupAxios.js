/* eslint-disable no-unused-vars */
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

export const PRODUCTGROUP_URL = `${CONST.LOCAL_API_URL}/productgroup`;

export const addProductGroup = (payload) => {
  debugger;
  return axios.post(`${PRODUCTGROUP_URL}`, payload);
};
export const editProductGroup = (payload, Id) => {
  return axios.put(`${PRODUCTGROUP_URL}/${Id}`, payload);
};
export const deleteProductGroup = (Id) => {
  return axios.delete(`${PRODUCTGROUP_URL}/${Id}`);
};
export const getProductGroup = (Id) => {
  return axios.get(`${PRODUCTGROUP_URL}/${Id}`);
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
