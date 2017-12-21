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

const SetHotModal = ({
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

	//console.log(selectList)
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
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	const modalOpts = {
		title: '是否推荐为热门作者',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
	};
	
/*	class DynamicRule extends React.Component {
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
		          label=""
		          
		        >
		          {getFieldDecorator('radio-button')(
		            <RadioGroup >
		                <Radio  value={1}>是</Radio>
				        <Radio  value={2}>
				        否
				          
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
	const WrappedDynamicRule = Form.create()(DynamicRule);*/
	return (
			
		<Modal {...modalOpts} width='400px'>
		 <Form>
			<FormItem 
		          label=""
		          
		        >
		          {getFieldDecorator('radio',{
		          	 rules: [{
			              required: true, message: '请选择!',
			            }], 
		          })(
		            <RadioGroup >
		                <Radio  value="1">是</Radio>
				        <Radio  value="2">
				        否
				          
				        </Radio>
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