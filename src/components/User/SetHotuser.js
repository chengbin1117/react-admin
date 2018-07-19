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

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea
const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 14,
	},
};

const SetHotModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	confirmLoading,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {
	function handleOk(value) {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {...getFieldsValue()

			};
			
			onOk(data,selectList);
		})
		//console.log(value,text)
	}

	function Cancel() {
		onCancel()
		
	}
	function afterClose(){
		resetFields()
	}
	const modalOpts = {
		title: '是否推荐为热门作者',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		afterClose:afterClose,
		confirmLoading:confirmLoading
	};
	

	return (
			
		<Modal {...modalOpts}>
		 <Form>
			<FormItem 
		        label="是否推荐为热门作者"
		        {...formItemLayout}
		        >
				{getFieldDecorator('radio',{
				initialValue:selectList.hotUser==false?"2":"1",
					rules: [{
						required: true, message: '请选择!',
					}], 
				})(
				<RadioGroup >
					<Radio  value="1">是</Radio>
					<Radio  value="2">否</Radio>
				</RadioGroup>
				)}
	    	</FormItem>
		    <FormItem 
		        label="是否显示在排行榜"
		        {...formItemLayout}
		        >
				{getFieldDecorator('rankingList',{
				initialValue:selectList.rankingList+'',
					rules: [{
						required: true, message: '请选择!',
					}], 
				})(
				<RadioGroup >
					<Radio  value="1">显示</Radio>
					<Radio  value="0">隐藏</Radio>
				</RadioGroup>
				)}
	    	</FormItem>   
			</Form>
				
		</Modal>
	);
};

SetHotModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(SetHotModal);