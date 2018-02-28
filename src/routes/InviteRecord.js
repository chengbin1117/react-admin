import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import LayoutContainer from '../components/Layout';
import InviteTable from '../components/User/InviteTable';
import { timeFormat, GetRequest } from '../services/common';
import { Form, Row, Col, Input, Button,Card,DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router, }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('Id', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "用户ID只能输入数字" }
							]
						})(

							<Input placeholder="请输入用户Id" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='昵称'>
						{getFieldDecorator('email')(
							<Input placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('phone', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "手机号只能为数字" }
							]
						})(
							<Input type="phone" placeholder="请输入手机号" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户角色'>
						{getFieldDecorator('role')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="1">普通用户</Option>
								<Option value="2">个人</Option>
								<Option value="3">媒体</Option>
								<Option value="4">企业</Option>
								<Option value="5">组织</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='级别'>
						{getFieldDecorator('auditStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">审核中</Option>
								<Option value="1">通过</Option>
								<Option value="2">不通过</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='注册时间'>
						{getFieldDecorator('time')(
							<RangePicker />
						)}
					</FormItem>
				</Col>
				
			</div>
		);
		return children;
	}

	//搜索
	function handlsearch(values) {
		if (values.time != undefined) {
			dispatch(routerRedux.push('/user/user_admin?page=1' + "&userId=" + values.Id +
				"&userEmail=" + values.email + "&userMobile=" + values.phone + "&userRole=" + values.role +
				"&auditStatus=" + values.auditStatus + "&lockStatus=" + values.lockStatus +
				"&createDateStart=" + timeFormat(new Date(values.time[0])) +
				"&createDateEnd=" + timeFormat(new Date(values.time[1]))
			))
		} else {
			dispatch(routerRedux.push('/user/user_admin?page=1' + "&userId=" + values.Id +
				"&userEmail=" + values.email + "&userMobile=" + values.phone + "&userRole=" + values.role +
				"&auditStatus=" + values.auditStatus + "&lockStatus=" + values.lockStatus
			))
		}
	}
	return (
		<Card title={
			<div>
			    <span>王小二的邀新记录&emsp;&emsp;20人&emsp;<span style={{color:"#f00"}}>需审查</span></span>
			    &emsp;
			    <Button type="primary">确认审查</Button>
			    &emsp;
			    <Button type="primary">冻结</Button>
			</div>} 
			bordered={false}
		>
			<WrappedAdvancedSearchForm getFields={getFields} handlsearch={handlsearch} />
			<InviteTable />
		</Card>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));