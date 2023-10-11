import axios from 'axios';


const GetCustomers = (search) => {

    let Url = "";
    // if (country === "" || country === null)
    // {
    //     Url = `https://localhost:7148/api/Customers`;
    // }
    // else
    // {
    //     Url = `https://localhost:7148/api/Customers/companyname/${country}`
    // }

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

export default {GetCustomers, addNew}