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
import ColumnAwardTable from '../components/User/ColumnAwardTable';
import { timeFormat, GetRequest } from '../services/common';
import './font.less';
import styles from './Record.css'
import { Form, Row, Col, Input, Button, DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router, }) {
	const {loading, totalNumber, currentPage,ColumnBonusList,currentItem} = user;
	//console.log(loading)
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
						{getFieldDecorator('userId', {
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
						{getFieldDecorator('userName')(
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='手机号'>
						{getFieldDecorator('mobile', {
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
						{getFieldDecorator('userRole')(
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
			</div>
		);
		return children;
	}

	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='用户ID'>
						{getFieldDecorator('userId', {
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
						{getFieldDecorator('userName')(
							<Input type="text" placeholder="请输入昵称" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	//搜索
	function handlsearch(data) {
		dispatch(routerRedux.push('/user/columnAward?page=1' + "&userId=" + data.userId +
				"&userName=" + data.userName + "&mobile=" + data.mobile + "&userRole=" + data.userRole
		))
	}

	//奖励列表
	const InviteNewTableProps = {
		data:ColumnBonusList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		handelchande(page){
			const data = GetRequest(location.search)
			dispatch(routerRedux.push('/user/columnAward?page='+ page + "&userId=" + data.userId +
				"&userName=" + data.userName + "&mobile=" + data.mobile + "&userRole=" + data.userRole
		    ))
		},
		getUserData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))

		}
	}
	//奖励说明
	function RweInfo(){
		Modal.info({
			title:"奖励说明",
			width:"600",
			content: (
		      <div>
		        <h2>规则：</h2>
		        <h4>1.奖励兑换</h4>
		        <p>有效邀请数>=10即可领取1TV</p>
		        <p>有效邀请数>=30即可领取5TV</p>
		        <p>有效邀请数>=50即可领取15TV</p>
		        <p>有效邀请数>=80即可领取30TV</p>
		        <p>2.领取奖励后，将扣除相应的邀请数值，如：成功邀请12人，选择领取奖励将获得10人对应的1TV
                奖励并扣除10人成功邀请数，剩余2人。</p>
		        <p>3.什么是有效邀请：好友通过您的邀请链接或者邀请码注册并登录，算为一次有效邀请。</p>
		        <p>4.成功邀请的新用户将自动成为您的徒弟。</p>
		        <p>5.邀请好友仅对于邀请新用户，老用户无效。</p>
		        <p>6.邀请真实用户才会增加有效次数。</p>
		        <p>7.活动最终解释权归千氪财经所有。</p>
		      </div>
		    ),
		})
	}
	return (
		<div>
			<div className = {styles.changeAward}>
					<Link  to = '/user/platformReward?page=1'>邀新奖励</Link>
					<Link  to = '/user/realnameAward?page=1'>实名认证奖励</Link>
					<Link  className = {styles.activeAward} to = '/user/columnAward?page=1'>成为专栏作家奖励</Link>
					<Link  className = {styles.activeColor} to = '/user/writingAward?page=1'>发文奖励</Link>
					{/* <Link  className = {styles.activeColor} to = '/user/columnAward?page=1'>平台阅读奖励</Link>
					<Link  className = {styles.activeColor} to = '/user/platformReward?page=1'>分享奖励</Link> */}
					<Button  className = {styles.activeBtn} onClick={RweInfo} size="large" icon="question-circle-o">奖励说明</Button>
				</div>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<ColumnAwardTable {...InviteNewTableProps}/>
		</div>

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