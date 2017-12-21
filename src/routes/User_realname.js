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
import RealName from '../components/User/RealName';
import RealNameModal from '../components/User/RealNameModal';
import RealsModal from '../components/User/RealsModal';
import {timeFormat} from '../services/common';
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
			    				<img src= {'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+record.idcardFront}/>
			    				<p  style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>正面</p>
			    			</Col>
			    			<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    			    <img src= {'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+record.idcardBack}/>
			    			    <p style={{fontSize:18+'px',color:"#000",marginTop:10+'px'}}>反面</p>
			    			</Col>
			    			</Row>
			    			<Row>
			    				<Col span={12} style={{textAlign:'center',width:'50%'}}>
			    			    <img src= {'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+record.idcardBack}/>
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
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status)
					}
				})
			}else{
				
				
				dispatch({
					type:'user/getUserCert',
					payload:{
						email:values.email,
						mobile:values.mobile,
						status:parseInt(values.status),
						startDate:timeFormat(new Date(values.time[0])),
						endDate:timeFormat(new Date(values.time[1]))
					}
				})
			}
	    },
	    changepage(page){

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
					}
				})

			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList.userId,
						status:parseInt(values.radio),
						auditUser:merId,
						refuseReason:values.text
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
					}
				})
			}else{
				dispatch({
					type:"user/auditUserCert",
					payload:{
						userIds:selectList,
						status:parseInt(values.radio),
						auditUser:merId,
						refuseReason:values.text
					}
			    })
			}
		}
	}
	return (
			<LayoutContainer>
				<RealName {...UserRealNameProps}/>
				<RealNameModal {...RealNameModalProps} />
				<RealsModal {...RealsModalProps}/>
			</LayoutContainer>

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