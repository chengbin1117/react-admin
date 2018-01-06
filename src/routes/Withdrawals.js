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
import Manage from '../components/Finance/Mange';
import stytes from './UserLoginPage.css';
import ExamineModal from '../components/Finance/ExamineModal';
import {timeFormat,GetRequest} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function Withdrawals({location,dispatch,finance,router,}) {
	
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {WIthdrawList,currentPage,totalNumber,loading,ExamineVisible,selectList} =finance;


	const ManageProps ={
		data:WIthdrawList,
		currentPage,
		total:totalNumber,
		loading,
		handlsearch(values){
			if(values.time ==undefined){
				/*dispatch({
					type:'finance/getAccountWIthdraw',
					payload:{
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status)
					}
				})*/
			dispatch(routerRedux.push('/finance/withdrawals?page=1'+"&email="+values.email+
				"&mobile="+values.mobile+"&status="+values.status
				))
			}else{
				/*dispatch({
					type:'finance/getAccountWIthdraw',
					payload:{
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status),
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1])),
					}
				})*/
				dispatch(routerRedux.push('/finance/withdrawals?page=1'+"&email="+values.email+
				"&mobile="+values.mobile+"&status="+values.status+"&startDate="+timeFormat(new Date(values.time[0]))+
				"&endDate="+timeFormat(new Date(values.time[1]))
				))
			}
		},
		Examine(reacord){
			console.log(reacord)
			Modal.info({
			    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>提币时间：{reacord.withdrawTime}</span></div>),
			    content: (<table className={stytes.table}>
			    			<tbody>
				    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>邮箱</td><td>{reacord.email==null?"——":reacord.email}</td></tr>
				    			<tr><td>手机号</td><td>{reacord.mobile}</td><td>用户角色</td><td>{reacord.userRoleDisplay}</td></tr>
				    			<tr><td>用户级别</td><td>{reacord.levelDisplay}</td><td>提币地址</td><td>{reacord.toAddress}</td></tr>
				    			<tr><td>提币数量</td><td>{reacord.withdrawAmount}</td><td>手续费</td><td>{reacord.poundageAmount}</td></tr>
				    			<tr><td>实际到账数量</td><td>{reacord.accountAmount}</td><td>当前状态</td><td>{reacord.statusDisplay}</td></tr>
				    			<tr><td>到账时间</td><td>{reacord.accountTime==null?"——":reacord.accountTime}</td></tr>
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
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/finance/withdrawals?page='+page+"&email="+search.email
				+"&mobile="+search.mobile+"&status="+search.status+"&startDate="+search.startDate+
				"&endDate="+search.endDate
				))
			//router.push('/finance/withdrawals?page='+page)
		},
		onEdit(record){
			dispatch({
				type:'finance/showModal',
				payload:{
					selectList:record
				}
			})
		}
	}


	const  ExamineModalProps ={
		visible:ExamineVisible,
		selectList,
		onCancel(){
			dispatch({
				type:'finance/hideModal',

			})
		},
		onOk(values,selectList){
			console.log(values)
			if(values.radio=='2'){
				dispatch({
					type:'finance/auditAccountWithdraw',
					payload:{
						flowId:selectList.flowId,
						status:parseInt(values.radio),
						refuseReason:values.text,
					}
			    })
			}else{
				dispatch({
					type:'finance/auditAccountWithdraw',
					payload:{
						flowId:selectList.flowId,
						status:parseInt(values.radio),
					}
				})
			}
			
		}

	}
	return (
			<div>
						<Manage {...ManageProps}/>
						<ExamineModal {...ExamineModalProps}/>
			</div>

	);
}

Withdrawals.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Withdrawals));