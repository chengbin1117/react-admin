import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form ,Button, Upload, Icon,Input,Select,Col,Modal,message,Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import {formatDate,tokenLogOut,GetRequest} from '../services/common'
function AccountRule({location,dispatch,setting,router,}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}

	class NormalLoginForm extends React.Component {
		handleSubmit = (e) => {
		  e.preventDefault();
		  this.props.form.validateFields((err, values) => {
			if (!err) {
			  console.log('Received values of form: ', values);
			}
		  });
		}
		render() {
		  const { getFieldDecorator } = this.props.form;
		  const formItemLayout = {
			labelCol: {
			  xs: { span: 24 },
			  sm: { span: 3 },
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 16 },
			},
		  };
		  return (
			<Form onSubmit={this.handleSubmit} className="login-form">
			    <FormItem label="是否展示作者收益排行" {...formItemLayout} extra="选择不展示时，作者端将屏蔽收益排行入口">
					{getFieldDecorator('userName', {
					initialValue:'1',
					rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<RadioGroup size="large">
							<Radio value="1">展示</Radio>
							<Radio value="0">不展示</Radio>
						</RadioGroup>
					)}
			    </FormItem>
				<FormItem label="&emsp;" {...formItemLayout} colon={false}>
			    <Button type="primary" size="large" style={{ paddingLeft: 20, paddingRight: 20 }} onClick={()=>this.onSubmit()}>保存</Button>
			</FormItem>
			</Form>
		  );
		}
	  }
	const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
	return (
			<div>
				<WrappedNormalLoginForm />
			</div>

	);
}

AccountRule.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AccountRule));