import axios from 'axios'
import { finishedPoem } from './store/formSlice'


export const submitPoem = async (data:finishedPoem) => {
    const url = `https://bio-poem.onrender.com/api/v1/poems/${data.id}/create-poem`;
    try {
        const response = await axios.post(url, data.data);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}