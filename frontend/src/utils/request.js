import axios from 'axios';
import dayjs from 'dayjs';
import { app, url } from '../config';

let now;

const request = axios.create({
  baseURL: url.api.baseURL,
  timeout: app.timeout,
  headers: {
    // 'X-Env': app.env,
  },
});

// Add a request interceptor
request.interceptors.request.use(
  function (axiosConfig) {
    now = dayjs();
    if (app.consoleLogRequests) {
      console.group(`REQUEST_SENDING: ${axiosConfig.url}`);
    }
    return axiosConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    if (app.consoleLogRequests) {
      console.group(
        `REQUEST_COMPLETE: @${dayjs()
          .diff(now, 'second', true)
          .toPrecision()}s ${response.config.url}`
      );
      console.groupEnd();
    }
    return response;
  },
  function (error) {
    // Any status code that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let e = {};
    if (error.message === 'Network Error' && app.env === 'development') {
      e = {
        message: error.message,
        errors: [`${error.config.method.toUpperCase()}: ${error.config.url}`],
      };
    } else {
      e = error;
    }
    return Promise.reject(e);
  }
);

export default request;
