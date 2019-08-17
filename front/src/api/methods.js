import axios from 'axios';
import { HOSTNAME } from './settings';

const fetchData = (type, categoryId) => axios
  .get(`${HOSTNAME}/api/${type}?${categoryId ? `categoryId=${categoryId}` : ''}`)
  .then(response => response.data);

export { fetchData as default };
