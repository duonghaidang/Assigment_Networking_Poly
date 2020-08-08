import PORT from '../port';
const axios = require('axios');
const API_User = `http://${PORT}/Android_Networking/Lab4/index.php`;

export const Login = async (email, password) => {
  let bodyFormData = new FormData();
  bodyFormData.append('email', email);
  bodyFormData.append('password', password);
  bodyFormData.append('tag', 'login');
  try {
    const res = await axios.post(API_User, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const Register = async (email, username, password) => {
  console.log(email, password);

  let bodyFormData = new FormData();
  bodyFormData.append('email', email);
  bodyFormData.append('username', username);
  bodyFormData.append('password', password);
  bodyFormData.append('tag', 'register');
  try {
    const res = await axios.post(API_User, bodyFormData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
