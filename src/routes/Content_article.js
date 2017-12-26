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
import { Modal,message} from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Article from '../components/Content/Content_Article';
import SetModal from '../components/Content/SetShow';
import ArticleModal from '../components/Content/AricleMoadl';
import {formatDate,tokenLogOut,GetRequest} from '../services/common'

function ContentArticle({location,dispatch,router,content}) {
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	console.log("location",location)
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ArticleList,setshow,articeVisible,selectList,ArticleListNumber,currentPage,ColumnList,loading}=content;
	
	const Content_ArticleProps ={
		dispatch,
		loading,
		ArticleList,
		ColumnList,
		total:ArticleListNumber,
		currentPage:currentPage,
		confirm(record){
			
			dispatch({
				type:"content/deleteArticle",
				payload:{
					articleId:record.articleId,
					dispatch,
				}
			})
		},
		setShowModal(record){
			//console.log(record)
			dispatch({
				type:'content/setShowModal',
				payload:{
					selectList:record.articleId
				}
				
			})
		},
		article(selectList) {
			dispatch({
				type:'content/showArticeModal',
				payload:{
					selectList:selectList
				}
				
			})
		},
		onShowMOdal(selectList){
			//console.log(selectList)
			var Ids =""
				for(var i in selectList){
							Ids +=selectList[i].articleId+","
			}
			console.log(Ids)
			dispatch({
				type:'content/setShowModal',
				payload:{
					selectList:Ids
				}
				
			})

		},
		handlsearch:function(values){
				console.log(values)
                	dispatch({
				       type: 'content/getArticleList',
				       payload:{
				       	articleId:values.Id,
				       	articleTitle:values.title,
				       	articleTag:values.tags,
				       	publishStatus:parseInt(values.status),
				       	displayStatus:parseInt(values.displayStatus),
				      	columnId:values.cloumn!=undefined?parseInt(values.cloumn[0]):'',
				      	secondColumn:values.cloumn!=undefined?parseInt(values.cloumn[1]):'',
				       }
		            });	
		},
		editorItem(record){
			dispatch(routerRedux.push('/content/editor_article?articleId='+record.articleId))
			
		},
		changepage(page){
			 dispatch(routerRedux.push('/content/content_article?page='+page))
		          
		},
		delArticle(record){
			/*console.log(location)*/
			
			Modal.confirm({
				    title: '是否删除?',
				    okText:"确定",
				    cancelText:"取消",
				    onOk() {
				    	var search =GetRequest(location.search)
					      dispatch({
						       type: 'content/deleteArticle',
						       payload:{
						       		articleId:record.articleId,
						       		search:search
						       }
			                });
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
				  });
			
		}
	}
	const SetModalProps = {
		visible:setshow,
		selectList,
		onCancel(){
			dispatch({
				type:'content/hideShowModal',
				
			})
		},
		onOk(selectList,status){
			console.log(selectList,status);
			dispatch({
				type:'content/setDisplayStatus',
				payload:{
					articleId:selectList,
					displayStatus:status.radio,
					updateUser:merId,
					search:location.search
				}
			})
		}

	}
	const ArticleModalProps ={
		visible:articeVisible,
		selectList,
		ColumnList,
		onCancel(){
			dispatch({
				type:'content/hideArticeModal',
				
			})
		},
		onOk(data,selectList){
			if(data.column==undefined){
				dispatch({
				type:"content/auditArticle",
				payload:{
					articleId:selectList.articleId,
					auditUser:merId,
					refuseReason:data.text,
				    auditStatus:parseInt(data.radio),
				    search:location.search
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
					search:location.search
				}
			   })
			}
				
			
			
		}
	}
	return (
			<div >
				<Content_Article {...Content_ArticleProps}/>
				<SetModal {...SetModalProps}/>
				<ArticleModal {...ArticleModalProps}/>
			</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));