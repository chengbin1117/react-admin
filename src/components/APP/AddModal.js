import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	Upload,
	Button,
	Icon
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;
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
	onOk,
	onCancel,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields,
	},
}) => {
	let isSys = 1;
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				...getFieldsValue(),
			}
			
			onOk(data);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
		resetFields()
	}
	const modalOpts = {
		title: '新建版本',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"提交",
		cancelText:"取消",
		afterClose:afterClose,
		width:"50%",

	};
	const props = {
		action: "1",
		multiple: true,
		name: "file",
		accept: '.apk',
	  };
	function checkSysteme(e){
		var value =e.target.value;
		isSys = parseInt(value)
	}
	return (
		<Modal {...modalOpts}>
	        <Form>
				<FormItem
					label="版本号 "
					{...formItemLayout}
					hasFeedback
				>
					{getFieldDecorator('username', {
						initialValue: '',
						rules: [
							{required: true, message: '请填写版本号'},
							{type: "string",max:20,min:1,message: '最多20个字符,仅数字、字母、标点'},
						],
					})(
						<Input type="text" prefix={<span>v</span> }/>
					)}
				</FormItem>
				<FormItem
					label="更新提示语(内容) "
					{...formItemLayout}
					hasFeedback
				>
					{getFieldDecorator('text', {
						initialValue: '',
						rules: [
							{required: true, message: '请填写更新提示语'},
							{type: "string",max:1000,min:1,message: '1-1000个文字，格式不限'},
						],
					})(
						<TextArea />
					)}
				</FormItem>
				<FormItem
					label="是否强制更新"
					{...formItemLayout}
				>
					{getFieldDecorator('update', {
						initialValue: '1',
						rules: [
							{required: true, message: '请选择'}
						],
					})(
						<RadioGroup>
							<Radio value="1">是</Radio>
							<Radio value="2">否</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem
					label="操作系统"
					{...formItemLayout}
					
				>
					{getFieldDecorator('system', {
						initialValue: '1',
						rules: [
							{required: true, message: '请选择'}
						],
					})(
						<RadioGroup onChange={checkSysteme}>
							<Radio value="1">Android</Radio>
							<Radio value="2">ios</Radio>
						</RadioGroup>
					)}
				</FormItem>
				{isSys == 1?<FormItem
					label="上传"
					{...formItemLayout}
				>
					{getFieldDecorator('upload', {
						initialValue: '1',
						rules: [
							{required: true, message: '请选择'}
						],
					})(
						<Upload {...props} listType="text" style={{ width: '50%' }}>
						    <Button type="primary" size="large" id="BTN">
							    <Icon type="upload" />上传
							</Button>
						</Upload>
					)}
				</FormItem>:<FormItem
					label="下载地址"
					{...formItemLayout}
					hasFeedback
				>
					{getFieldDecorator('url', {
						initialValue: '',
						rules: [
							{required: true, message: '请输入下载地址'}
						],
					})(
						<Input />
					)}
				</FormItem>}
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