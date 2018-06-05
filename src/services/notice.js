import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;

//公告列表
export async function getBkgNoticeInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/getBkgNoticeInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//添加公告
export async function addNoticeInfo(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/addNoticeInfo?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//编辑公告
export async function updateNotice(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/updateNotice?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}
//删除公告
export async function delNotice(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/delNotice?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}

//根据公告ID获取详情
export async function getNoticeById(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/notice/getNoticeById?data='+encodeURIComponent(data)+"&sign="+sign;
	return request(url,{
		method:"post"
	}
	);
}


