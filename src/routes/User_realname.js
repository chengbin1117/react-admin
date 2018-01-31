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
import RealName from '../components/User/RealName';
import RealNameModal from '../components/User/RealNameModal';
import RealsModal from '../components/User/RealsModal';
import {timeFormat,uploadUrl,GetRequest} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function UserRealName({location,dispatch,user,router,}) {
	const {RealNameVisible,RealsVisible,UserCertList,loading,totalNumber,currentPage,selectList}=user;
	//console.log(loading)
	let merId =localStorage.getItem("userId");
	console.log(merId)
	/*if(merId == 'undefined'){
		message.error('请重新登陆')
		console.log(1111111111)
		router.push('/')
	}*/

	const UserRealNameProps ={
		data:UserCertList,
	    currentPage,
	    total:totalNumber,
	    loading:loading,
	    showIdCard(record){
	    	Modal.info({
			    title: (<div>身份证照片</div>),
			    content: (<div><Row>
			    			<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    				<img src= {uploadUrl+record.idcardFront} style={{width:300}}/>
			    				<p  style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>正面</p>
			    			</Col>
			    			<Col span={12} style={{textAlign:'center',width:'50%'}} >
			    			    <img src= {uploadUrl+record.idcardBack} style={{width:300}}/>
			    			    <p style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>反面</p>
			    			</Col>
			    			</Row>
			    			<Row>
			    				<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    			    <img src= {uploadUrl+record.idcardBack} style={{width:300}}/>
			    			    <p  style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>手持正面</p>
			    			    </Col>
			    			</Row>
			    		  </div>
			    	),
			    iconType:null,
			    okText:'关闭',
			    maskClosable:true,
			    width:820,
			    onOk() {
			      console.log('OK');
			    },
			    onCancel() {
			      console.log('Cancel');
			    },
			  });
	    },
	    Examine(selectList){
	    	dispatch({
	    		type:'user/showRealNameModal',
	    		payload:{
	    			selectList:selectList
	    		}
	    	})
	    },
	    ExamineModal(selectList){
	    	//console.log(selectList)
	    	var Ids =""
				for(var i in selectList){
						if(selectList[i].status !=1){
							console.log(selectList[i].userId)
							Ids +=selectList[i].userId+","
						}
			    }
			    console.log(Ids)
			if(Ids == ""){
				message.warn('无需审核的用户')

			}else{
				dispatch({
					  type: 'user/showRealsModal',
					  payload:{
					  	selectList:Ids,
					  }
				   });
			}
	    },
	    handlsearch(values){
	    	if(values.time ==undefined){
				dispatch({
					type:'user/getUserCert',
					payload:{
						userId:values.userId,
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status)
					}
				})
				dispatch(routerRedux.push('/user/realName?page=1'+"&userId="+values.userId+
		         	"&email="+values.email+"&mobile="+values.mobile+"&status="+values.status
		         	))	
			}else{
				
				
				dispatch({
					type:'user/getUserCert',
					payload:{
						userId:values.userId,
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status),
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1]))
					}
				})
				dispatch(routerRedux.push('/user/realName?page=1'+"&userId="+values.userId+
		         	"&email="+values.email+"&mobile="+values.mobile+"&status="+values.status+
		         	"&startDate="+timeFormat(new Date(values.time[0]))+"&endDate="+timeFormat(new Date(values.time[1]))
		         	))	
			}
	    },
	    changepage(page){
	    	const search =GetRequest(location.search);
	    	dispatch(routerRedux.push('/user/realName?page='+page+"&userId="+search.userId+
		         	"&email="+search.email+"&mobile="+search.mobile+"&status="+search.status+
		         	"&startDate="+search.startDate+"&endDate="+search.endDate
		         	))	
	    }
	}

	const RealNameModalProps ={
		visible:RealNameVisible,
		selectList,
		onCancel(){
			dispatch({
	    		type:'user/hideRealNameModal',
	    		payload:{
	    			
	    		}
	    	})
		},
		onOk(values,selectList){
			console.log(values,selectList);
			if(values.radio =="1") {
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList.userId,
						status:parseInt(values.radio),
						auditUser:merId,
						auditUserName:localStorage.getItem("realname")
					}
				})

			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList.userId,
						status:parseInt(values.radio),
						auditUser:merId,
						refuseReason:values.text,
						auditUserName:localStorage.getItem("realname")
					}
			    })
			}
			
		}
	}
	const RealsModalProps ={
		visible:RealsVisible,
		selectList,
		onCancel(){
			dispatch({
	    		type:'user/hideRealsModal',
	    		payload:{
	    			
	    		}
	    	})
		},
		onOk(values,selectList){
			console.log(values,selectList)
			if(values.radio == '1'){
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList,
						status:parseInt(values.radio),
						auditUser:merId,
						auditUserName:localStorage.getItem("realname")
					}
				})
			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList,
						status:parseInt(values.radio),
						auditUser:merId,
						refuseReason:values.text,
						auditUserName:localStorage.getItem("realname")
					}
			    })
			}
		}
	}
	return (
			<div>
				<RealName {...UserRealNameProps}/>
				<RealNameModal {...RealNameModalProps} />
				<RealsModal {...RealsModalProps}/>
			</div>

	);
}

UserRealName.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserRealName));