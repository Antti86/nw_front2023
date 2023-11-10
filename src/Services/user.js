import axios from 'axios';

let BaseUrl = "https://localhost:7148/api/users";
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
    const request = axios.post("https://localhost:7148/api/authentication", object)
    const response = await request;
    return response;
}

export default {Get, Add, Remove, Update, Login, setToken}