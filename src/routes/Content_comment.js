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
import Content_Comment from '../components/Content/Content_Comment';
import Content_CommentSet_Modal from '../components/Content/Content_CommentSet_Modal';
import Content_CommentSetShow_Modal from '../components/Content/Content_CommentSetShow_Modal';
import ExamineModal from '../components/Content/ExamineModal';

function ContentComment({location,dispatch,router,content}) {
    
    const {CommentList,CommentSetVisible,showSetVisible,selectList,ExamineVisible,loading,totalNumber,currentPage} = content;

	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}

	const Content_CommentProps ={
		data:CommentList,
		loading,
		currentPage,
		total:totalNumber,
		opinionSetModal(){
			dispatch({
				type:"content/showCommentSet"
			})
		},
		showSet(record){
			dispatch({
				type:"content/showSetModal",
				payload:{
					selectList:record.commentId
				}
			})
		},
		confirm(record){
			dispatch({
				type:"content/deleteComment",
				payload:{
					commentId:record.commentId,
					search:location.search
				}
			})
		},
		showSets(selectList){
			console.log(selectList)
			var Ids =""
				for(var i in selectList){
				    Ids +=selectList[i].commentId+","
			}

			dispatch({
				type:"content/showSetModal",
				payload:{
					selectList:Ids
				}
			})
		},
		audit(record){
			dispatch({
				type:"content/showExamineModal",
				payload:{
					selectList:record
				}

			})
		},
		handlsearch(values){
			if(values.time!=undefined){
				dispatch({
					type:'content/getCommentList',
					payload:{
						content:values.content,
						status:parseInt(values.status),
						displayStatus:values.displayStatus=="1"?true:false,
						startDate:new Date(values.time[0]).toLocaleDateString().split('/').join('-'),
						endDate:new Date(values.time[1]).toLocaleDateString().split('/').join('-'),
					}
				})
			}else{
				dispatch({
					type:'content/getCommentList',
					payload:{
						content:values.content,
						status:parseInt(values.status),
						displayStatus:values.displayStatus=="1"?true:false,
					}
				})
			}
		},
		changepage(page){
			dispatch(routerRedux.push('/content/content_comment?page='+page))
		}
	}

	//评论设置
	const Content_CommentSet_ModalProps ={
		visible:CommentSetVisible,
		onCancel(){
			dispatch({
				type:"content/hideCommentSet"
			})
		},
		onOk(values){
			//console.log(values)
			dispatch({
				type:"content/commentSet",
				payload:{
					commentSet:values.set == "public"?true:false,
				}
			})
		}

	}

	//显示设置
	const Content_CommentSetShow_ModalProps ={
		visible:showSetVisible,
		selectList,
		onOk(values,selectList){
			console.log(selectList)
			dispatch({
				type:"content/setcommentStatus",
				payload:{
					commentIds:String(selectList),
					displayStatus:values.set =="public"?true:false,
					query:location.query,
				}
			})
		},
		onCancel(){
			dispatch({
				type:"content/hideSetModal"
			})
		},

	}

	//审核
	const ExamineModalProps = {
		visible:ExamineVisible,
		selectList,
		onCancel(){
			dispatch({
				type:"content/hideExamineModal",
			})
		},
		onOk(values,text,record){
			if(values ==undefined){
				message.warn("请选择")
				console.log(values,text,record)
			}else{
				dispatch({
					type:'content/auditComment',
					payload:{
						commentId:record.commentId,
						status:parseInt(values),
						refuseReason:text,
						query:location.query
					}
				})
			}
		}
	}
	return (
			<div >
				<Content_Comment {...Content_CommentProps}/>
				<Content_CommentSet_Modal {...Content_CommentSet_ModalProps}/>
				<Content_CommentSetShow_Modal {...Content_CommentSetShow_ModalProps} />
				<ExamineModal {...ExamineModalProps}/>
			</div>

	);
}

ContentComment.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentComment));