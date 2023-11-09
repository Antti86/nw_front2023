import axios from 'axios';

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const Get = async () => {

    const config = {
        headers: {Authorization: token},
    }
    let Url = "https://localhost:7148/api/Customers";
    const request = axios.get(Url, config ) 
    const response = await request;
    return response.data;
}

const Add = async (object) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.post(`https://localhost:7148/api/Customers`, object, config)
    const response = await request;
    return response.data;
}

const Remove = async (id) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.delete(`https://localhost:7148/api/Customers/${id}?forceDelete=false`, config)
    const response = await request;
    return response.data;
}

const Update = async (customer) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.put(`https://localhost:7148/api/Customers/${customer.customerId}`, customer, config)
    const response = await request;
    return response.data;
}

export default {Get, Add, Remove, Update, setToken}