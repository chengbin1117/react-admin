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
import BondList from '../components/Finance/BondList';
import stytes from './UserLoginPage.css';
import {timeFormat} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function Bond({location,dispatch,finance,router,}) {
	
	const {AccountDiposit,totalNumber,currentPage,loading} = finance;
	let merId =localStorage.getItem("userId");

	const BondListProps ={
		data:AccountDiposit,
		total:totalNumber,
		currentPage,
		loading,
		Examine(reacord){
			console.log(reacord)
			Modal.info({
			    title: (<div>流水号：{reacord.flowId}<span style={{paddingLeft:80+"px"}}>充值时间：{reacord.accountTime}</span></div>),
			    content: (<table className={stytes.table}>
			    			<tbody>
				    			<tr><td>用户ID</td><td>{reacord.userId}</td><td>手机号</td><td>{reacord.mobile}</td></tr>
				    			<tr><td>用户角色</td><td>{reacord.userRoleDisplay}</td><td>用户级别</td><td>{reacord.levelDisplay}</td></tr>
				    			<tr><td>充值地址</td><td>{reacord.toAddress}</td><td>应缴纳保证金数额</td><td>{reacord.depositAmount}</td></tr>
				    			<tr><td>实际缴纳数额</td><td>{reacord.accountAmount}</td><td>到账时间</td><td>{reacord.accountTime}</td></tr>
				    			<tr><td>备注信息</td><td>{reacord.accountAmount}</td></tr>
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
		handlsearch(values){
			console.log(values)
			if(values.time ==undefined){
				dispatch({
					type:'finance/getAccountDiposit',
					payload:{
						userId:values.userId,
						mobile:values.mobile,
					}
				})
			}else{
				dispatch({
					type:'finance/getAccountDiposit',
					payload:{
						userId:values.userId,
						mobile:values.mobile,
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1])),
					}
				})
			}
		}
	}
	return (
			<div>
				<BondList {...BondListProps}/>
			</div>

	);
}

Bond.propTypes = {

};

function mapStateToProps({
	finance
}) {
	return {
		finance
	};
}



export default connect(mapStateToProps)(withRouter(Bond));