import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	Cascader
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
import { reasons } from '../../utils/config'
const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 16 },
};
let value = 0;
const AuditingModal = ({
	visible,
	item = {},
	typeNews,
	onOk,
	selectList,
	ColumnList,
	onCancel,
	confirmLoading,
	dispatch,
	pubStatus,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
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
			onOk(data, selectList);
		});
	}

	function Cancel() {
		onCancel()
	}
	function afterClose() {
		resetFields()
	}
	const modalOpts = {
		title: '审核处理',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		confirmLoading: confirmLoading,
		afterClose: afterClose,
		destroyOnClose:true,
		width: 1450

	};

	function onChange(e) {
		value = e.target.value;
		if (value == 1) {
			setFieldsValue({
				text: '',
				reasons: ''
			});
		}
		dispatch({
			type:'content/publishStatusChange',
			payload:{
				pubStatus: e.target.value
			}
		})

	}
	const radioStyle = {
		display: 'block',
		height: '30px',
		lineHeight: '30px',
	};
	const radioStle = {
		'wordWrap': 'breakWord',
	}

	const textReasons = (e) => {
		setFieldsValue({
			text: e.target.value
		});

	}

	return (

		<Modal {...modalOpts}>
			<Form>
				<FormItem label="审核处理" {...formItemLayout}>
					{getFieldDecorator('radio', {
						rules: [{ required: true, message: "请选择!" }],
					})(
						<RadioGroup onChange={onChange} >
							<Radio value="1">通过</Radio>
							<Radio value="3">不通过</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem label="是否发放奖励" {...formItemLayout}>
					{getFieldDecorator('isarward', {
						initialValue: '1',
						rules: [{ required: true, message: "请选择!" }],
					})(
						<RadioGroup onChange={onChange} >
							<Radio value="1">发送</Radio>
							<Radio value="0">不发送</Radio>
						</RadioGroup>
					)}
				</FormItem>
				{typeNews === 'video' ? <FormItem label="选择栏目" {...formItemLayout}>
					{getFieldDecorator('columnvideo', {
						initialValue: [360],
						rules: [{ required: pubStatus == 1 ? true : false, message: "请选择!" }],
					})(
						<Cascader options={ColumnList} placeholder="请选择" style={{ width: 300 + 'px' }} disabled />
					)}
				</FormItem> : <FormItem label="选择栏目" {...formItemLayout}>
						{getFieldDecorator('columnarticle', {
							rules: [{ required: pubStatus == 1 ? true : false, message: "请选择!" }],
						})(
							<Cascader options={ColumnList} placeholder="请选择" style={{ width: 300 + 'px' }} />
						)}
					</FormItem>}


				<FormItem>
					{getFieldDecorator('reasons', {

					})(
						<RadioGroup size="small" onChange={textReasons}>
							{reasons && reasons.map((item) =>
								<Radio key={item.id} value={item.data} disabled={pubStatus == 3 ? false : true} style={radioStyle} >
									<span style={radioStle}>{item.data}</span>
								</Radio>
							)}
						</RadioGroup>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('text', {
						rules: [{
							required: false, message: '请输入!',
						}],
					})(
						<TextArea style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={pubStatus == 3 ? false : true} />
					)}
				</FormItem>
			</Form>
		</Modal>
	);
};

AuditingModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AuditingModal);