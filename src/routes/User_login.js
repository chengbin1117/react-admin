import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import stytes from './UserLoginPage.css';
import { Form, Row, Col, Input, Button, Icon,Select} from 'antd';
const Option = Select.Option;
const FormItem =Form.Item;


function UserLogin({dispatch,user}) {

	class PriceInput extends React.Component {
		  constructor(props) {
		    super(props);

		    const value = this.props.value || {};
		    this.state = {
		      number: value.number || "",
		      currency: value.currency || '1',
		    };
		  }
		  componentWillReceiveProps(nextProps) {
		    // Should be a controlled component.
		    if ('value' in nextProps) {
		      const value = nextProps.value;
		      this.setState(value);
		    }
		  }
		  handleNumberChange = (e) => {
		    const number = parseInt(e.target.value || 0, 10);
		    if (isNaN(number)) {
		      return;
		    }
		    if (!('value' in this.props)) {
		      this.setState({ number });
		    }
		    this.triggerChange({ number });
		  }
		  handleCurrencyChange = (currency) => {
		    if (!('value' in this.props)) {
		      this.setState({ currency });
		    }
		    this.triggerChange({ currency });
		  }
		  triggerChange = (changedValue) => {
		    // Should provide an event to pass value to Form.
		    const onChange = this.props.onChange;
		    if (onChange) {
		      onChange(Object.assign({}, this.state, changedValue));
		    }
		  }
		  render() {
		    const { size } = this.props;
		    const state = this.state;
		    return (
		      <span>
		        <Input
		          type="text"
		          size={size}
		          value={state.number}
		          onChange={this.handleNumberChange}
		          style={{ width: '10%'}}
		        />
		        <Select
		          value={state.currency}
		          size={size}
		          style={{ width: '10%' }}
		          onChange={this.handleCurrencyChange}
		        >
		          <Option value="1">小时</Option>
		          <Option value="2">天</Option>
		          
		        </Select>
		      </span>
		    );
		  }
		}

	class Demo extends React.Component {
			  handleSubmit = (e) => {
			    e.preventDefault();
			    this.props.form.validateFields((err, values) => {
			      if (!err) {
			        //console.log('Received values of form: ', values);
			        dispatch({
			        	type:'user/loginSet',
			        	payload:{
			        		time:parseInt(values.number),
			        		unit:parseInt(values.currency),
			        	}
			        })
			      }
			    });
			  }
			  checkPrice = (rule, value, callback) => {
			    if (value.number > 0) {
			      callback();
			      return;
			    }
			    callback('锁定时长必须大于0!');
			  }
			  render() {
			    const { getFieldDecorator } = this.props.form;
			    return (
			      <Form  onSubmit={this.handleSubmit}>
			        <FormItem>
			          {getFieldDecorator('tmie', {
			            initialValue: { number: 0, currency: '小时' },
			            rules: [{ validator: this.checkPrice }],
			          })(<PriceInput />)}
			        </FormItem>
			        <FormItem >
			          <Button type="primary" htmlType="submit" size="large">确定</Button>
			          
			        </FormItem>
			      </Form>
			    );
			  }
       }

      const WrappedDemo = Form.create()(Demo);
	return (
			<div>
				<WrappedDemo />
			</div>

	);
}

UserLogin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserLogin));