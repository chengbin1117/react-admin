import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Link,
	browserHistory
} from 'dva/router';

import {
	Form,
	Button,
	Input,
	Icon,
	Checkbox
} from 'antd';

import stytes from './LoginForm.css';
const FormItem = Form.Item;
const UserLoginForm = ({
	onSubmit,
	router,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
	forget
}) => {

	/****
	 * 
	 */
	function onClick() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {...getFieldsValue()
			};

			onSubmit(data);
		})
	}
	/* function forgetPaw(){
	 	console.log(1)
	 	router.push('/forget')
	 }*/
	// const alert = Modal.alert;
	/*let logoimg = require("image!../../assets/images/logo1.png");
	let userimg = require("image!../../assets/images/user.png");
	let passwordimg = require("image!../../assets/images/password.png");*/
	return (
		<div className={stytes.login}>
			<p className={stytes.p3}>KG.com</p>
			<div className={stytes.loginform}>
				<Form>
				    <FormItem>
				  		{getFieldDecorator('username', {
				  			rules:[{required: true, message: "请输入正确的用户名!"}],
				  		})(
				  			<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}   placeholder="请输入用户名" className={stytes.Input}/>
				  		)}
				  	</FormItem>
				    <Form.Item>
				  	    {getFieldDecorator('password', {
				  			rules:[{required: true, message: "请输入密码!"}],
				  		})(
				  		    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}  type="password" placeholder="请输入密码"  onPressEnter={()=>onClick()} className={stytes.Input}/>
				  		)}
				  	</Form.Item>
				  	<Form.Item>		  			         		  		
							<Button type="primary" className={stytes.button}  size="large" onClick={onClick} >
					  			登录
					  		</Button>
				  		</Form.Item>
				  	</Form>
			</div>
			    
			</div>
	);
};

UserLoginForm.propTypes = {};

export default Form.create()(UserLoginForm);
//<Link className="login-form-forgot"  className={stytes.forget} to='forget'>忘记密码</Link>
