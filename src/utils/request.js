import axios from "axios";

axios.defaults.baseURL = "http://api.pingcc.cn/";

export default function(params){
    return axios.get("/", { params });
}
