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
		afterClose:afterClose

	};
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