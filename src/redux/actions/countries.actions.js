import axios from 'axios'
import {
    DOWNLOAD_ALL_COUNTRIES,
    DOWNLOAD_ALL_COUNTRIES_SUCCESFULL,
    DOWNLOAD_ALL_COUNTRIES_ERROR,
} from './../types'

import { URL } from './../../enums/MagicWords.enum'
/**
 * Download all products 
 * @returns 
 */
export function getAllCountriesAction() {
    return async(dispatch) => {
        dispatch(downloadCountries())
        try {
            const response = (await axios.get(`${URL}/cities`)).data
            dispatch(downloadCountriesSuccesful(response))
        } catch (e) {
            dispatch(downloadCountriesError('hubo un error al descargar la data'))
        }
    }
}

const downloadCountries = () => ({
    type: DOWNLOAD_ALL_COUNTRIES,
    payload: true
})

const downloadCountriesSuccesful = countries => ({
    type: DOWNLOAD_ALL_COUNTRIES_SUCCESFULL,
    payload: countries
})
const downloadCountriesError = (message) => ({
    type: DOWNLOAD_ALL_COUNTRIES_ERROR,
    payload: true,

})