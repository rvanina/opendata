import axios from 'axios'
import { HOSTNAME, PORT } from './settings'

export const fetchData = (type, categoryId) => {
    if (categoryId) {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/${type}?categoryId=${categoryId}`)
        .then((response) => {
            return response.data
        })
    } else {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/${type}`)
        .then((response) => {
            return response.data
        })
    }
}

