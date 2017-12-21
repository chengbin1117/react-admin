import fetch from 'dva/fetch';
import pathToRegexp from 'path-to-regexp';

import {
  message
} from 'antd';
import {
  hashHistory,
} from 'react-router';
//let urlprefix = "http://172.16.1.108:8081/kgapi";
let urlprefix = "http://120.78.186.139:8088/kgapi";
//let urlprefix = "http://172.16.0.15";

//let urlprefix = "kgapi";
function parseJSON(response) {
 
    return response.json();
}

function checkStatus(response) {
  //console.log("checkStatus:", response);
  if(response.status == 404){
    message.error('访问不存在')
    return false;
  }
  if(response.status == 500){
    message.error('服务器内部出错')
     return false;
  }
  if(response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function logError(err) {
  console.log("error occurred:", err);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let fullUrl = urlprefix + url;
  var match = url.substring(0,18);
  if (match != '/admin/login/login') {
    //alert(match)
    
    let  userId = localStorage.getItem('userId')
    let  token = localStorage.getItem('Kgtoken')
    let headers = {
      'token': userId+'_'+token
    }
    
    options = {
      ...options,
      'headers': headers,
      };
    //console.log("options",options)
    return fetch(fullUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));
  }else{
    return fetch(fullUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));
  }

 // console.log("request:", fullUrl, options);

 /* return fetch(fullUrl, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({
      data
    }));*/
  // .catch(logError);
}