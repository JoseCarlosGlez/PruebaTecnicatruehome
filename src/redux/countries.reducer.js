/* eslint-disable import/no-anonymous-default-export */

import { GET_ALL_COUNTRIES } from '../types'

const initialState = {
    countries: [],
    error: null
}


export default function(state = initialState, action) {
    switch (action.type) {
        default: return state
    }
}