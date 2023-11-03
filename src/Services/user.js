import axios from 'axios';

let BaseUrl = "https://localhost:7148/api/users";
const GetUsers = async () => {


    const request = axios.get(BaseUrl)
    const response = await request;
    return response.data;

}

const addUser = async (object) => {
    
    const request = axios.post(BaseUrl, object)
    const response = await request;
    return response.data;
}

const RemoveUser = async (id) => {
    const request = axios.delete(BaseUrl + "/" + id)
    const response = await request;
    return response.data;
}

const UpdateUser = async (user) => {
    const request = axios.put(BaseUrl + "/" + user.userId, user)
    const response = await request;
    return response.data;
}

const Login = async (object) => {
    const request = axios.post("https://localhost:7148/api/authentication", object)
    const response = await request;
    return response;
}

export default {GetUsers, addUser, RemoveUser, UpdateUser, Login}