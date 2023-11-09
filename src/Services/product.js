import axios from 'axios';

let token = null
let BaseUrl = "https://localhost:7148/api/Products";

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
    const request = axios.delete(BaseUrl + "/" + id, config)
    const response = await request;
    return response.data;
}

const Update = async (object) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.put(BaseUrl + "/" + object.productId.toString(), object, config);

    const response = await request;
    return response.data;
}

export default {Get, Add, Remove, Update, setToken}