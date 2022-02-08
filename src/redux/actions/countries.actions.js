import axios from 'axios'
import { GET_ALL_COUNTRIES } from '../../types/'

export function getAllCountries() {
    return async() => {
        let x = await axios.get('http://localhost:3004/cities')
        console.log(x)
    }
}