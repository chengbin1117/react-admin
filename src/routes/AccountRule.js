import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form ,Button, Upload, Icon,Input,Select,Col,Modal} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import UserList from '../components/Setting/UserList';
/*import AdduserModal from '../components/Setting/AdduserModal';*/
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import ManageModal from '../components/Setting/ManageModal';
import AddPostModal from '../components/Setting/AddPostModal';
import RelationModal from '../components/Setting/RelationUser';
function AccountRule({location,dispatch,setting,router,}) {
	let  userId = localStorage.getItem('userId')
	const { listVisible,ManageVisible,PostVisible,SysUserList,PostList,getPost,TreeList,type,currentItem,RelationVisible,item,selectList}=setting;
	//console.log('getAuthTree',getAuthTree)
	//生成随机密码
	function randomString(len, charSet) {
		  charSet = charSet || 'abcdefghijklmnopqrstxyz0123456789';
		  var randomString = '';
		  for (var i = 0; i < len; i++) {
		   var randomPoz = Math.floor(Math.random() * charSet.length);
		   randomString += charSet.substring(randomPoz,randomPoz+1);
		  }
		  return randomString;
	}

	//搜索
	function handlsearch(values) {
			
			dispatch({
				type:'setting/getSysUserList',
				payload:{
					username:values.username,
					mobile:values.mobile,
					postId:parseInt(values.postId)
				}
			})
	}
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
	    		<Col span={8} style = {{display:'block'}}>
				   	<FormItem
			          label="用户名"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('username', {
			          
			          })(
			            <Input />
			          )}
	               </FormItem>
                </Col>
                <Col span={8} style = {{display:'block'}}>
					 <FormItem
			          label="手机号"
			          {...formItemLayout}
			        >
			          {getFieldDecorator('mobile', {
			           
			          })(
			            <Input />
			          )}
		            </FormItem>
		        </Col>
		      <Col span={8} style = {{display:'block'}}>
   			 <FormItem
	          {...formItemLayout}
	          label="岗位"
	          hasFeedback
	        >
	          {getFieldDecorator('postId', {
	            
	          })(
	                <Select placeholder="请选择">
		              {PostList.map((item,index)=>
								<Option key={index} value={item.postId+""}>{item.postName}</Option>
					  )}
		            </Select>
	          )}
	        </FormItem>
	    	</Col>
	        </div>
	      );
	    return children;
	}

	//添加账号
	
	function addUser() {

		dispatch({
			type: 'setting/showListModal',
			payload: {
				type: 'create',
				currentItem:{}
			},
		});
	}
	
	const AdduserModalProps = {
		visible: listVisible,
		PostList,
		type:type,
		item:currentItem,
		onOk:function(vaules){
				console.log(vaules)
				if(vaules.id ==undefined){
					dispatch({
					type:'setting/addSysUser',
					payload:{
						username:vaules.username,
						mobile:vaules.mobile,
						realname:vaules.realname,
						password:vaules.password,
						postId:parseInt(vaules.postId),
					}
				})
				}else{
					dispatch({
					type:'setting/addSysUser',
					payload:{
						userId:vaules.id,
						username:vaules.username,
						mobile:vaules.mobile,
						realname:vaules.realname,
						password:vaules.password,
						postId:parseInt(vaules.postId),
					}
				})
				}
				
		},
		onCancel:function(){
			dispatch({
				type: 'setting/hideListModal',
				payload: {
					currentItem: {}
				}
			});
		}
	}
	

	//岗位列表
	const ManageModalProps = {
		visible: ManageVisible,
		data:getPost,
		onOk:function(){
			
		},
		onCancel:function(){
			dispatch({
				type: 'setting/hideMangeModal',
				
			});
		},
		showModal:function(){
			dispatch({
				type: 'setting/hideMangeModal',
				
			});
			dispatch({
				type: 'setting/showPostModal',
				
			});
		},
		handleDel(record){
				console.log(record)
			dispatch({
				type:"setting/postSetStatus",
				payload:{
					userId:userId,
					status:record.status==true?false:true,
					postId:record.postId
				}
			})
		},
		onEditItem(record){
			console.log(record)
			//localStorage.setItem('kg_aboutEditor',JSON.SON.stringify(record)
			dispatch({
				type: 'setting/hideMangeModal',

				
			});
			dispatch({
				type: 'setting/showPostModal',
				payload:{
					currentItem:record,
					type:"update"
				}
			});
		}
	}
	
	//管理岗位
	function manage(){
		dispatch({
			type: 'setting/showMangeModal',
			payload: {
			
			},
		});
	}
	
	
	//添加岗位
	const AddPostModalProps ={
		visible: PostVisible,
		type,
		TreeList,
		item:currentItem,
		onCancel:function(){
			dispatch({
			    type: 'setting/hidePostModal',
			
		    });
		},
		onOk(id,values,postId){
			console.log(id,values,postId)
			if(postId!=undefined){
				dispatch({
					type: 'setting/addPost',
					payload: {
						name:values.name,
						authIds:id,
						userId:userId,
						postId:postId,
						router,
					},
			    });
			}else{
				dispatch({
					type: 'setting/addPost',
					payload: {
						name:values.name,
						authIds:id,
						userId:userId,
						router
					},
			    });
			}
			
		}
	}

	const UserListProps ={
		data:SysUserList,
		onEditItem:function(record){
			dispatch({
				type: 'setting/showListModal',
				payload: {
					type: 'update',
						currentItem:record,
				},
		    });
		},
		setStatus(record){
			Modal.confirm({
				title: record.status ==0?"是否启用？":"是否禁用？",
				onOk() {
				    dispatch({
				    	type:"setting/sysuserSetStatus",
				    	payload:{
				    		userId:record.id,
				    		status:record.status ==0?true:false
				    	}
				    })

				},
				onCancel() {
				      console.log('Cancel');
				},
			
			})
		},
		reseatPaw(record){
			var paw = randomString(6)
			//console.log(paw)
			Modal.confirm({
				title: "确认重置密码吗？",
				content:(
					      <div>
					        <p style={{fontSize:16+'px'}}>将重置为初始密码:{paw}</p>
					      </div>
					    ),
				onOk() {
				    dispatch({
				    	type:"setting/resetPassword",
				    	payload:{
				    		userId:record.id,
				    		password:paw,
				    	}
				    })
				},
				onCancel() {
				      console.log('Cancel');
				},			
			})
		},
		setKgUser(record){
			if(record.kgUsername == null){
				dispatch({
					type:"setting/showRelationModal",
					payload:{
						item:record
					}
				})

			}else{
				Modal.confirm({
					title: "关联前台用户",
					iconType:null,
					content:(
						      <div>
						      	   <p>手机号：{record.kgUsername}</p>
						      </div>
						   ),
					okText : '修改',
					onOk() {
					    
					},
					onCancel() {
					      console.log('Cancel');
					},			
				})
			}


		}
	}


	const RelationModalProps ={
		visible:RelationVisible,
		item,
		onCancel(){
			dispatch({
				type:"setting/hideRelationModal"
			})
		},
		onOk(record,values){
			console.log(record,values)
			Modal.confirm({
				title:"确认关联前台用户吗？",
				okText : '确定',
					onOk() {
					    dispatch({
					    	type:"setting/setKgUser",
					    	payload:{
					    		userId:record.id,
					    		kgUserId:values.kgUserId
					    	}
			            })
					},
					onCancel() {
					      console.log('Cancel');
					},	
			})
			
		}
	}
	return (
			<LayoutContainer className={styles.Indexbox}>
				<div>
					<WrappedAdvancedSearchForm getFields = {getFields}  handlsearch={handlsearch}/>
				</div>
				<div className= {styles.addAccount}>
					<Button type="primary" size='large' onClick = {addUser} >添加账号</Button><Button type="primary" size='large' className={styles.post} onClick = {manage}>管理岗位</Button>
				</div>
				<UserList {...UserListProps}/>
				{/*<AdduserModal {...AdduserModalProps}/>*/}
				<ManageModal {...ManageModalProps}/>
				<AddPostModal {...AddPostModalProps}/>
				<RelationModal {...RelationModalProps}/>
			</LayoutContainer>

	);
}

AccountRule.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AccountRule));