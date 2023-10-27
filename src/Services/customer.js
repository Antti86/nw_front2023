import axios from 'axios';


const GetCustomers = (search) => {

    let Url = "";

    if (search === "" || search === null)
    {
        Url = `https://localhost:7148/api/Customers`;
    }
    else
    {
        Url = `https://localhost:7148/api/Customers/companyname/${search}`
    }


    const request = axios.get(Url)
    return request.then(response => response.data)

}

const addNew = (object) => {
    
    const request = axios.post(`https://localhost:7148/api/Customers`, object)
    return request.then(response => response.data)
}

const RemoveCustomer = (id) => {
    const request = axios.delete(`https://localhost:7148/api/Customers/${id}?forceDelete=false`)
    return request.then(response => response.data)
}

const Update = (customer) => {
    const request = axios.put(`https://localhost:7148/api/Customers/${customer.customerId}`, customer)
    return request.then(response => response.data)
}

export default {GetCustomers, addNew, RemoveCustomer, Update}