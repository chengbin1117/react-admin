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
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const ExamineModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	fatherType,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {


	function handleOk(value,text) {
		
			//console.log(value,text)
			onOk(value,text,selectList);
		
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
		footer:null

	};
	
	class DynamicRule extends React.Component {
	  state = {
	    checkNick: false,
	    text:''
	  };
	  check = () => {
	    this.props.form.validateFields(
	      (err) => {
	        if (!err) {
	          console.info('success');
	        }
	      },
	    );
	  }
	  handleChange = (e) => {
	    this.setState({
	      checkNick: e.target.checked,
	    }, () => {
	      this.props.form.validateFields(['nickname'], { force: true });
	    });
	  }
	  onChange = (e) => {
	    console.log('radio checked', e.target.value);
	    this.setState({
	      value: e.target.value,
	    });
	  }
	  inputVaule =(e) => {
	  	console.log(e.target.value)
	  	this.setState({
	  		text:e.target.value
	  	})
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	    const {value,text}=this.state;
	    return (
	      <Form>
			<FormItem 
		          label="审核处理"
		          
		        >
		          {getFieldDecorator('radio-button')(
		            <RadioGroup onChange={this.onChange} value={this.state.value}>
		                <Radio  value={1}>通过</Radio>
		                <br />
				        <Radio  value={2}>
				          不通过
				          {this.state.value === 2 ? <TextArea onChange={this.inputVaule} style={{ width: 100, marginLeft: 10 }} /> : null}
				        </Radio>
		            </RadioGroup>
		          )}
		        </FormItem>
		        <FormItem
		          
		        >
		          <Button type="primary" onClick={()=>handleOk(value,text)}>保存</Button>
		        </FormItem>
			</Form>
	    );
	  }
	}
	const WrappedDynamicRule = Form.create()(DynamicRule);
	return (
			
		<Modal {...modalOpts} width='400px'>
		<WrappedDynamicRule />
				
		</Modal>
	);
};

ExamineModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(ExamineModal);