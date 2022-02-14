/* eslint-disable import/no-anonymous-default-export */

import { DOWNLOAD_ALL_COUNTRIES, DOWNLOAD_ALL_COUNTRIES_ERROR, DOWNLOAD_ALL_COUNTRIES_SUCCESFULL } from './../types'

const initialState = {
    countries: [],
    error: null,
    loading: false
}


export default function(state = initialState, action) {

    switch (action.type) {
        case DOWNLOAD_ALL_COUNTRIES:
            return {
                ...state,
                loading: action.payload
            }
        case DOWNLOAD_ALL_COUNTRIES_SUCCESFULL:
            return {
                ...state,
                countries: action.payload,
                error: null,
                loading: false

            }
        case DOWNLOAD_ALL_COUNTRIES_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false

            }
        default:
            return state
    }
}