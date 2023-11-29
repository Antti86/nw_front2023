import axios from 'axios';
let port = "8000"
// let BaseUrl = `http://backend:${port}/api/Customers`
// let BaseUrl = `http://localhost:${port}/api/Customers`
// let BaseUrl = `/api/Customers`
let BaseUrl = `https://northwindrestapi.azurewebsites.net/api/Customers`
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const Get = async () => {

    const config = {
        headers: {Authorization: token},
    }

    const request = axios.get(BaseUrl, config ) 
    const response = await request;
    return response.data;
}

const Add = async (object) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.post(BaseUrl, object, config)
    const response = await request;
    return response.data;
}

const Remove = async (id) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.delete(BaseUrl + "/" + id + "?forceDelete=false", config)
    // const request = axios.delete(`https://localhost:7148/api/Customers/${id}?forceDelete=false`, config)
    const response = await request;
    return response.data;
}

const Update = async (customer) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.put(BaseUrl + "/" + customer.customerId, customer, config)
    // const request = axios.put(`https://localhost:7148/api/Customers/${customer.customerId}`, customer, config)
    const response = await request;
    return response.data;
}

export default {Get, Add, Remove, Update, setToken}