import axios from "axios"

const baseUrl = axios.create({
    baseURL: 'https://bio-poem.onrender.com'
})

export default baseUrl