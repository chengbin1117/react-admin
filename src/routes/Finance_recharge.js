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
import LayoutContainer from '../components/Layout';
import stytes from './UserLoginPage.css';
import Recharge from '../components/Finance/Recharge';
import {timeFormat,GetRequest} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function FinanceReacharge({location,dispatch,finance,router,}) {
	const {RechargeList,loading,totalNumber,currentPage}=finance;
	//console.log(loading)
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	console.log(merId)
	/*if(merId == 'undefined'){
		message.error('请重新登陆')
		console.log(1111111111)
		router.push('/')
	}*/
	const RechargeProps ={
		data:RechargeList,
		total:totalNumber,
		currentPage,
		loading,
		router,
		handlsearch(values){
			console.log(values)
			if(values.time ==undefined){
				/*dispatch({
					type:'finance/getAccountRecharge',
					payload:{
						userId:values.userId,
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status)
					}
				})*/
				dispatch(routerRedux.push('/finance/recharge?page=1'+"&userId="+values.userId+"&mobile="+values.mobile+
					"&email="+values.email+"&status="+values.status
					))
			}else{
				/*dispatch({
					type:'finance/getAccountRecharge',
					payload:{
						userId:values.userId,
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status),
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1])),
					}
				})*/
				dispatch(routerRedux.push('/finance/recharge?page=1'+"&userId="+values.userId+"&mobile="+values.mobile+
					"&email="+values.email+"&status="+values.status+"&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
					))
			}
		},
		changepage(page){
				//console.log(page)
				const search =GetRequest(location.search);
				dispatch(routerRedux.push('/finance/recharge?page='+page+"&userId="+search.userId
				+"&mobile="+search.mobile+"&email="+search.email+"&status="+search.status+"&startDate="+search.startDate+"&endDate="+search.endDate))
				//dispatch(routerRedux.push('/finance/recharge?page='+page))
				//router.push('/finance/recharge?page='+page)
		},
		Examine(reacord){
			Modal.info({
			    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>充值时间：{reacord.rechargeTime}</span></div>),
			    content: (<table className={stytes.table}>
			    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
			    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay==null?"——":reacord.userRoleDisplay}</td></tr>
			    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>充值地址</td><td>{reacord.toAddress==null?"——":reacord.toAddress}</td></tr>
			    			<tr><td>充值数量</td><td>{reacord.amount==null?"——":reacord.amount}</td><td>到账时间</td><td>{reacord.accountTime==null?"——":reacord.accountTime}</td></tr>
			    			<tr><td>当前状态</td><td>{reacord.statusDisplay==null?"——":reacord.statusDisplay}</td><td>备注信息</td><td>{reacord.remark==null?"——":reacord.remark}</td></tr>
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
		}
	}
	
	return (
			<div>
				<Recharge {...RechargeProps}/>
			</div>

	);
}

FinanceReacharge.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(FinanceReacharge));