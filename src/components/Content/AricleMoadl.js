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
	Button,
	Tabs,
	Steps,
	Col,
	Row,
	Cascader 
} from 'antd';
import styles from './Content_Opinion_Show.css'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const Step = Steps.Step;

let value = 0;

const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const ArticleModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	ColumnList,
	showfpModal,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {
	//console.log(ColumnList)

	function handleOk(value,text) {
			validateFields((errors) => {
			if (errors) {
				return;
			}

			const data = {...getFieldsValue()

			};
			console.log(data)
			onOk(data,selectList);
		   })
			//onOk(selectList,value,text);
		
		
	}

	function Cancel() {
		onCancel()
	}
	const modalOpts = {
		title: "审核处理",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		okText:"确定",
		cancelText:"取消"
	};
	function onChange(e) {
        value =e.target.value;
    }
	return (
			
		<Modal {...modalOpts} width='40%'>
			
		<Form>
			<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={onChange} >
				              <Radio value="1">通过</Radio>
				              
				            </RadioGroup>
				  		)}
				</FormItem>
				<FormItem label="选择栏目">
				  	    {getFieldDecorator('column', {
				  			rules:[{required: value==1?true:false, message: "请选择!"}],
				  		})(
				  		    <Cascader options={ColumnList}  placeholder="请选择" style={{width:300+'px'}}/>
				  		)}
				</FormItem>
				<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={onChange} >
				             
				              <Radio value="3">不通过</Radio> 
				            </RadioGroup>
				  		)}
				</FormItem>
		        <FormItem>
		          {getFieldDecorator('text',{
		          	 rules: [{
			              required: false, message: '请输入!',
			            }], 
		          })(
		          <TextArea  style={{ width: "100%",minHeight:"100px"}} placeholder="不通过原因(选填)" disabled={value==3?false:true}/> 
		          )}
		        </FormItem>
			</Form>
		</Modal>
	);
};

ArticleModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(ArticleModal);