import axios from 'axios';

const catBaseUrl = 'http://localhost:4000/api/shop/categories';
const itemBaseUrl = 'http://localhost:4000/api/shop/items';
const usersBaseUrl = 'http://localhost:4000/api/shop/shopusers';
const cartBaseUrl = 'http://localhost:4000/api/shop/cart';

export const getCategories = async () => {
  try {
    const categoriesResult = await axios.get(catBaseUrl);
    return categoriesResult.data;
  } catch (err) {
    console.log(err);
  }
};
export const getItems = async () => {
  try {
    const itemsResult = await axios.get(itemBaseUrl);
    return itemsResult.data;
  } catch (err) {
    console.log(err);
  }
};
export const getSingleItem = async (singleItemId) => {
  try {
    const itemsResult = await axios.get(itemBaseUrl + '/' + singleItemId);
    return itemsResult.data;
  } catch (err) {
    console.log(err);
  }
};
export const getUsers = async () => {
  try {
    const users = await axios.get(usersBaseUrl);
    return users.data;
  } catch (err) {
    console.log(err);
  }
};

// add to cart
export const addToCart = async (userId, cartObj) => {
  try {
    const ats = await axios.post(`${cartBaseUrl}/${userId}`, cartObj);
    // console.log(ats.data);
    return ats.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCartItems = async (userId) => {
  // console.log('trying to get all cart items');
  const ats = await axios.get(`${cartBaseUrl}/${userId}`);
  return ats;
};

export const getCartCount = async (userId) => {
  // send get rq to get cart count
  // console.log('send get rq to get cart count');
  const ats = await axios.get(`${cartBaseUrl}/count/${userId}`);
  return ats.data;
};
