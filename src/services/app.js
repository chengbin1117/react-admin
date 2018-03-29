import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//关于我们列表
export async function getBaseinfoList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/getBaseinfoList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//删除列表
export async function deleteBaseinfo(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/deleteBaseinfo?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//设置显示状态


//添加关于我们信息接口
export async function addBaseinfo(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
   
	let url = '/admin/about/addBaseinfo?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
