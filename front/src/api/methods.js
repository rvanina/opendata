import axios from 'axios'
import { HOSTNAME, PORT } from './settings'

export const fetchRegionalData = (categoryId) => {
    if (categoryId) {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/regional?categoryId=${categoryId}`)
        .then((response) => {
            return JSON.parse(response)
        })
    } else {
        return axios.get(`http://${HOSTNAME}:${PORT}/api/regional`)
    }
}

export const fetchMunicipalData = (categoryId) => {
    if (categoryId) {
        try { 
            return axios.get(`http://${HOSTNAME}:${PORT}/api/municipal?categoryId=${categoryId}`)
        } catch (error) {
            console.log(error)
        }
    } else {
        try { 
            return axios.get(`http://${HOSTNAME}:${PORT}/api/municipal`)
        } catch (error) {
            console.log(error)
        }
    }
}

