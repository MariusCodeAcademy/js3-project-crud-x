import axios from 'axios';

const catBaseUrl = 'http://localhost:4000/api/shop/categories';
const itemBaseUrl = 'http://localhost:4000/api/shop/items';

const request = {
  getCategories: async () => {
    try {
      const categoriesResult = await axios.get(catBaseUrl);
      return categoriesResult.data;
    } catch (err) {
      console.log(err);
    }
  },
  getItems: async () => {
    try {
      const itemsResult = await axios.get(itemBaseUrl);
      return itemsResult.data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default request;
