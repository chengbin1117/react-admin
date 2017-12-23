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
import Transaction from '../components/Finance/Transaction';
import {timeFormat} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function Record({location,dispatch,finance,router,}) {
	
	let merId =localStorage.getItem("userId");
	
	const {AccountList,currentPage,totalNumber,loading,BusinessType} =finance;
	const TransactionProps = {
			data:AccountList,
			currentPage,
			total:totalNumber,
			loading,
			BusinessType,
			Examine(reacord){
				console.log(reacord)
				Modal.info({
				    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>提币时间：{reacord.withdrawTime}</span></div>),
				    content: (<table className={stytes.table}>
				    	        <tbody>
				    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email}</td></tr>
				    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
				    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>交易类型</td><td>{reacord.businessTypeName}</td></tr>
				    			<tr><td>发放总钛值</td><td>{reacord.withdrawAmount}</td><td>奖励总人数</td><td>{reacord.bonusTotalPerson}</td></tr>
				    			<tr><td>当前状态</td><td>{reacord.accountAmount}</td></tr>
				    			</tbody>
				    	      </table>
				    	),
				    iconType:null,
				    okText:'关闭',
				    width:820,
				    onOk() {
				      console.log('OK');
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
				  });
		},
		changepage(page){
			router.push('/finance/record?page='+page)
		},
		handlsearch(values){
			console.log(values)
			if(values.time ==undefined){
				dispatch({
					type:'finance/getAccount',
					payload:{
						flowId:values.flowId,
						email:values.email,
						mobile:values.mobile,
						businessTypeId:parseInt(values.businessTypeId),
						minAmount:parseFloat(values.minAmount),
						maxAmount:parseFloat(values.maxAmount),
					}
				})
			}else{
				dispatch({
					type:'finance/getAccount',
					payload:{
						flowId:values.flowId,
						email:values.email,
						mobile:values.mobile,
						businessTypeId:parseInt(values.businessTypeId),
						minAmount:parseFloat(values.minAmount),
						maxAmount:parseFloat(values.maxAmount),
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1])),
					}
				})
			}
		}
	}

	return (
			<div>
				<Transaction {...TransactionProps}/>
			</div>

	);
}

Record.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Record));