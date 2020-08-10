import PORT from '../port';
const axios = require('axios');
const API_GetAllProducts = `http://${PORT}/Android_Networking/Lab4/getallproducts.php`;
const API_CreateProduct = `http://${PORT}/Android_Networking/Lab4/createproduct.php`;
const API_DeleteProduct = `http://${PORT}/Android_Networking/Lab4/deleteproduct.php`;
const API_UpdateProduct = `http://${PORT}/Android_Networking/Lab4/updateproduct.php`;
const API_SearchProduct = `http://${PORT}/Android_Networking/Lab4/searchproduct.php`;

export const GetAllProducts = async () => {
  try {
    const res = await axios.get(API_GetAllProducts);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const CreateProduct = async (name, price, description) => {
  console.log(name, price, description);
  let bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('price', price);
  bodyFormData.append('description', description);
  try {
    const res = await axios.post(API_CreateProduct, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const DeleteProduct = async (id) => {
  let bodyFormData = new FormData();
  bodyFormData.append('id', id);
  try {
    const res = await axios.post(API_DeleteProduct, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const UpdateProduct = async (id, name, price, description) => {
  let bodyFormData = new FormData();
  bodyFormData.append('id', id);
  bodyFormData.append('name', name);
  bodyFormData.append('price', price);
  bodyFormData.append('description', description);
  try {
    const res = await axios.post(API_UpdateProduct, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const SearchProduct = async (name) => {
  let bodyFormData = new FormData();
  bodyFormData.append('name', name);
  try {
    const res = await axios.post(API_SearchProduct, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
