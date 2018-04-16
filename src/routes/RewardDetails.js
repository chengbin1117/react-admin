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
import RewardTable from '../components/User/RewardTable';
import { timeFormat, GetRequest } from '../services/common';
import { Form, Row, Col, Input, Button,Card,DatePicker, Icon, Table, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, user, router,finance }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	
	const {AccountList,loading,currentPage,totalNumber} = finance;
	const urlSelect = GetRequest(location.search);
	

	//列表
	const RewardTableProps = {
		data:AccountList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		handelchande(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/user/reward?page='+page+'&mobile='+search.mobile+"&userName="+search.userName))
		}
	}
	return (
		<Card title={<div><h2><span style={{color:"#1DA57A"}}>{urlSelect&&Base64.decode(urlSelect.userName)}</span>奖励明细&emsp;&emsp;&emsp;
		奖励总额：{(AccountList&&AccountList.length>0)?AccountList[0].allAmount:0}TV</h2></div>} 
		bordered={false}>
			<RewardTable {...RewardTableProps}/>
		</Card>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user,finance
}) {
	return {
		user,finance
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));