import axios from 'axios';
import { HOSTNAME, PORT } from './settings';

const fetchData = (type, categoryId) => axios
  .get(`http://${HOSTNAME}:${PORT}/api/${type}?${categoryId ? `categoryId=${categoryId}` : ''}`)
  .then(response => response.data);

export { fetchData as default };
