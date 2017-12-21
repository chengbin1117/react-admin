import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const AuditingModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	MaterialType,
	fatherType,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {


	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {
				id: item.Id,
				...getFieldsValue(),
				key: item.key
			}
			setFieldsValue({
				father: "0",
				name: ''
			});
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
		title: '审核处理',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,

	};
	
	
	class App extends React.Component {
		  state = {
		    value: 1,
		  }
		  onChange = (e) => {
		    console.log('radio checked', e.target.value);
		    this.setState({
		      value: e.target.value,
		    });
		  }
		  render() {
		    const radioStyle = {
		      display: 'block',
		      height: '30px',
		      lineHeight: '30px',
		    };
		    return (
		      <RadioGroup onChange={this.onChange} value={this.state.value}>
		        
		        <Radio style={radioStyle} value={3}>通过</Radio>
		        <Radio style={radioStyle} value={4}>
		          不通过
		           <Input style={{ width: 200, marginLeft: 10 }} disabled={this.state.value === 4 ?false:true} placeholder='请输入不通过原因（选填）'/>
		        </Radio>
		      </RadioGroup>
		    );
		  }
		}
	return (

		<Modal {...modalOpts}>
	       <Form>
				<Form.Item 
					
					{...formItemLayout}
				>
					<App />
				</Form.Item>		
				
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