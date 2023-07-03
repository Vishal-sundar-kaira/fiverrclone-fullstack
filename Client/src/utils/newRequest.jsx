import axios from "axios"
const newRequest = axios.create({
    baseURL: "https://fiverr-clone-1zn4.onrender.com/api/",
    withCredentials: true
});

export default newRequest;