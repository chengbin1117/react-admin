import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
} from 'antd';
const Option = Select.Option;


const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const AdduserModal = ({
	visible,
	item = {},
	PostList,
	type,
	onOk,
	onCancel,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {

	//console.log("type",item)
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				id: item.id,
				...getFieldsValue(),
				key: item.key
			}
			
			onOk(data);
		});
	}

	function Cancel() {
		onCancel()
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	const modalOpts = {
		title: type=="create"?'添加账号':'编辑账号',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,

	};
	return (

		<Modal {...modalOpts}>
	<Form>
				<Form.Item 
					label="用户名 "
					{...formItemLayout}
				>
					{getFieldDecorator('username', {
						initialValue: item.username,
						rules: [
							{required: true, message: '用户名未填写'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>		
				<Form.Item 
					label="手机号 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('mobile', {
						initialValue: item.mobile,
						rules: [
							{required: true, message: '手机号未填写'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="姓名 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('realname', {
						initialValue: item.kgUsername,
						rules: [
							{required: true, message: '姓名未填写'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="设置密码 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('password', {
						initialValue: "",
						rules: [
							{required: true, message: '姓名未填写'},
						],
					})(
						<Input type="text" />
					)}
				</Form.Item>
				<Form.Item 
					label="选择岗位 "
					hasFeedback
					{...formItemLayout}
				>
					{getFieldDecorator('postId', {
						initialValue: item.pos,
						rules: [
							{required: true, message: '姓名未填写'},
						],
					})(
						<Select style = {{marginRight:20}} size = "large"  placeholder="请选择" >
							{PostList.map((item,index)=>
								<Option key={index} value={item.postId+""}>{item.postName}</Option>
								)}
	            			
	            		</Select>
					)}
				</Form.Item>
			</Form>
		</Modal>
	);
};

AdduserModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AdduserModal);