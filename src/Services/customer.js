import axios from 'axios';

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const GetCustomers = (search) => {

    const config = {
        headers: {Authorization: token},
    }
    let Url = "";

    if (search === "" || search === null)
    {
        Url = `https://localhost:7148/api/Customers`;
    }
    else
    {
        Url = `https://localhost:7148/api/Customers/companyname/${search}`
    }


    const request = axios.get(Url, config ) 
    return request.then(response => response.data)

}

const addNew = (object) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.post(`https://localhost:7148/api/Customers`, object, config)
    return request.then(response => response.data)
}

const RemoveCustomer = (id) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.delete(`https://localhost:7148/api/Customers/${id}?forceDelete=false`, config)
    return request.then(response => response.data)
}

const Update = (customer) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.put(`https://localhost:7148/api/Customers/${customer.customerId}`, customer, config)
    return request.then(response => response.data)
}

export default {GetCustomers, addNew, RemoveCustomer, Update, setToken}