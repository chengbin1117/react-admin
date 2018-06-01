/*
 * @Author: guokang 
 * @Date: 2018-05-21 16:53:49 
 * @Last Modified by: guokang
 * @Last Modified time: 2018-06-01 10:31:24
 */


import React, {Component,PropTypes} from 'react';
import {routerRedux,} from 'dva/router';
import { Form, Icon, Input, Button, Upload, InputNumber, Radio, message, Modal,Select,Cascader,Tag } from 'antd';
import {uploadUrl,ImgUrl,residences,keWordList} from "../../services/common"
const FormItem = Form.Item;
const { TextArea } = Input;
import styles from './index.css'
const RadioGroup = Radio.Group;
const { CheckableTag } = Tag;
const Option = Select.Option;
function AdvertEditor({
	dispatch,
	uploading,
	imageUrl,
	keWordArr,
	clickKeyWord,
	handleChange,
	clearAll,
	afterClose,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) {
	console.log('keWordArr',keWordArr)
	let merId = localStorage.getItem("userId");
	//是否推送
	const formItemLayout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 16 },
	};

	//上传图片按钮状态
	const uploadButton = (
		<div className={styles.imgBox}>
		  <Icon type={uploading ? 'loading' : 'plus'} />
		 
		</div>
	);

	//上传图片之前得校验
	function beforeUpload (file) {
		var isTrue = false;
		if (file.type === 'image/jpeg') {
		  isTrue = true
		} else if (file.type === 'image/png') {
		  isTrue = true
		} else {
		  message.error('图片仅支持jpg、png、jpeg')
		  isTrue = false
		  return false
		}
		const is2M = file.size / 1024 / 1024 < 2;
		// console.log('is2M', is2M)
		if (!is2M) {
			message.error('图片大小不超过2M');
		}
		return isTrue && is2M
	}
	//上传图片时候得回调
	function handleImgChange(info) {
		if (info.file.status === 'uploading') {
			dispatch({
				type:'advert/uploading',
				payload:{
					uploading:true
				}
			})
			return;
		}
		if (info.file.status === 'done') {
			//图片上传返回response
			var img_url = info.file.response; 
			if(img_url.errorCode === "10000"){
				//图片上传成功
				dispatch({
					type:'advert/imgurlChange',
					payload:{
						imageUrl:img_url.data[0].filePath,
						uploading:false
					}
				})
			}else{
				//上传失败返回错误信息
				message.error(img_url.errorMsg)
			}
		}
	}
	return (
		<Form>
			<FormItem label="显示端口" {...formItemLayout}>
				{getFieldDecorator('port', {
					initialValue:'1',
					rules: [{
						required: true, message: '请输入快讯标题!',
					}
					],
				})(
					<RadioGroup >
						<Radio value="1">千氪WEB</Radio>
						<Radio value="2" disabled>千氪APP</Radio>
						<Radio value="3" disabled>千氪专栏WEB</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label="广告样式" {...formItemLayout} extra="注：默认样式为信息流">
				{getFieldDecorator('styles', {
					initialValue:'2',
					rules: [{
						required: true, message: '请输入快讯内容!',
					}
					],
				})(
					<RadioGroup >
						<Radio value="1" disabled>信息流</Radio>
						<Radio value="2" >图片广告</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label="&emsp;" colon={false} {...formItemLayout} >
				{getFieldDecorator('upload', {
					rules: [{
						required: false,
					}
					],
				})(
					<Upload
						name="file"
						className="avatar-uploader"
						showUploadList={false}
						action={ImgUrl}
						beforeUpload={beforeUpload}
						onChange={handleImgChange}
					>
						{imageUrl ? <img src={uploadUrl+imageUrl} alt="news" className={styles.imgBox}/> : uploadButton}
					</Upload>
				)}
			</FormItem>
			<FormItem label="广告标题" {...formItemLayout}>
				{getFieldDecorator('title', {
					rules: [{
						required: true,
					}
					],
				})(
					<Input type="text" placeholder="请输入广告标题" style={{ width: '70%' }} />
				)}
			</FormItem>
			<FormItem label="广告链接" {...formItemLayout}>
				{getFieldDecorator('link', {
					rules: [{
						required: true,
					}
					],
				})(
					<Input type="text" placeholder="请输入广告链接" style={{ width: '70%' }} />
				)}
			</FormItem>
			<FormItem label="广告主名称" {...formItemLayout}>
				{getFieldDecorator('primary', {
					rules: [{
						required: true,
					}
					],
				})(
					<Input type="text" placeholder="请输入广告标题" style={{ width: '70%' }} />
				)}
			</FormItem>
			<FormItem label="定向设置" {...formItemLayout}>
				<div>
					<div className={styles.keyTitle}>行业关键词</div>
					<div>
					   <span>已选择：</span>
						{keWordArr&&keWordArr.map((item,index)=>{
							return(
								<Tag key={index}  className={styles.keyWord} >{item}</Tag>
							)
						})}
						{keWordArr&&keWordArr.length >= 2 ?<span className={styles.clearAll} onClick={()=>clearAll()}>清空</span>:null}
						
					</div>
					<div>
					    <span>请选择：</span>
						{keWordList&&keWordList.map(tag=>(
							<CheckableTag
								key={tag}
							    checked={keWordArr.indexOf(tag) > -1}
								onChange={checked => handleChange(tag, checked)}
								className={styles.keyWord}
							>
								{tag}
							</CheckableTag>
							))
						}
					</div>
				</div>
			</FormItem>
			
			
			<FormItem label="推广时段" {...formItemLayout}>
				{getFieldDecorator('ip', {
					initialValue:'1',
					rules: [ {
						required: true, message: '请选择!',
					}
					],
				})(
					<RadioGroup >
						<Radio value="1">全部时段</Radio>
						<Radio value="2" disabled>自定义</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem label="显示位置" {...formItemLayout}>
				{getFieldDecorator('position', {
					rules: [ {
						required: true, message: '请选择显示位置!',
					}
					],
				})(
					<Cascader options={residences} placeholder="请选择显示位置"  style={{width:'350px'}}/>
				)}
			</FormItem>
			<FormItem label="&emsp;" {...formItemLayout} colon={false}>
			    <Button type="primary" size="large" style={{ paddingLeft: 20, paddingRight: 20 }}>保存</Button>
				<Button size="large" style={{ paddingLeft: 20, paddingRight: 20,marginLeft: 30 }} onClick={()=>history.back()}>返回</Button>
			</FormItem>
		</Form>
	)
}

export default Form.create()(AdvertEditor);
