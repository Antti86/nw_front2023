import axios from 'axios';
let port = "8000"
let BaseUrl = `https://northwindrestapi.azurewebsites.net/api/users`
// let BaseUrl = `http://localhost:${port}/api/users`
// let BaseUrl = `http://backend:${port}/api/users`; // käytä oikeaa Docker-verkon nimeä tai palvelun nimeä

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const Get = async () => {
    const config = {
        headers: {Authorization: token},
    }

    const request = axios.get(BaseUrl, config)
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

const Update = async (user) => {
    const config = {
        headers: {Authorization: token},
    }
    const request = axios.put(BaseUrl + "/" + user.userId, user, config)
    const response = await request;
    return response.data;
}

const Login = async (object) => {
    // const request = axios.post(`http://backend:${port}/api/authentication`, object)
    // const request = axios.post(`http://localhost:${port}/api/authentication`, object)
    const request = axios.post(`https://northwindrestapi.azurewebsites.net/api/authentication`, object)
    const response = await request;
    return response;
}

export default {Get, Add, Remove, Update, Login, setToken}