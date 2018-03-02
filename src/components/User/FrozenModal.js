import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	message,
	Button
} from 'antd';
var value ='1'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const RealsModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {

	//console.log(selectList)
	function handleOk(value,text) {
		
			validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {...getFieldsValue()

			};
			
			onOk(data,selectList);
		   })
	}

	function Cancel() {
		onCancel()
		
	}
	function onChange(e) {
		//console.log(e.target.value)
		value =e.target.value;
		
	}
	const modalOpts = {
		title: "冻结",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:600,
		okText:"冻结"
	};
	
	return (
			
		<Modal {...modalOpts} width='400px'>
		<Form>
		        <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:'100px'}} placeholder="请输入冻结原因（选填，填写结果将发送给用户)"/> 
		          )}
		        </FormItem>
			</Form>
				
		</Modal>
	);
};

RealsModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(RealsModal);