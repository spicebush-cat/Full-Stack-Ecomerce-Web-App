
import axios from 'axios';
import AppURL from './AppURL';

export const getProductsByRemark = (remark) =>
  axios
    .get(AppURL.ProductListByRemark(remark))
    .then(res => res.data);
