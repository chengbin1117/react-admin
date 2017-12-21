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
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
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
		
			onOk(selectList,value,text);
		
		
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
		footer:null
	};
	function onChange(value) {
  console.log(value);
}
	class DynamicRule extends React.Component {
	  state = {
	    checkNick: false,
	    text:'',
	    value:1,
	  };
	  check = () => {
	    this.props.form.validateFields(
	      (err,value) => {
	        if (!err) {
	          console.info(value,this.state.text);
	          handleOk(value,this.state.text)
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
	    //console.log('radio checked', e.target.value);
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
			<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={this.onChange} >
				              <Radio value="1">通过</Radio>
				              
				            </RadioGroup>
				  		)}
				</FormItem>
				<FormItem>
				  	    {getFieldDecorator('column', {
				  			rules:[{required: false, message: "请选择!"}],
				  		})(
				  		    <Cascader options={ColumnList} onChange={onChange} placeholder="请选择" style={{width:300+'px'}}/>
				  		)}
				</FormItem>
				<FormItem>
				  	    {getFieldDecorator('radio', {
				  			rules:[{required: true, message: "请选择!"}],
				  		})(
				  		    <RadioGroup onChange ={this.onChange} >
				             
				              <Radio value="2">不通过</Radio>
				              {this.state.value ==2 ? <TextArea onChange={this.inputVaule} style={{ width: 200, marginLeft: 10 }} placeholder="不通过原因(选填)"/> : null}
				            </RadioGroup>
				  		)}
				</FormItem>
				<FormItem>
				  	    <div className={styles.abtn}>
					  	    <Button onClick={onCancel} size="large">取消</Button>
					  	    <Button type="primary" onClick={this.check} size="large">确定</Button>
				  	    </div>
				</FormItem>
			</Form>
	    );
	  }
	}
	const WrappedDynamicRule = Form.create()(DynamicRule);
	return (
			
		<Modal {...modalOpts} width='30%'>
			
			<WrappedDynamicRule />
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