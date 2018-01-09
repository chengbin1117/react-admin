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
import Useradmin from '../components/User/UserAdmin';
import ExamineModal from '../components/User/ExamineModal';
import SetHotuser from '../components/User/SetHotuser';
import LockModal from '../components/User/LockModal';
import {timeFormat,GetRequest} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

//console.log(merId)
function UserAdmin({location,dispatch,user,router,}) {
	const {ExmianVisible,userlist,userInfo,selectList,HotVisible,LockVisible,loading,totalNumber,currentPage}=user;
	//console.log(loading)
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const UseradminProps ={
		userlist:userlist,
		loading:loading,
		total:totalNumber,
		currentPage,
		handlsearch:function(values){
				//console.log(values.time)
                if(values.time !=undefined){
                	/*dispatch({
				       type: 'user/getUserList',
				       payload:{
				       	userId:values.Id,
				       	userEmail:values.email,
				       	userMobile:values.phone,
				       	userRole:parseInt(values.role),
				       	auditStatus:parseInt(values.auditStatus),
				       	lockStatus:parseInt(values.lockStatus),
				       	createDateStart:timeFormat(new Date(values.time[0])),
				       	createDateEnd:timeFormat(new Date(values.time[1]))
				       }
		            });*/
		         dispatch(routerRedux.push('/user/user_admin?page=1'+"&userId="+values.Id+
		         	"&userEmail="+values.email+"&userMobile="+values.phone+"&userRole="+values.role+
		         	"&auditStatus="+values.auditStatus+"&lockStatus="+values.lockStatus+
		         	"&createDateStart="+timeFormat(new Date(values.time[0]))+
		         	"&createDateEnd="+timeFormat(new Date(values.time[1]))
		         	))	
                }else{
		            dispatch(routerRedux.push('/user/user_admin?page=1'+"&userId="+values.Id+
		         	"&userEmail="+values.email+"&userMobile="+values.phone+"&userRole="+values.role+
		         	"&auditStatus="+values.auditStatus+"&lockStatus="+values.lockStatus 	
		         	))	
                }
                
				

		},
		openModal:function(selectList){
			  dispatch({
			  	type:'user/showHotModal',
			  	payload:{
			  		selectList:selectList
			  	}

			  })
		},
		ExamineModal:function(selectList){
			//console.log(selectList)
			var Ids =""
				for(var i in selectList){
						if(selectList[i].auditStatus ==0&&selectList[i].applyRole!=1){
							//console.log(selectList[i].userId)
							Ids +=selectList[i].userId+","
						}
			}
			if(Ids == ""){
				message.warn('无需审核的用户')

			}else{
				dispatch({
					  type: 'user/showExmianModal',
					  payload:{
					  	selectList:Ids,
					  }
				   });
			}
			
		},
		Examine(Id){
			dispatch({
					  type: 'user/showExmianModal',
					  payload:{
					  	selectList:Id,
					  }
		    });
		},
		LocksModal(selectList){
			console.log(selectList)
			var Ids =""
				for(var i in selectList){
						if(selectList[i].lockStatus==1){
							//console.log(selectList[i].userId)
							Ids +=selectList[i].userId+","
						}
			}
			console.log(Ids)
			if(Ids == ""){
				message.warn('无需锁定的用户')

			}else{
				dispatch({
					  type: 'user/showLockModal',
					  payload:{
					  	selectList:Ids,
					  }
				   });
			}

		},
		LockModal(list){

			dispatch({
					  type: 'user/showLockModal',
					  payload:{
					  	selectList:list.userId
					  }
		    });
		},
		deblocking(selectList){
			var Ids =""
				for(var i in selectList){
						if(selectList[i].lockStatus!=1){
							//console.log(selectList[i].userId)
							Ids +=selectList[i].userId+","
						}
			}
			console.log(Ids)
			if(Ids == ""){
				message.warn('无需解锁的用户')

			}else{
				Modal.confirm({
				    title: '是否解锁这些用户?',
				    okText:'确定',
				    onOk() {
				      dispatch({
					  type: 'user/lockUser',
					  payload:{
					  	userId:Ids,
					  	lockUserId:merId,
					  }
				       });  
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
				  });
				
			}
		},
		conOk(user){
			console.log(user)
			dispatch({
					  type: 'user/lockUser',
					  payload:{
					  	userId:user.userId,
					  	lockUserId:merId,
					  }
		    });

		},
		changepage(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/user/user_admin?page='+page+
				"&userId="+search.userId+"&userEmail="+search.userEmail+"&userMobile="+search.userMobile+
				"&userRole="+search.userRole+"&auditStatus="+search.auditStatus+"&lockStatus="+search.lockStatus+
				"&createDateStart="+search.createDateStart+"&createDateEnd="+search.createDateEnd
				))
			
		},
		userData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))
		}
	}
	const ExamineModalProps ={
		visible:ExmianVisible,
		selectList:selectList,
		onCancel:function(){
			dispatch({
			type: 'user/hideExmianModal',
		})
		},
		onOk(data,list){
				//console.log(data,list)
				if(data.radio=="1"){
					dispatch({
					type:'user/auditUser',
					payload:{
						userId:list,
						auditStatus:parseInt(data.radio),
						auditUserId:merId,
						
					}
				})
				}else{
					dispatch({
					type:'user/auditUser',
					payload:{
						userId:list,
						auditStatus:parseInt(data.radio),
						auditUserId:merId,
						refuseReason:data.text
					}
				  })
				}
				
		}
	}
	const SetHotuserModalProps = {
		visible:HotVisible,
		selectList,
		onCancel(){
			 dispatch({
			  	type:'user/hideHotModal',

			  })
		},
		onOk(b,user){
			console.log(user)
			dispatch({
			  	type:'user/setHotUser',
			  	payload:{
			  		userId:user.userId,
			  		hotUser: parseInt(b.radio)==2 ?false:true
			  	}

			  })
		}
	}

	const LockModalProps = {
		visible:LockVisible,
		selectList,
		onCancel(){
			dispatch({
					  type: 'user/hideLockModal',
					  payload:{
					  	
					  }
		    });
		},
		onOk(valus,list){

			
			if(valus.tmie.currency == "小时"){
				Modal.confirm({
				    title: '是否锁定这些用户?',
				    content:"确定对这些用户锁定"+valus.tmie.number+"小时吗？",
				    okText:'确定',
				    onOk() {
				      dispatch({
						  type: 'user/lockUser',
						  payload:{
						  	userId:list,
						  	lockUserId:merId,
						  	lockUnit:parseInt("5"),
						  	lockTime:parseInt(valus.tmie.number),
						  }
			            }); 
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
		        });
				
			}else{
				var time = '';

				if(valus.tmie.currency=="2"){
					time ="月"
				}else if(valus.tmie.currency=="4"){
					time ="天"
				}else{
					time ="小时"
				}

				Modal.confirm({
				    title: '是否锁定这些用户?',
				    content:"确定对这些用户锁定"+valus.tmie.number+time+"吗？",
				    okText:'确定',
				    onOk() {
				      dispatch({
					  type: 'user/lockUser',
					  payload:{
					  	userId:list,
					  	lockUserId:merId,
					  	lockUnit:parseInt(valus.tmie.currency),
					  	lockTime:parseInt(valus.tmie.number),
					  }
		        });
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
		        });
				
				
			}

		}
	}
	return (
			<div>
				<Useradmin {...UseradminProps}/>
				<ExamineModal {...ExamineModalProps}/>
				<SetHotuser {...SetHotuserModalProps}/>
				<LockModal {...LockModalProps}/>
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