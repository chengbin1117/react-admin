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
import createG2 from 'g2-react';
import { Stat } from 'g2';
import Layout from '../components/Layout';
import { Table,Pagination,Card} from 'antd';
import ArticleList from '../components/Log/Article';
import AuditingModal from '../components/Log/AuditingModal';
import ExamineModal from '../components/User/ExamineModal';
import styles from './IndexPage.css';
import style_pagination from '../components/pagination.css';
function IndexPage({location,dispatch,user,router,content}) {
	const {AuditVisible,userlist,ExmianVisible,selectList,loading,totalNumber}=user;
	//const {ArticleList}=content
	//console.log(content.ArticleList);
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}

	const ExamineModalProps ={
		visible:ExmianVisible,
		selectList,
		onCancel(){
			dispatch({
			    type:"user/hideExmianModal"
		    })
		},
		onOk(data,id){
				
				if(data.radio == "1"){
					dispatch({
					type:'user/auditUser',
					payload:{
						userId:id,
						auditStatus:parseInt(data.radio),
						auditUserId:merId,
						audit:0,
					}
				   })
				}else{
					dispatch({
						type:'user/auditUser',
						payload:{
							userId:id,
							auditStatus:parseInt(data.radio),
							auditUserId:merId,
							refuseReason:data.text,
							audit:0,
						}
					})
				}
				
		}
	}

	function onshowModal(record){
		dispatch({
			type:"user/showExmianModal",
			payload:{
				selectList:record.userId
			}
		})
	}
	function toDatg(record){
		dispatch(routerRedux.push('/user/user_data?userId='+record.userId))
	}
	const columns = [{
	    title: '用户ID',
	    dataIndex: 'userId',
	    key: 'userId',
	    width: 120,
	  }, {
	    title: '用户名',
	    dataIndex: 'userName',
	    key: 'userName',
	    width: 120,
	  }, {
	    title: '邮箱',
	    dataIndex: 'userEmail',
	    key: 'userEmail',
	    width: 120,
	  }, {title: '手机号',
	    dataIndex: 'userMobile',
	    key: 'userMobile',
	    width: 120,
	  }, {title: '注册时间',
	    dataIndex: 'createDate',
	    key: 'createDate',
	    width: 120,
	  }, {title: '角色',
	    dataIndex: 'userRoleDisplay',
	    key: 'userRoleDisplay',
	    width: 120,
	  }, {title: '提交申请时间',
	    dataIndex: 'applyColumnTime',
	    key: 'applyColumnTime',
	    width: 120,
	  },{title: '审核状态',
	    dataIndex: 'auditStatusDisplay',
	    key: 'auditStatusDisplay',
	    width: 120,
	  },{title: '操作',
	    dataIndex: 'action',
	    key: 'action',
	    width: 120,
	    render: (text, record, i) => {
				return (
					<div>
	              <a data-key={i} onClick={() => onshowModal(record)} style = {{marginRight:10}}>审核</a>
	              <a onClick={()=>toDatg(record)}  style={{marginRight:10+"px"}}>查看</a>
	            </div>
				)
			}
	  },];
	  /*const pagination = {
	    total: totalNumber,
	    showSizeChanger: true,
	    pageSize: 25,
	   
	    onShowSizeChange: (current, pageSize) => {
	      console.log('Current: ', current, '; PageSize: ', pageSize);
	    },
	    onChange: (current) => {
	      console.log('Current: ', current);
	    },
	  };*/
	  
	  
	  const AuditingModalProps ={
	  	visible:content.AuditVisible,
	  	selectList:content.selectList,
	  	ColumnList:content.ColumnList,
	  	onCancel:function(){
	  		dispatch({
				type: 'content/hideModal',
				
			});
	  	},
	  	onOk(data,selectList){
	  		if(data.column ==undefined){
	  			dispatch({
					type:"content/auditArticle",
					payload:{
						articleId:selectList.articleId,
						auditUser:merId,
						refuseReason:data.text,
					    auditStatus:parseInt(data.radio),
					    Status:2
					}
				})
	  		}else{
	  			dispatch({
					type:"content/auditArticle",
					payload:{
						articleId:selectList.articleId,
						auditUser:merId,
						refuseReason:data.text,
						columnId:data.column[0],
					    secondColumn:data.column[1],
					    auditStatus:parseInt(data.radio),
					    Status:2
					}
				})
	  		}
	  			
	  	}
	  }
	  const ArticleListProps ={
	  	data:content.ArticleList,
	  	loading:content.loading,
	  	total:content.ArticleListNumber,
	  	onEditItem:function(record){
	  		dispatch({
				type: 'content/showModal',
				payload:{
					selectList:record
				}
			});
	  	},
	  	onPreview(record){
	  		console.log(record)
	  		dispatch(routerRedux.push('/articlePreview?articleId='+record.articleId))
	  	}
	  }
	  function onChange(page){
	  	console.log(page)
	  }
	return (
			<div>
				<Card  title="待审核的专栏用户" extra={<Link to={{ 
			             pathname:"/user/user_admin", 
			             query:{page: 1} 
							 }}  className={styles.allUser}>查看全部用户</Link>}
							 hoverable={true}
							 >
				   
				    <Table bordered rowKey={record => record.userId} columns={columns}  pagination={false}  dataSource={userlist} loading={loading}/>
				    
				    <ExamineModal {...ExamineModalProps}/>
				</Card>
				<Card title="待审核的专栏文章"
								hoverable={true}
				        extra={<Link to={{ 
			             pathname:"/content/content_article", 
			             query:{page: 1} 
			         }}  className={styles.allUser}>查看全部文章</Link>} style={{marginTop:"100px"}}>
				    <ArticleList {...ArticleListProps}/>
				    <AuditingModal {...AuditingModalProps}/>
				</Card>
			</div>

	);
}

IndexPage.propTypes = {

};

function mapStateToProps({
	user,content
}) {
	return {
		user,content
	};
}



export default connect(mapStateToProps)(withRouter(IndexPage));