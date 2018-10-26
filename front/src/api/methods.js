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

export const fetchRegionalData = (categoryId) => {
    if (categoryId) {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/regional?categoryId=${categoryId}`)
        .then((response) => {
            return response.data
        })
    } else {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/regional`)
        .then((response) => {
            return response.data
        })
    }
}

export const fetchMunicipalData = (categoryId) => {
    if (categoryId) {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/municipal?categoryId=${categoryId}`)
        .then((response) => {
            return response.data
        })
    } else {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/municipal`)
        .then((response) => {
            return response.data
        })
    }
}

