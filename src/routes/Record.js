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
import Transaction from '../components/Finance/Transaction';
import {timeFormat,GetRequest} from '../services/common';

import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function Record({location,dispatch,finance,router,}) {
	
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
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
				    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>创建时间：{reacord.flowDate}</span></div>),
				    content: (<table className={stytes.table}>
				    			{reacord.businessTypeId == 50 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>支付数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    	        {reacord.businessTypeId == 40 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>收入数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{(reacord.businessTypeId == 310 ||reacord.businessTypeId == 340 ||
				    		      reacord.businessTypeId == 320 ||reacord.businessTypeId == 330
				    				)&&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>获取数额</td><td>{reacord.amount}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 20 &&
				    				<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>提币地址</td><td>{reacord.address}</td></tr>
					    			<tr><td>实际到账数量</td><td>{reacord.accountAmount}</td><td>手续费</td><td>{reacord.poundageAmount}</td></tr>
					    			<tr><td>到账时间</td><td>{reacord.flowDate}</td><td>当前状态</td><td>{reacord.status==null?"——":reacord.status}</td></tr>
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 350 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>发放总钛值</td><td>{reacord.amount}</td></tr>
					    			<tr><td>奖励总人数</td><td>{reacord.bonusTotalPerson==null?"——":reacord.bonusTotalPerson}</td><td>当前状态</td><td>{reacord.status}</td></tr>
					    			
				    			</tbody>
				    			}
				    			{reacord.businessTypeId == 10 &&
				    			<tbody>
					    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
					    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
					    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>充值地址</td><td>{reacord.address==null?"——":reacord.address}</td></tr>
					    			<tr><td>充值数量</td><td>{reacord.bonusTotalPerson==null?"——":reacord.bonusTotalPerson}</td><td>到账时间</td><td>{reacord.flowDate}</td></tr>
					    			<tr><td>当前状态</td><td>{reacord.status==null?"——":reacord.status}</td></tr>
				    			</tbody>
				    			}
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
			
			const search =GetRequest(location.search);
			console.log(search)
			//if()
			dispatch(routerRedux.push('/finance/record?page='+page+"&flowId="+search.flowId+"&email="+search.email
				+"&mobile="+search.mobile+"&businessTypeId="+search.businessTypeId+"&minAmount="+search.minAmount+"&maxAmount="+search.maxAmount
				+"&startDate="+search.startDate+"&endDate="+search.endDate
				))
			//router.push('/finance/record?page='+page+"&flowId="+search.flowId)
		},
		handlsearch(values){
			console.log(values)
			if(values.time ==undefined||values.time.length ==0){
				dispatch(routerRedux.push(
					'/finance/record?page=1'+"&flowId="+values.flowId+"&email="+values.email+
					"&mobile="+values.mobile+"&businessTypeId="+values.businessTypeId+
					"&minAmount="+values.minAmount+"&maxAmount="+values.maxAmount
					))
				/*dispatch({
					type:'finance/getAccount',
					payload:{
						flowId:values.flowId,
						email:values.email,
						mobile:values.mobile,
						businessTypeId:parseInt(values.businessTypeId),
						minAmount:parseFloat(values.minAmount),
						maxAmount:parseFloat(values.maxAmount),
						pageSize:25,
					}
				})*/
			}else{
				dispatch(routerRedux.push(
					'/finance/record?page=1'+"&flowId="+values.flowId+"&email="+values.email+
					"&mobile="+values.mobile+"&businessTypeId="+values.businessTypeId+
					"&minAmount="+values.minAmount+"&maxAmount="+values.maxAmount
					+"&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
					))
				/*dispatch({
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
				})*/
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