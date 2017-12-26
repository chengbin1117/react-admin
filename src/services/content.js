import request from '../utils/request';
import qs from 'qs';
import md5 from 'js-md5';
import {Base64Url,SignUrl} from './common';
let Base64 = require('js-base64').Base64;


//文章列表
export async function getArticleList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/getArticleList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}
//点击文章显示设置 
export async function setDisplayStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/setDisplayStatus?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
		);
}

//文章审核
/*****
	* call_method：update //文章审核
	*call_method：deletearticle  //文章删除
	*/
export async function articleservice(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/articleservice?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//文章审核
	
export async function auditArticle(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/auditArticle?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//文章发布

export async function publishArticle(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/publishArticle?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}


//文章删除
export async function deleteArticle(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/deleteArticle?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//获得栏目

export async function getColumnList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/column/getColumnList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//获取文章详情

export async function getArticleById(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/getArticleById?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//图片显示列表
export async function siteimagelist(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/list?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//图片批量设置显示
export async function setimagiservice(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/seimagi/setimagiservice?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//添加编辑图片
export async function addImage(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/addImage?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//删除图片

export async function deleteImage(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/deleteImage?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//设置图片显示状态

export async function ImageSetStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/siteimage/setStatus?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//意见反馈

export async function getFeedbackList(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/feedback/getFeedbackList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//删除意见反馈
export async function deleteFeedback(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/feedback/deleteFeedback?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//查看反馈表

export async function setStatus(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/feedback/setStatus?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//回复内容
export async function replay(params) {

	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/feedback/replay?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//评论管理列表

export async function getCommentList(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/comment/getCommentList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//评论管理设置
export async function commentSet(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/comment/commentSet?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//删除评论
export async function deleteComment(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/comment/deleteComment?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//显示/隐藏评论接口
export async function setcommentStatus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/comment/setDisplayStatus?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}


//审核评论接口
export async function auditComment(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/comment/auditComment?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//栏目列表接口
/*export async function getColumnList(params) {
	var data = Base64.encode(JSON.stringify(params));
    var sign = md5(data+userId+'_'+token);
	let url = '/admin/column/getColumnList?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}*/
//添加/编辑栏目接口
export async function addColumn(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/column/addColumn?data='+encodeURIComponent(data)+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//删除栏目
export async function deleteColumn(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/column/deleteColumn?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
//添加子级栏目
export async function columnservice(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/column/columnservice?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//发送邮件
export async function sendEmail(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/feedback/sendEmail?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//根据Id获取关联账号
export async function getSysUserById(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/sysuser/getSysUserById?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}

//获取文章阅读奖励

export async function getBonus(params) {
	var data = Base64Url(params)
    var sign = SignUrl(data)
	let url = '/admin/article/getBonus?data='+data+"&sign="+sign;

	return request(url,{
		method:"post"
	}
	);
}
