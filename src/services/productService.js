import { getData, postData, putData, deleteData } from './Api';

const PRODUCTS_ENDPOINT = '/products';

export const getProducts = () => getData(PRODUCTS_ENDPOINT);

export const getProduct = (id) => getData(`${PRODUCTS_ENDPOINT}/${id}`);

export const createProduct = (product) => postData(PRODUCTS_ENDPOINT, product);

export const updateProduct = (id, updatedProduct) =>
  putData(`${PRODUCTS_ENDPOINT}/${id}`, updatedProduct);

export const deleteProduct = (id) =>
  deleteData(`${PRODUCTS_ENDPOINT}/${id}`);
