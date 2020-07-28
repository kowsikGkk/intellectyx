import axios from "axios";
import { config } from "../config.js";

const defaultParamsObj = {
    method: "get",
    data: false,
    withAuth: false,
    customHeader: {}
};

function request(url, params = defaultParamsObj) {

    url = config.dev_url + url;
    debugger
    const { method, data, customHeader, responseType } = params;
    let requestBody = {
        method,
        url
    };
    const headers = {
        ...customHeader,
        'Access-Control-Allow-Origin': '*',
    };
    requestBody["headers"] = headers
    if (data) {
        requestBody["method"] = method || "POST"
        requestBody["data"] = data
    }
    if (responseType)
        requestBody.responseType = responseType
    return axios({ ...requestBody })
        .then(response => {
            debugger
            if (response.headers && response.headers.Authorization)
                localStorage.setItem('access-token', response.headers.authorization)
            return response.data
        })
        .catch(error => {
            return error.response
        })
}

export default request