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

const RelationModal = ({
	visible,
	item = {},
	onOk,
	onCancel,
	handleBlur,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {

	console.log("type",item)
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				...getFieldsValue(),
			}
			
			onOk(item,data);
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
		title: "关联前台账号",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,

	};
	return (

		<Modal {...modalOpts}>
	        <Form>	
				<FormItem 
					label="手机号 "
					{...formItemLayout}
				>
					{getFieldDecorator('kgUserId', {
						initialValue: item.mobile,
						rules: [
							{required: true, message: '请输入正确手机号',pattern:/^1[3|4|5|8][0-9]\d{4,8}$/},
						],
					})(
						<Input type="text" onBlur={handleBlur}/>
					)}
				</FormItem>	
			</Form>
		</Modal>
	);
};

RelationModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(RelationModal);